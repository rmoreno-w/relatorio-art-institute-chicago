import { artists, artworks, artwork_types, departments, Prisma } from '@prisma/client';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { apiClient } from '../services/axios';
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
function Home() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [isMenuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }

    function handleBotaoAnterior() {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
            refetch();
            return;
        }
    }

    function handleBotaoProximo() {
        setPaginaAtual(paginaAtual + 1);
        refetch();
    }

    const { data, isFetching, refetch } = useQuery('dadosDoBD', async () => {
        const response = await apiClient.get('user', {
            params: {
                pagina: paginaAtual,
            },
        });

        const dadosDoBD = response.data;

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

                <Sidebar isMenuOpen={isMenuOpen} />

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
