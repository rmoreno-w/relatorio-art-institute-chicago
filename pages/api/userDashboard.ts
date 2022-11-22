import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../services/prisma';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const dadosPizza = await prisma.artworks.groupBy({
        by: ['place_of_origin'],
        _count: {
            place_of_origin: true,
        },
        orderBy: {
            _count: {
                place_of_origin: 'desc',
            },
        },
    });

    const top10Dados = dadosPizza.slice(0, 10);
    console.log(top10Dados);
    res.status(200).json({
        dadosPizza: top10Dados,
    });
}
