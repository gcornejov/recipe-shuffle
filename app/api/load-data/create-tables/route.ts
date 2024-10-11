import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    /*
    DROP TABLE IF EXISTS recipes_ingredients;
    DROP TABLE IF EXISTS recipes;
    DROP TABLE IF EXISTS ingredients;
    DROP TYPE measure_unit;
    DROP TYPE difficulty_level;
    */
    const client = await db.connect();

    try {
        await client.sql`BEGIN`;

        const measure_units_type_result = await client.sql`
            CREATE TYPE measure_unit AS ENUM(
                'unit',
                'head',
                'cup',
                'tbsp',
                'tsp',
                'g',
                'ml'
            );`;
        console.log(measure_units_type_result);

        const difficulty_level_result = await client.sql`
            CREATE TYPE difficulty_level AS ENUM(
                'easy',
                'medium',
                'hard'
            );`;
        console.log(difficulty_level_result);

        const ingredients_result = await client.sql`
            CREATE TABLE ingredients( 
                id VARCHAR PRIMARY KEY,
                name VARCHAR,
                unit_type measure_unit,
                calories NUMERIC(6,2),
                carbohydrates NUMERIC(6,2),
                protein NUMERIC(6,2),
                fats NUMERIC(6,2)
            );`;
        console.log(ingredients_result);

        const recipes_result = await client.sql`
            CREATE TABLE recipes(
                id VARCHAR PRIMARY KEY,
                name VARCHAR,
                difficulty difficulty_level,
                raiting NUMERIC(2,1),
                description VARCHAR,
                steps VARCHAR
            );
        `;
        console.log(recipes_result);

        const recipes_ingredients_result = await client.sql`
            CREATE TABLE recipes_ingredients(
                id VARCHAR PRIMARY KEY,
                recipe_id VARCHAR,
                ingredient_id VARCHAR,
                quantity NUMERIC(6,2),
                CONSTRAINT fk_recipe FOREIGN KEY(recipe_id) REFERENCES recipes(id),
                CONSTRAINT fk_ingredient FOREIGN KEY(ingredient_id) REFERENCES ingredients(id)
            );
        `;
        console.log(recipes_ingredients_result);
        
        await client.sql`COMMIT`;

        return NextResponse.json({
                measure_units_type_result,
                difficulty_level_result,
                ingredients_result,
                recipes_result,
                recipes_ingredients_result,
            }, 
            { status: 200 }
        );
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}
