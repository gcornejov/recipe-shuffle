import { SearchBarAutosuggest, SearchTags, RecipeCard } from "@/app/ui/search";
import { getRecipesByIngredients } from "@/app/lib/data";
import { RecipeBriefing } from "@/app/lib/definitions";

function parseIngredientsParams(ingredients?: string | Object): Array<string> {
  if (!ingredients) {
    return [""]
  }

  return typeof ingredients === "string" ? [ingredients] : Object.values(ingredients);
}

export default async function Page({ searchParams }: { searchParams?: { ingredient?: string | Object } }) {
  const ingredients: Array<string> = parseIngredientsParams(searchParams?.ingredient);
  const recipes: Array<RecipeBriefing> = await getRecipesByIngredients(ingredients);

  return (
    <>
      {/* <div className="bg-pattern-leaf bg-[#6FC276]"> */}
      <div className="bg-pattern-leaf bg-[#6FC276]">
        <h1 className="flex justify-center border-y-[30px] border-transparent text-5xl font-bold text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
          What&apos;s on your fridge?
        </h1>
        <SearchBarAutosuggest />
        <SearchTags />
      </div>

      {recipes.length > 0 && (
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 bg-gradient-to-b from-[#6FC276] to-[#BDC26F] px-6 py-4">
          {recipes.map((recipe: RecipeBriefing, index: number) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
}
