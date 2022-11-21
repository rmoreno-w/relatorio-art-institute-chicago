// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { artists, artworks, artwork_types, departments, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../services/prisma';

type Data = {
    obras:
        | (artworks & {
              artists: artists | null;
              artwork_types: artwork_types | null;
              departments: departments | null;
              _count: Prisma.ArtworksCountOutputType;
          })[]
        | undefined;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const numeroPaginaString = req.query.pagina! as string;
    const numeroPagina = parseInt(numeroPaginaString) - 1;

    const obras = await prisma.artworks.findMany({
        skip: numeroPagina * 15,
        take: 15,
        include: {
            _count: true,
            artists: true,
            departments: true,
            artwork_types: true,
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

    // console.log(obras);
    // console.log(`\n\n\n`);

    res.status(200).json({
        obras: obras,
    });
    // return {
    //     props: {
    //         artistas: artistas,
    //     },
    // };
}
