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
            const id = req.query.id as string;
            // get by news id detail 
            const data = await prisma.post.findUnique({ where: { id: Number(id) } });

            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ data: 'Something went wrong' });
        }
    }
    if (req.method === 'PUT') {

        try {
            const id = req.query.id as string;
            const { title, content, coin_id, image, subtitle } = req.body;
            if (!title || !content || !coin_id) {
                return res.status(400).json({ data: 'Missing title, content, or coin_id' });
            }

            const data = await prisma.post.update({ where: { id: Number(id) }, data: { title, content, subtitle, image, coin_id } });
            if (!data) {
                return res.status(400).json({ data: 'Something went wrong' });
            }

            return res.status(201).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ data: 'Something went wrong' });
        }

    }

}
