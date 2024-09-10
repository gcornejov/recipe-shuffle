import { sql } from "@vercel/postgres";
import { Recipe } from "@/app/lib/definitions";

export async function getRecipesByIngredient(ingredientName: string | undefined) {
    if (!ingredientName) {
        return [];
    }

    const formatedIngredentName = `%${ingredientName}%`

    const recipes = await sql<Recipe>`
        SELECT r.* 
        FROM recipes r 
        INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id 
        INNER JOIN ingredients i ON i.id = ri.ingredient_id
        WHERE i.name ILIKE ${formatedIngredentName};
    `;

    return recipes.rows;  
}
