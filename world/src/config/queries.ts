import pool from "./db.ts";
import type {DatabaseResult,NewsResult,SerpApiResponse} from '../types/types.ts'
import timeAgo from '../../server/controllers/timeAgo.ts';


async function getData(country: string): Promise <DatabaseResult[]> {
    try {
        const result = await pool.query("SELECT * FROM countries WHERE country_name = $1", [country.toLowerCase()]);
        if(result.rows.length === 0 || Date.now() - new Date(result.rows[0].last_updated).getTime() >= 24 * 60 * 60 * 1000){
            const res=await updateData(country);            
            return res[0].news;
        }
        return result.rows[0].news
    } catch (error) {
        console.error("Database error:", error);
  }
}

async function updateData(country: string){
    try {
        const response= await fetch(`https://serpapi.com/search.json?engine=google_news&q=${country}}&gl=us&hl=en&api_key=${process.env.API_KEY}`);
        if(!response.ok){
            throw new Error(`API Error: ${response.status}`);
        }
        const data: SerpApiResponse=await response.json();
        const articles: NewsResult[] = data.news_results.flatMap(result => {
            const items = result.stories ?? [result];
            return items.map(item => ({
                title: item.title,
                url: item.link,
                image: item.thumbnail ?? null,
                publishedAt: timeAgo(item.iso_date as string) ?? null,
                publisherName: item.source?.name,
                publisherIcon: item.source?.icon
            }));
        });
        
        const result=await pool.query(`INSERT INTO countries (country_name, news, last_updated)
            VALUES ($1, $2::jsonb, NOW())
            ON CONFLICT (country_name)
            DO UPDATE SET
                news = EXCLUDED.news,
                last_updated = NOW()
            RETURNING *`,
        [country.toLowerCase(), JSON.stringify(articles)]);

        return result.rows
    } catch (error) {
        console.error("Failed to update database: ", error)
        throw error;
    }
}

export default {getData}