import { artists } from '@prisma/client';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { apiClient } from '../services/axios';
import Loader from '../src/components/Loader';
import Pagination from '../src/components/Pagination';
import Tabela from '../src/components/Tabela';

function Home() {
    const [paginaAtual, setPaginaAtual] = useState(1);

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

    const { data, isFetching, refetch } = useQuery<artists[]>('dadosDoBD', async () => {
        const response = await apiClient.get('user', {
            params: {
                pagina: paginaAtual,
            },
        });

        const dadosDoBD = response.data;

        return dadosDoBD.artistas;
    });

    return (
        <>
            <Head>
                <title>Relatório Art Institute Chicago</title>
            </Head>
            <main className='h-screen bg-gray-800 text-gray-100 flex flex-col'>
                <header className='flex items-center justify-center h-20 bg-gray-900 text-gray-100'>
                    Cabecalho maroto
                </header>

                <article className='flex flex-col items-center justify-center h-full bg-gray-800 text-gray-100 p-8'>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <>
                            <Tabela artistas={data} />
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
