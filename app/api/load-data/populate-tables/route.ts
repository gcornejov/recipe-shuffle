import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Macros = {
    calories: number,
    carbohydrates: number,
    protein: number,
    fat: number,
}

type Ingredient = {
    id: string,
    name: string,
    measure_type: string,
    macros: Macros;
}

type RecipeIngredient = {
    id: string,
    ingredient_id: string,
    quantity: number
}

type Recipe = {
    id: string;
    name: string;
    ingredients: Array<RecipeIngredient>;
}

export async function GET(request: Request) {
    /*
    DELETE FROM recipes_ingredients;
    DELETE FROM recipes;
    DELETE FROM ingredients;
    */
    const client = await db.connect();

    try {
        await client.sql`BEGIN`;
        const fs = require('fs');
        const recipes: Array<Recipe> = JSON.parse(fs.readFileSync('data/recipes.json', 'utf8'));
        const ingredients: Array<Ingredient> = JSON.parse(fs.readFileSync('data/ingredients.json', 'utf8'));

        const insert_ingredients_responses = await Promise.all(
            ingredients.map(
                (ingredient: Ingredient) => client.sql`
                    INSERT INTO ingredients (id, name, measure_type, calores, carbohydrates, protein, fats)
                    VALUES (${ingredient.id}, ${ingredient.name}, ${ingredient.measure_type}, ${ingredient.macros.calories}, ${ingredient.macros.carbohydrates}, ${ingredient.macros.protein}, ${ingredient.macros.fat})
                `,
            )
        ); 
        const insert_recipes_response = await Promise.all(
            recipes.map(
                (recipe: Recipe) => client.sql`
                    INSERT INTO recipes VALUES (${recipe.id},${recipe.name},'','')
                `,
            )
        );
        const insert_recipes_ingredients_response = await Promise.all(
            recipes.map(
                (recipe: Recipe) => recipe.ingredients.map(
                    (recipe_ingredient: RecipeIngredient) => client.sql`
                        INSERT INTO recipes_ingredients VALUES (${recipe_ingredient.id}, ${recipe.id}, ${recipe_ingredient.ingredient_id}, ${recipe_ingredient.quantity})
                    `,
                )
            )
        );
        
        await client.sql`COMMIT`;

        return NextResponse.json({
            insert_ingredients_responses,
            insert_recipes_response,
            insert_recipes_ingredients_response,
        }, 
        { status: 200 }
    );
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}