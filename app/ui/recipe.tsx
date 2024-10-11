import Separator from "@/app/ui/separator";
import { IngredientWithQuantity } from "@/app/lib/definitions";
import { getFullRecipe } from "@/app/lib/data";
import { LoremIpsum } from "lorem-ipsum";


export default async function RecipeDetailComponent({ id }: { id: string }) {
  // const lorem = new LoremIpsum({
  //   sentencesPerParagraph: {
  //     max: 8,
  //     min: 4
  //   },
  //   wordsPerSentence: {
  //     max: 16,
  //     min: 4
  //   }
  // });

  const { recipe, recipeIngredients, recipeNutritionalAgg } = await getFullRecipe(id);
  console.log(recipe);

  return (
    <>
      <div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description || "Description Here..."}</p>
      </div>
      <Separator />
      <div className="flex">
        <div className="mr-4">{`Calories: ${recipeNutritionalAgg.calories}`}</div>
        <div className="mr-4">{`Carbohydrates: ${recipeNutritionalAgg.carbohydrates}`}</div>
        <div className="mr-4">{`Proteins: ${recipeNutritionalAgg.proteins}`}</div>
        <div className="mr-4">{`Fats: ${recipeNutritionalAgg.fats}`}</div>
      </div>
      <Separator />
      <div>
        {recipeIngredients.map(
          (ingredient: IngredientWithQuantity) =>
            <p key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit_type} - {ingredient.name}
            </p>
        )}
      </div>
      <Separator />
      <div>
        <p>{recipe.steps || "Steps Here..."}</p>
      </div>
    </>
  );
}
