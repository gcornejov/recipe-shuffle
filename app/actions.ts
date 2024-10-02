'use server'

import { sql } from "@vercel/postgres";

export async function getSuggestion(candidate?: string): Promise<string> {
    if (!candidate) {
        return ""
    }

    const queryResult = await sql`
        SELECT name FROM ingredients WHERE name ILIKE ${`${candidate}%`} ORDER BY name;
    `;

    return queryResult.rows.length ? queryResult.rows[0]["name"] : "";
}
