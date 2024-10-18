export type MeasureUnit = 'unit' | 'head' | 'clove' | 'cup' | 'tbsp' | 'tsp' | 'mg' | 'g' | 'ml' | 'L';
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

export type Recipe = NutritionalValue & {
    id: string,
    name: string,
    difficulty: DifficultyLevel,
    raiting: number,
    description: string,
    steps: string,
    servings: number,
};

export type RecipeBriefing = Omit<Recipe, "description" | "steps" | "carbohydrates" | "proteins" | "fats">

export type IngredientWithQuantity = Ingredient & { quantity: number };

export type RecipeWithIngredients = Recipe & { ingredients?: Array<IngredientWithQuantity> };
