export type MeasureUnit = "unit" | "head" | "cup" | "tbsp" | "tsp" | "g" | "ml";
export type DifficultyLevel = "easy" | "medium" | "hard";

export type NutritionalValue = {
    calories: number,
    carbohydrates: number,
    proteins: number,
    fats: number,
};

export type Ingredient = NutritionalValue & {
    id: string,
    name: string,
    unit_type: MeasureUnit,
};

export type Recipe = {
    id: string,
    name: string,
    difficulty: DifficultyLevel,
    raiting: number,
    description: string,
    steps: string,
};

export type RecipeBriefing = Omit<Recipe, "description" | "steps">

export type IngredientWithQuantity = Ingredient & { quantity: number };

export type RecipeWithIngredients = Recipe & { ingredients?: Array<IngredientWithQuantity> };
