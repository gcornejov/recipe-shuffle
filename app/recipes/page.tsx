import { SearchBar } from "@/app/ui/search";
import Separator from "@/app/ui/separator";
import { getRecipesByIngredient } from "@/app/lib/data";
import { Recipe } from "@/app/lib/definitions";

export default async function Page({ searchParams }: { searchParams?: { ingredients?: string } }) {
  const recipes: Array<Recipe> = await getRecipesByIngredient(searchParams?.ingredients)

  return (
    <>
      <div>
        <SearchBar />
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
