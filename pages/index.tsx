import { atom, useAtom } from 'jotai';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { apiClient } from '../services/axios';
import Dashboard from '../src/components/Dashboard';
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

export const pageAtom = atom(1);
export const displayAtom = atom('dashboard');
export const numberOfResultsAtom = atom(0);

function Home() {
    const [paginaAtual, setPaginaAtual] = useAtom(pageAtom);
    const [displayAtual, setDisplayAtual] = useAtom(displayAtom);

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
                <header className='grid grid-cols-3 h-20 bg-projectWhite text-gray-900 sticky top-0 shadow-md rounded-b-[20px]'>
                    <div className='order-1'></div>
                    <span className='flex items-center justify-center order-2 font-liu text-4xl'>
                        Art Institute of Chicago
                    </span>
                    <div className='order-3 flex justify-end items-center mr-4'>
                        <button
                            className={`text-gray-800 font-bold py-2 px-4 flex items-center gap-4 border-b-2 border-transparent hover:border-b-projectPurple ${
                                displayAtual == 'tabela' ? 'border-b-projectPurple' : null
                            }`}
                            onClick={() => setDisplayAtual('tabela')}
                        >
                            Tabela
                        </button>
                        <button
                            className={`text-gray-800 font-bold py-2 px-4 flex items-center gap-4 border-b-2 border-transparent hover:border-b-projectPurple ${
                                displayAtual == 'dashboard' ? 'border-b-projectPurple' : null
                            }`}
                            onClick={() => setDisplayAtual('dashboard')}
                        >
                            Dashboard
                        </button>
                    </div>
                </header>

                <Sidebar refetchFunction={refetch} isMenuOpen={isMenuOpen} />

                <article className='flex flex-col items-center justify-center h-full bg-projectWhite/80 backdrop-blur-3xl text-gray-800 p-8 m-4 mt-8 rounded-[20px] shadow-md'>
                    {isFetching ? (
                        <Loader />
                    ) : displayAtual == 'tabela' ? (
                        <>
                            <Tabela obras={data} />
                            <Pagination
                                paginaAtual={paginaAtual}
                                itemAnterior={handleBotaoAnterior}
                                proximoItem={handleBotaoProximo}
                            />
                        </>
                    ) : (
                        <Dashboard />
                    )}
                </article>
            </main>
        </>
    );
}

export default Home;
