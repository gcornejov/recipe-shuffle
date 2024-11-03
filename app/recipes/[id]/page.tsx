import { IngredientWithQuantity } from "@/app/lib/definitions";
import { getFullRecipe } from "@/app/lib/data";
import { formatFractions } from "@/app/lib/utils";
import { StarRaiting } from "@/app/ui/recipe";
import { FoodPlateIcon, FireIcon } from "@/app/ui/svg_icons";
import { CircularProgress, MiniGauge } from "@/app/ui/widgets";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const { recipe, recipeIngredients } = await getFullRecipe(params.id);

  return (
    <>
      <div className="relative flex bg-gradient-to-b from-orange-200 to-orange-100 p-4">
        <Image
          className="mr-4 flex-col"
          src={`${process.env.STATIC_IMAGES_BASE_URL}/desktop/${recipe.image_url}` || "https://placehold.co/300"}
          width={300}
          height={300}
          alt={recipe.name}
          loading="eager"
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
          <div className="my-auto flex">
            <div className="text-center">
              <CircularProgress
                label={{
                  amount: recipe.calories,
                  title: <FireIcon sizeClass="size-6" />,
                }}
                progress={100}
                color={{ progress: "text-red-500", label: "text-red-600" }}
              />
              <text className="text-base font-bold text-red-600">Calories</text>
            </div>

            <div className="mx-4 border-[1px] border-gray-400"></div>

            <div className="my-auto flex">
              <MiniGauge label={{ amount: recipe.carbohydrates, title: "Carbs" }} progress={Math.round((100 * (recipe.carbohydrates * 4)) / recipe.calories)} color={"text-green-600"}/>
              <MiniGauge label={{ amount: recipe.protein, title: "Proteins" }} progress={Math.round((100 * (recipe.protein * 4)) / recipe.calories)} color={"text-violet-600"}/>
              <MiniGauge label={{ amount: recipe.fats, title: "Fats" }} progress={Math.round((100 * (recipe.fats * 9)) / recipe.calories)} color={"text-yellow-600"}/>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-pattern-diagonal-lines flex flex-row bg-orange-100">
        {/* <div className="basis-[20%] py-4 pl-4"> */}
        <div className="basis-[25%] p-4">
          <ul className="sticky top-0 list-inside list-disc rounded-lg border-8 border-white/70 bg-slate-300/30 p-2">
            {recipeIngredients.map((ingredient: IngredientWithQuantity) => (
              <li key={ingredient.id} className="font-semibold">
                <span className="tabular-nums diagonal-fractions">{formatFractions(ingredient.quantity)}</span> {ingredient.unit_type} of {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-8 border-orange-100"></div>

        <text className="basis-[75%] whitespace-pre-line p-4 text-xl">
          {recipe.steps}
        </text>
      </div>
    </>
  );
}