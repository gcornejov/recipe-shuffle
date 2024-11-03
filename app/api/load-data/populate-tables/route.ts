import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Macros = {
    calories: number,
    carbohydrates: number,
    protein: number,
    fats: number,
}

type Conversion = {
    id: string,
    unit_type: string,
    ratio: number,
}

type Ingredient = {
    id: string,
    name: string,
    macros: Macros,
    conversions: Array<Conversion>,
}

type RecipeIngredient = {
    id: string,
    ingredient_id: string,
    unit_type: string,
    quantity: number,
}

type Recipe = {
    id: string,
    name: string,
    difficulty: string,
    raiting: number,
    description: string,
    ingredients: Array<RecipeIngredient>,
    macros: Macros,
    servings: number,
    steps: string,
    image_url: string,
}

export async function GET(_: Request) {
    /*
    DELETE FROM recipes_ingredients;
    DELETE FROM recipes;
    DELETE FROM conversions;
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
                    INSERT INTO ingredients 
                    VALUES (${ingredient.id}, ${ingredient.name}, ${ingredient.macros.calories}, ${ingredient.macros.carbohydrates}, ${ingredient.macros.protein}, ${ingredient.macros.fats});
                `,
            )
        );
        const insert_conversions_responses = await Promise.all(
            ingredients.map(
                (ingredient: Ingredient) => ingredient.conversions.map(
                    (convesion: Conversion) => client.sql`
                        INSERT INTO conversions VALUES (${convesion.id}, ${ingredient.id}, ${convesion.unit_type}, ${convesion.ratio});
                    `,
                )
            )
        );
        const insert_recipes_response = await Promise.all(
            recipes.map(
                (recipe: Recipe) => client.sql`
                    INSERT INTO recipes VALUES (${recipe.id}, ${recipe.name}, ${recipe.difficulty}, ${recipe.raiting}, ${recipe.description}, ${recipe.steps}, ${recipe.macros.calories}, ${recipe.macros.carbohydrates}, ${recipe.macros.protein}, ${recipe.macros.fats}, ${recipe.servings}, ${recipe.image_url});
                `,
            )
        );
        const insert_recipes_ingredients_response = await Promise.all(
            recipes.map(
                (recipe: Recipe) => recipe.ingredients.map(
                    (recipe_ingredient: RecipeIngredient) => client.sql`
                        INSERT INTO recipes_ingredients VALUES (${recipe_ingredient.id}, ${recipe.id}, ${recipe_ingredient.ingredient_id}, ${recipe_ingredient.unit_type}, ${recipe_ingredient.quantity});
                    `,
                )
            )
        );

        // await client.sql`COMMIT`;

        return NextResponse.json(
            {
                insert_ingredients_responses,
                insert_conversions_responses,
                insert_recipes_response,
                insert_recipes_ingredients_response,
            },
            { status: 200 }
        );
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}