import { artists, artworks, artwork_types, departments, Prisma } from '@prisma/client';
import { atom, useAtom } from 'jotai';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { apiClient } from '../services/axios';
import {
    anoFimAtom,
    anoInicioAtom,
    idAtom,
    lugarDeOrigemAtom,
    nomeDaObraAtom,
    nomeDepartamentoAtom,
    nomeDoArtistaAtom,
    tipoDaObraAtom,
} from '../src/components/GrupoFiltrosAtributos';
import { filtroDeOrdemAtom } from '../src/components/GrupoFiltrosOrdem';
import HamburguerIcon from '../src/components/HamburguerIcon';
import Loader from '../src/components/Loader';
import Pagination from '../src/components/Pagination';
import Sidebar from '../src/components/Sidebar';
import Tabela from '../src/components/Tabela';

interface composedArtwork {
    obras:
        | (artworks & {
              artists: artists | null;
              artwork_types: artwork_types | null;
              departments: departments | null;
              _count: Prisma.ArtworksCountOutputType;
          })[]
        | undefined;
}

export const pageAtom = atom(1);
export const numberOfResultsAtom = atom(0);

function Home() {
    const [paginaAtual, setPaginaAtual] = useAtom(pageAtom);

    const [numberOfResults, setNumberOfResults] = useAtom(numberOfResultsAtom);

    const [id] = useAtom(idAtom);
    const [nomeDaObra] = useAtom(nomeDaObraAtom);
    const [nomeDoArtista] = useAtom(nomeDoArtistaAtom);
    const [tipoDaObra] = useAtom(tipoDaObraAtom);
    const [nomeDepartamento] = useAtom(nomeDepartamentoAtom);
    const [anoInicio] = useAtom(anoInicioAtom);
    const [anoFim] = useAtom(anoFimAtom);
    const [lugarDeOrigem] = useAtom(lugarDeOrigemAtom);

    const [filtroDeOrdem] = useAtom(filtroDeOrdemAtom);

    const [isMenuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }

    function handleBotaoAnterior() {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
            setTimeout(() => {
                refetch();
            }, 0);
            return;
        }
    }

    function handleBotaoProximo() {
        setPaginaAtual(paginaAtual + 1);
        setTimeout(() => {
            refetch();
        }, 0);
    }

    const { data, isFetching, refetch } = useQuery('dadosDoBD', async () => {
        const response = await apiClient.get('user', {
            params: {
                pagina: paginaAtual,
                id: id,
                nomeDaObra: nomeDaObra,
                nomeDoArtista: nomeDoArtista,
                tipoDaObra: tipoDaObra,
                nomeDepartamento: nomeDepartamento,
                anoInicio: anoInicio,
                anoFim: anoFim,
                lugarDeOrigem: lugarDeOrigem,
                filtroDeOrdem: filtroDeOrdem,
            },
        });

        const dadosDoBD = response.data;
        dadosDoBD && setNumberOfResults(dadosDoBD.obras.length);

        return dadosDoBD.obras;
    });

    return (
        <>
            <Head>
                <title>Relatório Art Institute Chicago</title>
            </Head>
            <main className='min-h-screen bg- text-gray-800 flex flex-col font-montserrat'>
                <HamburguerIcon isMenuOpen={isMenuOpen} menuClick={toggleMenu} />
                <header className='flex items-center justify-center h-20 bg-projectWhite text-gray-900 sticky top-0 shadow-md rounded-b-[20px]'>
                    <span className='font-liu text-4xl'>Art Institute of Chicago</span>
                </header>

                <Sidebar refetchFunction={refetch} isMenuOpen={isMenuOpen} />

                <article className='flex flex-col items-center justify-center h-full bg-projectWhite/80 backdrop-blur-3xl text-gray-800 p-8 m-4 mt-8 rounded-[20px] shadow-md'>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <>
                            <Tabela obras={data} />
                            <Pagination
                                paginaAtual={paginaAtual}
                                itemAnterior={handleBotaoAnterior}
                                proximoItem={handleBotaoProximo}
                            />
                        </>
                    )}
                </article>
            </main>
        </>
    );
}

export default Home;
