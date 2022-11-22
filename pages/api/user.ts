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

    const filtroDeOrdem = req.query.filtroDeOrdem! as string | '';

    const id = parseInt(req.query.id! as string);
    const nomeDaObra = req.query.nomeDaObra;
    const nomeDoArtista = req.query.nomeDoArtista;
    const tipoDaObra = req.query.tipoDaObra;
    const nomeDepartamento = req.query.nomeDepartamento;
    const anoInicio = parseInt(req.query.anoInicio! as string);
    const anoFim = parseInt(req.query.anoFim! as string);
    const lugarDeOrigem = req.query.lugarDeOrigem;

    let filtroBusca = {};
    id && id != NaN ? (filtroBusca = { ...filtroBusca, id }) : null;
    nomeDoArtista ? (filtroBusca = { ...filtroBusca, artists: { title: { contains: nomeDoArtista } } }) : null;
    nomeDaObra ? (filtroBusca = { ...filtroBusca, title: { contains: nomeDaObra } }) : null;
    tipoDaObra ? (filtroBusca = { ...filtroBusca, artwork_types: { title: { contains: tipoDaObra } } }) : null;
    nomeDepartamento
        ? (filtroBusca = { ...filtroBusca, departments: { title: { contains: nomeDepartamento } } })
        : null;
    anoInicio && anoInicio != NaN ? (filtroBusca = { ...filtroBusca, date_start: anoInicio }) : null;
    anoFim && anoFim != NaN ? (filtroBusca = { ...filtroBusca, date_end: anoFim }) : null;
    lugarDeOrigem ? (filtroBusca = { ...filtroBusca, place_of_origin: { contains: lugarDeOrigem } }) : null;

    let filtroOrdem = {};
    // console.log(filtroDeOrdem);
    filtroDeOrdem == 'nomeArtista' ? (filtroOrdem = { artists: { title: 'asc' } }) : null;
    filtroDeOrdem == 'nomeObra' ? (filtroOrdem = { title: 'asc' }) : null;
    filtroDeOrdem == 'tipoObra' ? (filtroOrdem = { artwork_types: { title: 'asc' } }) : null;
    filtroDeOrdem == 'nomeDepartamento' ? (filtroOrdem = { departments: { title: 'asc' } }) : null;
    filtroDeOrdem == 'anoInicio' ? (filtroOrdem = { date_start: 'asc' }) : null;
    filtroDeOrdem == 'anoFim' ? (filtroOrdem = { date_end: 'asc' }) : null;
    filtroDeOrdem == 'lugarOrigem' ? (filtroOrdem = { place_of_origin: 'asc' }) : null;
    // const areFiltersEmpty = Object.keys(filtroBusca).length === 0 ? true : false;
    // console.log('\n\n\n');

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
        where: {
            ...filtroBusca,
        },
        orderBy: {
            ...filtroOrdem,
        },
    });

    // console.log(obras);
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
