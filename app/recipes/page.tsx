import { SearchBar, SearchBarAutosuggest, SearchTag } from "@/app/ui/search";
import Separator from "@/app/ui/separator";
import { getRecipesByIngredients } from "@/app/lib/data";
import { Recipe } from "@/app/lib/definitions";

function parseIngredientsParams(ingredients?: string | Object): Array<string> {
  if (!ingredients) {
    return [""]
  }

  return typeof ingredients === "string" ? [ingredients] : Object.values(ingredients);
}

export default async function Page({ searchParams }: { searchParams?: { ingredient?: string | Object } }) {
  const ingredients: Array<string> = parseIngredientsParams(searchParams?.ingredient);
  const recipes: Array<Recipe> = await getRecipesByIngredients(ingredients);

  return (
    <>
      <div>
        <SearchBarAutosuggest />
        <SearchTag />
        <Separator />
      </div>
      <div>
        {recipes &&
          recipes.map((recipe: Recipe) => (
            <p key={recipe.id}>
              <a 
              href={`/recipes/${recipe.id}`}
              >
                {recipe.name}
              </a>
            </p>
          ))
        }
      </div>
    </>
  );
}
