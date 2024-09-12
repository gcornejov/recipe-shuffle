export type MeasureUnit = "unit" | "head" | "cup" | "tbsp" | "tsp" | "g" | "ml";

export type NutritionalValue = {
    calories: number,
    carbohydrates: number,
    proteins: number,
    fats: number,
};

export type Ingredient = NutritionalValue & {
    id: string,
    name: string,
    measure_type: MeasureUnit,
};

export type Recipe = {
    id: string,
    name: string,
    description: string,
    steps: string,
};

export type IngredientWithQuantity = Ingredient & { quantity: number };

export type RecipeWithIngredients = Recipe & { ingredients?: Array<IngredientWithQuantity> };
