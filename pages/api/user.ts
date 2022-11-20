// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { artists } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../services/prisma';

type Data = {
    artistas: artists[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const numeroPaginaString = req.query.pagina! as string;
    const numeroPagina = parseInt(numeroPaginaString) - 1;

    const artistas = await prisma.artists.findMany({
        skip: numeroPagina * 15,
        take: 15,
        include: {
            // _count: true,
            artworks: true,
        },
        // where: {
        //     title: 'Adolph Gottlieb',
        // },
    });

    // const artistas = await prisma.$queryRaw`SELECT * FROM show_artists` ;
    // console.log(artistas);
    // console.log(artistas[0].artworks);
    // console.log(artistas[0].artworks);

    // const pagina = 3;

    // const artistasPaginados = artistas.slice((pagina - 1) * 14, pagina * 14).map((artista) => {
    //     return artista;
    // });

    // console.log(artistasPaginados);

    res.status(200).json({
        artistas: artistas,
    });
    // return {
    //     props: {
    //         artistas: artistas,
    //     },
    // };
}
