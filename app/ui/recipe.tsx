import { RecipeBriefing } from "@/app/lib/definitions";
import { StarIcon, FoodPlateIcon, FireIcon } from "@/app/ui/svg_icons";
import { pascalCase } from "@/app/lib/utils";

const STARS_QUANTITY = 5

export function StarRaiting({raiting, maxRaiting}: {raiting: number, maxRaiting?: number}): JSX.Element {
  const stars: Array<JSX.Element> = []

  for (let i = 0; i < (maxRaiting || STARS_QUANTITY); i++) {
    const raitingStep: number = raiting - i;
    const fillRatio: number = (raitingStep < 1) ? ((raitingStep > 0) ? raitingStep : 0) : 1;

    stars.push(<StarIcon key={i} fillRatio={fillRatio} />);
  }

  return (
    <>
      <div className="flex">
        {stars}
        <div className="inline-block align-middle ml-1 text-lg">{raiting}</div>
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
          <div className={recipeClassName}>{pascalCase(recipe.difficulty)}</div>
          <div className="absolute bottom-0 right-0">
            <div className="grid grid-rows-2 grid-flow-col gap-x-1">
              <div className="text-md self-center justify-self-end">{recipe.servings}</div>
              <div className="text-md self-center justify-self-end">{recipe.calories}</div>
              <FoodPlateIcon className="place-self-center" />
              <FireIcon className="place-self-center" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}