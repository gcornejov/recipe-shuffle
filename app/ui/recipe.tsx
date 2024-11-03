import { RecipeBriefing } from "@/app/lib/definitions";
import { StarIcon, FoodPlateIcon, FireIcon } from "@/app/ui/svg_icons";
import { pascalCase } from "@/app/lib/utils";
import Image from "next/image";

const STARS_QUANTITY: number = 5;

export function StarRaiting({raiting, maxRaiting}: {raiting: number, maxRaiting?: number}): JSX.Element {
  const stars: Array<JSX.Element> = []

  for (let i = 0; i < (maxRaiting || STARS_QUANTITY); i++) {
    const raitingStep: number = raiting - i;
    const fillRatio: number = raitingStep < 1 ? (raitingStep > 0 ? raitingStep : 0) : 1;

    stars.push(<StarIcon key={i} fillRatio={fillRatio} />);
  }

  return (
    <>
      <div className="flex">
        {stars}
        <div className="ml-1 inline-block align-middle text-lg">{raiting}</div>
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
    <div className="w-96 place-self-center rounded-lg border-2 border-gray-400 bg-gray-200 p-2 shadow-lg duration-200 ease-in hover:scale-110">
      <a href={`/recipes/${recipe.id}`} className="flex">
        <Image
          className="mr-4 flex-col"
          src={`${process.env.STATIC_IMAGES_BASE_URL}/thumbnail/${recipe.image_url}` || "https://placehold.co/300"}
          width={150}
          height={150}
          alt={`${recipe.name} Thumbnail`}
          loading="eager"
        />
        <div className="relative w-full">
          <div className="text-lg">{recipe.name}</div>
          <StarRaiting key={recipe.id} raiting={recipe.raiting} />
          <div className={recipeClassName}>{pascalCase(recipe.difficulty)}</div>
          <div className="absolute bottom-0 right-0">
            <div className="grid grid-flow-col grid-rows-2 gap-x-1">
              <div className="text-md self-center justify-self-end">
                {recipe.servings}
              </div>
              <div className="text-md self-center justify-self-end">
                {recipe.calories}
              </div>
              <FoodPlateIcon className="place-self-center" />
              <FireIcon className="place-self-center" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
