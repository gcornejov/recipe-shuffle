"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getSuggestion } from "@/app/actions";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { RecipeBriefing } from "@/app/lib/definitions";
import { StarRaiting } from "@/app/ui/raiting";
import { camelCase } from "@/app/lib/utils";

const INGREDIENT_PARAMETER_KEY: string = "ingredient";
const MAX_INGREDIENTS_PARAMS: number = 5;

export function SearchBar({
  inputValue,
  handleOnChange,
  handleKeyUp,
}: {
  inputValue: string;
  handleOnChange: Function;
  handleKeyUp: Function;
}) {
  return (
    <>
      <input
        className="absolute rounded-lg border-2 bg-transparent px-1 py-2"
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
  );
}

export function Suggestion({
  candidate,
  suggested,
}: {
  candidate: string;
  suggested: MutableRefObject<string>;
}) {
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const updateSuggestion = async () => {
      suggested.current = await getSuggestion(candidate);
      setSuggestion(suggested.current);
    };

    updateSuggestion();
  }, [candidate]);

  const formatedSuggestion = `${candidate}${suggestion.slice(candidate.length)}`;

  return (
    <>
      <input
        className="rounded-lg border-2 px-1 py-2 text-slate-500"
        readOnly={true}
        tabIndex={-1}
        value={formatedSuggestion}
      />
    </>
  );
}

export function SearchBarAutosuggest() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [candidate, setCandidate] = useState("");
  const suggestedRef = useRef("");

  function handleSearch(value: string, trigger_key: string) {
    if (trigger_key !== "Enter") {
      setCandidate(value);
      return;
    }
    if (!suggestedRef.current) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    const ingredientsParams: Array<string> = Object.values(
      params.getAll(INGREDIENT_PARAMETER_KEY),
    );

    if (
      !ingredientsParams.includes(suggestedRef.current) &&
      ingredientsParams.length < MAX_INGREDIENTS_PARAMS
    ) {
      params.append(INGREDIENT_PARAMETER_KEY, suggestedRef.current);

      replace(`${pathname}?${params.toString()}`);
      setCandidate("");
    }
  }

  return (
    <>
      <div className="relative flex justify-center text-3xl">
        <Suggestion candidate={candidate} suggested={suggestedRef} />
        <SearchBar
          inputValue={candidate}
          handleOnChange={setCandidate}
          handleKeyUp={handleSearch}
        />
      </div>
    </>
  );
}

export function SearchTags() {
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
      <div className="flex justify-center border-y-[15px] border-transparent">
        {ingredients.map((ingredient: string) => (
          <div
            key={ingredient}
            className="mx-2 cursor-pointer rounded-xl border-4 bg-black bg-opacity-30 px-1 text-white transition delay-150 duration-200 ease-in hover:scale-105 hover:-rotate-3"
            onClick={(e) => {
              removeTag(e.currentTarget.textContent);
            }}
          >
            <div className="transition delay-150 duration-200 ease-in hover:scale-75">{ingredient}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function RecipeCard({ recipe }: { recipe: RecipeBriefing }) {
  return (
    <div className="w-96 rounded-lg border-2 place-self-center border-gray-400 p-2 shadow-lg duration-200 ease-in hover:scale-110 bg-gray-200">
      <a href={`/recipes/${recipe.id}`} className="flex">
        <img
          className="mr-4 flex-col"
          src="https://placehold.co/150"
          alt="Recipe Photo"
        />
        <div>
          <div className="text-lg">{recipe.name}</div>
          <div className="flex">
            <StarRaiting key={recipe.id} raiting={recipe.raiting} />
          </div>
          <div className="text-sm">{camelCase(recipe.difficulty)}</div>
        </div>
      </a>
    </div>
  );
}
