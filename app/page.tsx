import Search from "@/app/ui/search";
import { getRecipesByIngredient } from "@/app/lib/data";
import { Recipe } from "@/app/lib/definitions";

export default async function Page({ searchParams }: { searchParams?: { ingredients?: string } }) {
  const recipes: Array<Recipe> = await getRecipesByIngredient(searchParams?.ingredients)
  console.log(recipes);

  return (
    <>
      <div>
        <Search />
      </div>
      <div>
        {recipes &&
          recipes.map((recipe: Recipe) => (
            <p key={recipe.id}>{recipe.name}</p>
          ))
        }
      </div>
    </>
  );
}
