import { IngredientWithQuantity } from "@/app/lib/definitions";
import { getFullRecipe } from "@/app/lib/data";
import { formatFractions } from "@/app/lib/utils";
import { StarRaiting } from "@/app/ui/recipe";
import { FoodPlateIcon, FireIcon } from "@/app/ui/svg_icons";
import { CircularProgress, MiniGauge } from "@/app/ui/widgets";

export default async function Page({ params }: { params: { id: string } }) {
  const { recipe, recipeIngredients } = await getFullRecipe(params.id);

  return (
    <>
      <div className="flex p-4 relative bg-gradient-to-b from-orange-200 to-orange-100">
        <img
          className="flex-col mr-4"
          src="https://placehold.co/300"
          alt={recipe.name}
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
          <div className="flex my-auto">
            <div className="text-center">
              <CircularProgress label={{amount: recipe.calories, title: <FireIcon sizeClass="size-6" />}} progress={100} color={{progress: "text-red-500", label: "text-red-600"}} />
              <text className="text-base text-red-600 font-bold">Calories</text>
            </div>

            <div className="border-gray-400 border-[1px] mx-4"></div>
            
            <div className="flex my-auto">
              <MiniGauge label={{amount: recipe.carbohydrates, title: "Carbs"}} progress={Math.round(100*(recipe.carbohydrates*4)/recipe.calories)} color={"text-green-600"} />
              <MiniGauge label={{amount: recipe.protein, title: "Proteins"}} progress={Math.round(100*(recipe.protein*4)/recipe.calories)} color={"text-violet-600"} />
              <MiniGauge label={{amount: recipe.fats, title: "Fats"}} progress={Math.round(100*(recipe.fats*9)/recipe.calories)} color={"text-yellow-600"} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row bg-pattern-diagonal-lines bg-orange-100">
        {/* <div className="basis-[20%] py-4 pl-4"> */}
        <div className="basis-[25%] p-4">
          <ul className="sticky top-0 p-2 border-8 rounded-lg border-white/70 list-inside list-disc bg-slate-300/30">
            {recipeIngredients.map(
              (ingredient: IngredientWithQuantity) =>
                <li key={ingredient.id} className="font-semibold">
                  <span className="tabular-nums diagonal-fractions">{formatFractions(ingredient.quantity)}</span> {ingredient.unit_type} of {ingredient.name}
                </li>
            )}
          </ul>
        </div>

        <div className="border-8 border-orange-100"></div>
        
        <text className="basis-[75%] whitespace-pre-line text-xl p-4">
          {recipe.steps.replaceAll("\\n","\n\n")}
        </text>
      </div>
    </>
  );
}