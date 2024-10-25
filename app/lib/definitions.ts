export type WholeUnit = 'unit' | 'head' | 'clove';
export type MeasureUnit = 'unit' | 'head' | 'clove' | 'cup' | 'tbsp' | 'tsp' | 'mg' | 'g' | 'ml' | 'L';
export type DifficultyLevel = "easy" | "medium" | "hard";

export type NutritionalValue = {
    calories: number,
    carbohydrates: number,
    protein: number,
    fats: number,
};

export type Ingredient = NutritionalValue & {
    id: string,
    name: string,
};

export type Recipe = NutritionalValue & {
    id: string,
    name: string,
    difficulty: DifficultyLevel,
    raiting: number,
    description: string,
    steps: string,
    servings: number,
    image_url: string,
};

export type RecipeBriefing = Omit<Recipe, "description" | "steps" | "carbohydrates" | "protein" | "fats">

export type IngredientWithQuantity = Ingredient & { unit_type: MeasureUnit, quantity: number };

export type RecipeWithIngredients = Recipe & { ingredients?: Array<IngredientWithQuantity> };
