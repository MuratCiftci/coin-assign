// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    console.log(req.method);
    if (req.method === 'GET') {
        try {
            console.log('get');
            // limit 10 and get the latest posts
            const data = await prisma.post.findMany({ take: 10, orderBy: { createdAt: 'desc' } });

            console.log(data);
            return res.status(200).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ data: 'Something went wrong' });
        }
    }


    if (req.method === 'POST') {
        const { title, content, coin_id, image , subtitle} = req.body;
        if (!title || !content || !coin_id) {
            return res.status(400).json({ data: 'Missing title, content, or coin_id' });
        }
        try {
            const data = await prisma.post.create({
                data: {
                    title,
                    content,
                    subtitle,
                    image,
                    coin_id,
                },
            });
            if (!data) {
                return res.status(400).json({ data: 'Something went wrong' });
            }
            return res.status(201).json({ data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ data: 'Something went wrong' });
        }
    }
    else {
        return res.status(405).json({ data: 'Method not allowed' });
    }

}


