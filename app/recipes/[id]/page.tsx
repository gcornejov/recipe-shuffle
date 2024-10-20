import Separator from "@/app/ui/separator";
import { IngredientWithQuantity } from "@/app/lib/definitions";
import { getFullRecipe } from "@/app/lib/data";
import { formatFractions } from "@/app/lib/utils";
import { StarRaiting } from "@/app/ui/recipe";
import { FoodPlateIcon } from "@/app/ui/svg_icons";

export default async function Page({ params }: { params: { id: string } }) {
  const { recipe, recipeIngredients } = await getFullRecipe(params.id);

  return (
    <>
      <div className="flex p-4 relative">
        <img
          className="flex-col mr-4"
          src="https://placehold.co/250"
          alt={`${recipe.name} Thumbnail`}
        />
        <div className="absolute right-4">
          <StarRaiting raiting={recipe.raiting} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl">{recipe.name}</h1>
          <div className="flex content-center">
            <FoodPlateIcon className="mr-1" />
            <div className="text-md place-self-center">{recipe.servings} Servings</div>
          </div>
          <text>{recipe.description || "Description Here..."}</text>
          <div className="my-auto">
            <div>{`Calories: ${recipe.calories}`}</div>
            <div>{`Carbohydrates: ${recipe.carbohydrates}`}</div>
            <div>{`Proteins: ${recipe.protein}`}</div>
            <div>{`Fats: ${recipe.fats}`}</div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row p-4">
        <div className="basis-[20%]">
          <ul className="sticky top-0 list-inside list-disc">
            {recipeIngredients.map(
              (ingredient: IngredientWithQuantity) =>
                <li key={ingredient.id}>
                  <span className="tabular-nums diagonal-fractions">{formatFractions(ingredient.quantity)}</span> {ingredient.unit_type} of {ingredient.name}
                </li>
            )}
          </ul>
        </div>
        <text className="basis-[80%] whitespace-pre-line text-xl">
          {recipe.steps.replaceAll("\\n","\n\n")}
        </text>
      </div>
    </>
  );
}