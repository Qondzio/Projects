import type { Request, Response } from 'express';
import type {DatabaseResult} from '../../src/types/types.ts';
import query from '../../src/config/queries.ts'

async function getNews(req: Request, res: Response){
    try {
        const country=req.params.country as string;
        const q: DatabaseResult[]=await query.getData(country)
        res.json(q)

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to fetch news'});
    }
}

export default {getNews}