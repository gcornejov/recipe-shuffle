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
  const difficultyColor: Record<string, string> = {
    easy: "text-[#53A946]",
    medium: "text-[#FF860F]",
    hard: "text-[#E24647]",
  };
  const recipeClassName: string = `text-md font-semibold ${difficultyColor[recipe.difficulty]}`;

  return (
    <div className="w-96 rounded-lg border-2 place-self-center border-gray-400 p-2 shadow-lg duration-200 ease-in hover:scale-110 bg-gray-200">
      <a href={`/recipes/${recipe.id}`} className="flex">
        <img
          className="mr-4 flex-col"
          src="https://placehold.co/150"
          alt={`${recipe.name} Thumbnail`}
        />
        <div className="w-full relative">
          <div className="text-lg">{recipe.name}</div>
          <StarRaiting key={recipe.id} raiting={recipe.raiting} />
          <div className={recipeClassName}>{camelCase(recipe.difficulty)}</div>
          <div className="absolute bottom-0 right-0 mr-2">
            <div className="grid grid-rows-2 grid-flow-col gap-x-1">
              <div className="text-md self-center justify-self-end">{recipe.servings}</div>
              <div className="text-md self-center justify-self-end">{recipe.calories}</div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-51.2 -51.2 614.40 614.40" fill="currentColor" className="size-7 place-self-center">
                <path fillRule="evenodd" d="M494.434,315.678h-30.737c-8.33-99.351-86.634-179.103-185.34-189.677c4.801-15.151-6.544-30.542-22.357-30.542 c-15.83,0-27.153,15.407-22.357,30.542c-98.707,10.574-177.01,90.327-185.34,189.677H17.566C7.865,315.678,0,323.543,0,333.244 c0,9.701,7.865,17.565,17.566,17.565h29.99v13.612c0,28.738,23.381,52.119,52.12,52.119h312.648 c28.74,0,52.12-23.381,52.12-52.119v-13.612h29.99c9.701,0,17.565-7.865,17.565-17.565 C512,323.543,504.135,315.678,494.434,315.678z M112.028,273.83c15.615-37.716,46.155-68.42,83.79-84.238 c8.943-3.761,19.24,0.444,22.999,9.387c3.759,8.944-0.444,19.241-9.387,23c-29.17,12.261-52.841,36.057-64.942,65.29 c-3.706,8.953-13.973,13.224-22.949,9.51C112.576,293.067,108.318,282.792,112.028,273.83z M429.313,364.421 c0,9.367-7.621,16.988-16.989,16.988H99.676c-9.368,0-16.989-7.621-16.989-16.988v-13.612h346.626V364.421z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 place-self-center">
                <path fillRule="evenodd" d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
