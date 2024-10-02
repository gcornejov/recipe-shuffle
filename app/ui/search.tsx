'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getSuggestion } from "@/app/actions";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const INGREDIENT_PARAMETER_KEY: string = 'ingredient';
const MAX_INGREDIENTS_PARAMS: number = 5

export function SearchBar({ inputValue, handleOnChange, handleKeyUp }: { inputValue: string, handleOnChange: Function, handleKeyUp: Function }) {
  return (
    <>
      <label className="mr-2" htmlFor='search'>Enter ingredient: </label>
      <input
        autoFocus
        value={inputValue}
        onChange={(e) => {
          handleOnChange(e.currentTarget.value);
        }}
        onKeyUp={(e) => {
          handleKeyUp(e.currentTarget.value, e.key);
        }}
      />
    </>
  )
}

export function Suggestion({ candidate, suggested }: { candidate: string, suggested: MutableRefObject<string> }) {
  const [suggestion, setSuggestion] = useState('')

  useEffect(() => {
    const updateSuggestion = async () => {
      suggested.current = await getSuggestion(candidate);
      setSuggestion(suggested.current);
    }

    updateSuggestion();
  }, [candidate]);

  return <div className="ml-2">{suggestion}</div>
}

export function SearchBarAutosuggest() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [candidate, setCandidate] = useState('');
  const suggestedRef = useRef('');

  function handleSearch(value: string, trigger_key: string) {
    if (trigger_key !== 'Enter') {
      setCandidate(value);
      return;
    }
    if (!suggestedRef.current) { return; }

    const params = new URLSearchParams(searchParams);
    const ingredientsParams: Array<string> = Object.values(params.getAll(INGREDIENT_PARAMETER_KEY));

    if (!ingredientsParams.includes(suggestedRef.current) && ingredientsParams.length < MAX_INGREDIENTS_PARAMS) {
      params.append(INGREDIENT_PARAMETER_KEY, suggestedRef.current);

      replace(`${pathname}?${params.toString()}`);
      setCandidate('');
    }
  }

  return (
    <>
      <div className="flex">
        <SearchBar inputValue={candidate} handleOnChange={setCandidate} handleKeyUp={handleSearch} />
        <Suggestion candidate={candidate} suggested={suggestedRef} />
      </div>
    </>
  )
}

export function SearchTag() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const ingredients: Array<string> = params.getAll(INGREDIENT_PARAMETER_KEY);

  function removeTag(ingredient: string | null) {
    if (ingredient) {
      params.delete(INGREDIENT_PARAMETER_KEY, ingredient);
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <>
      <div className="flex">
        {ingredients.map(
          (ingredient: string) =>
            <div
              key={ingredient}
              className="mx-2 hover:cursor-pointer"
              onClick={(e) => {
                removeTag(e.currentTarget.textContent)
              }}
            >
              {ingredient}
            </div>
        )}
      </div>
    </>
  )
}
