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
    numeroDeObrasEncontradas?: number;
    dadosPizza?: {
        labels: any[];
        series: any[];
    };
    dadosTreeMap?: {
        data: {
            x: string;
            y: number;
        }[];
    };
    dataObraMaisAntiga?: number;
    mediaIdade?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const numeroPaginaString = req.query.pagina! as string;
    console.log(numeroPaginaString);

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

    const obrasPaginadas = await prisma.artworks.findMany({
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

    if (numeroPaginaString == '1') {
        const obras = await prisma.artworks.findMany({
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
        const numeroDeObrasEncontradas = obras.length;

        const dadosPizza = await prisma.artworks.groupBy({
            by: ['place_of_origin'],
            _count: {
                place_of_origin: true,
            },
            where: {
                ...filtroBusca,
            },
            orderBy: {
                _count: {
                    place_of_origin: 'desc',
                },
            },
        });
        const top10DadosPizza = dadosPizza.slice(0, 10);
        let pizzaSeries = top10DadosPizza.map((cidade: any) => {
            return cidade._count.place_of_origin;
        });
        // Filtrando nulls
        pizzaSeries = pizzaSeries.filter((quantidade) => quantidade);
        let pizzaLabels = top10DadosPizza.map((cidade: any) => {
            return cidade.place_of_origin;
        });
        pizzaLabels = pizzaLabels.filter((label) => label);

        const dataAndLabelsPizzaChart = {
            series: pizzaSeries,
            labels: pizzaLabels,
        };

        const dadosTreeMap = await prisma.artworks.groupBy({
            by: ['id_artwork_type'],
            _count: {
                id_artwork_type: true,
            },
            where: {
                ...filtroBusca,
            },
            orderBy: {
                _count: {
                    id_artwork_type: 'desc',
                },
            },
        });
        const top10TreeMap = dadosTreeMap.slice(0, 10);
        let data = [];
        for (let i = 0; i < top10TreeMap.length; i++) {
            let artworkType =
                top10TreeMap[i] &&
                (await prisma.artwork_types.findFirst({
                    where: {
                        id: top10TreeMap[i].id_artwork_type as number,
                    },
                }));
            // console.log(artworkType?.title);
            let objAux = { x: '', y: 0 };
            objAux.x = artworkType?.title as string;
            objAux.y = top10TreeMap[i]._count.id_artwork_type;
            data.push(objAux);
        }
        // const treeMapSeries = top10TreeMap.map((tipoArte: any) => {
        //     return tipoArte._count.id_artwork_type;
        // });
        // const treeMapSeries = top10TreeMap.map((tipoArte: any) => {
        //     let objetoAuxiliar = { x: '', y: '' };
        //     objetoAuxiliar.x = tipoArte.id_artwork_type;
        //     objetoAuxiliar.y = tipoArte._count.id_artwork_type;
        //     return objetoAuxiliar;
        // });

        // const dataAndLabelsTreeMapChart = {
        //     labels: treeMapLabels,
        //     series: treeMapSeries,
        // };

        const ObraMaisAntiga = await prisma.artworks.findFirst({
            orderBy: {
                date_start: 'asc',
            },
            where: {
                ...filtroBusca,
            },
        });
        const dataObraMaisAntiga = ObraMaisAntiga?.date_start;

        const agregadoAnoInicio = await prisma.artworks.aggregate({
            _avg: {
                date_start: true,
            },
            where: {
                ...filtroBusca,
            },
        });
        const mediaIdade = Math.ceil(2022 - agregadoAnoInicio._avg.date_start!);

        res.status(200).json({
            obras: obrasPaginadas,
            numeroDeObrasEncontradas: numeroDeObrasEncontradas,
            dadosPizza: dataAndLabelsPizzaChart,
            dadosTreeMap: {
                data: data,
            },
            mediaIdade: mediaIdade,
            dataObraMaisAntiga: dataObraMaisAntiga as number,
        });

        return;
    }
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
        obras: obrasPaginadas,
    });
    // return {
    //     props: {
    //         artistas: artistas,
    //     },
    // };
}
