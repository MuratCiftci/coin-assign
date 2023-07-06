// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma';

type Data = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    subtitle: string;
    image: string;
    content: string;
    coin_id: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | Data>
) {
    if (req.method === 'GET') {
        try {
            console.log('get');
            console.log(req.query);
            const coin_id = req.query.id as string;
            if (!coin_id) {
                return res.status(400).json( { data: 'Missing coin_id' });
            }

            // get by coin_id and get the latest posts 
            const data = await prisma.post.findMany({ where: { coin_id: { equals: coin_id } }, take: 10, orderBy: { createdAt: 'desc' } });

            console.log(data);
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ data: 'Something went wrong' });
        }
    } else {
        return res.status(405).json({ data: 'Method not allowed' });
    }
}


