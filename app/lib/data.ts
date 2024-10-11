import { sql } from "@vercel/postgres";
import { IngredientWithQuantity, NutritionalValue, Recipe, RecipeBriefing } from "@/app/lib/definitions";

export async function getRecipesByIngredient(ingredientName: string | undefined): Promise<Array<Recipe>> {
    if (!ingredientName) {
        return [];
    }

    const queryResult = await sql<Recipe>`
        SELECT DISTINCT r.*
        FROM recipes r
        INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id
        INNER JOIN ingredients i ON i.id = ri.ingredient_id
        WHERE i.name ILIKE ${`%${ingredientName}%`};
    `;

    return queryResult.rows;
}

export async function getRecipesByIngredients(ingredients: Array<string>): Promise<Array<RecipeBriefing>> {
    if (!ingredients) {
        return [];
    }

    const ingredientsFilter = ingredients
        .map((_, index: number) => `i.name = $${index + 1}`)
        .join(" OR ");

    const query = `
        SELECT DISTINCT r.id, r.name, r.difficulty, r.raiting
        FROM recipes r
        INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id
        INNER JOIN ingredients i ON i.id = ri.ingredient_id
        WHERE ${ingredientsFilter};
    `;
    const queryResult = await sql.query(query, ingredients);

    return queryResult.rows;
}

export async function getFullRecipe(recipeId: string) {
    const queryRecipe = sql<Recipe>`SELECT * FROM recipes WHERE id = ${recipeId};`;

    const queryRecipeIngredients = sql<IngredientWithQuantity>`
        SELECT 
            i.*,
            ri.quantity quantity
        FROM recipes r
        INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id
        INNER JOIN ingredients i ON i.id = ri.ingredient_id
        WHERE r.id = ${recipeId};
    `;

    const queryRecipeNutritionalAgg = sql<NutritionalValue>`
        SELECT
            ROUND(SUM(i.calories * ri.quantity)) calories,
            ROUND(SUM(i.carbohydrates * ri.quantity)) carbohydrates,
            ROUND(SUM(i.protein * ri.quantity)) proteins,
            ROUND(SUM(i.fats * ri.quantity)) fats
        FROM recipes r
        INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id
        INNER JOIN ingredients i ON i.id = ri.ingredient_id
        WHERE r.id = ${recipeId};
    `;

    const data = await Promise.all([
        queryRecipe,
        queryRecipeIngredients,
        queryRecipeNutritionalAgg
    ]);

    return {
        recipe: data[0].rows[0],
        recipeIngredients: data[1].rows,
        recipeNutritionalAgg: data[2].rows[0],
    };
}
