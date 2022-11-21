import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import FiltroAtributo from '../FiltroAtributo';

export const idAtom = atom(0);
export const nomeDaObraAtom = atom('');
export const nomeDoArtistaAtom = atom('');
export const tipoDaObraAtom = atom('');
export const nomeDepartamentoAtom = atom('');
export const anoInicioAtom = atom(0);
export const anoFimAtom = atom(0);
export const lugarDeOrigemAtom = atom('');

interface grupoFiltrosAtributosProps {
    refetchFunction: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}
export default function GrupoFiltrosAtributos({ refetchFunction }: grupoFiltrosAtributosProps) {
    const [grupoAtivo, setGrupoAtivo] = useState(false);

    const [id, setId] = useAtom(idAtom);
    const [nomeDaObra, setNomeDaObra] = useAtom(nomeDaObraAtom);
    const [nomeDoArtista, setNomeDoArtista] = useAtom(nomeDoArtistaAtom);
    const [tipoDaObra, setTipoDaObra] = useAtom(tipoDaObraAtom);
    const [nomeDepartamento, setNomeDepartamento] = useAtom(nomeDepartamentoAtom);
    const [anoInicio, setAnoInicio] = useAtom(anoInicioAtom);
    const [anoFim, setAnoFim] = useAtom(anoFimAtom);
    const [lugarDeOrigem, setLugarDeOrigem] = useAtom(lugarDeOrigemAtom);

    function refetchApi() {
        refetchFunction();
    }

    function resetarFiltros() {
        setId(parseInt(''));
        setNomeDaObra('');
        setNomeDoArtista('');
        setTipoDaObra('');
        setNomeDepartamento('');
        setAnoInicio(parseInt(''));
        setAnoFim(parseInt(''));
        setLugarDeOrigem('');
        //Quando termina de limpar os filtros, troca o estado e dispara o effect
        setTimeout(() => refetchFunction(), 0);
    }

    return (
        <div
            className='bg-projectWhite mx-4 rounded-md p-2 border border-gray-900'
            onClick={(evt) => (!grupoAtivo ? setGrupoAtivo(true) : null)}
        >
            <span className='inline-block mb-2 font-semibold text-gray-900'>Filtrar Resultados</span>
            {grupoAtivo && (
                <>
                    <button
                        className='float-right px-2 text-gray-900 rounded-md'
                        onClick={(evt) => setGrupoAtivo(false)}
                    >
                        X
                    </button>
                    <FiltroAtributo
                        idLabel='id'
                        textoLabel='Id'
                        type='number'
                        fieldValue={id}
                        stateFunction={setId}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorNomeArtista'
                        textoLabel='Nome do Artista'
                        fieldValue={nomeDoArtista}
                        stateFunction={setNomeDoArtista}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorNomeObra'
                        textoLabel='Nome da Obra'
                        fieldValue={nomeDaObra}
                        stateFunction={setNomeDaObra}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorTipoObra'
                        textoLabel='Tipo da Obra'
                        fieldValue={tipoDaObra}
                        stateFunction={setTipoDaObra}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorNomeDepartamento'
                        textoLabel='Nome do Departamento'
                        fieldValue={nomeDepartamento}
                        stateFunction={setNomeDepartamento}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorAnoInicio'
                        textoLabel='Ano de Inicio'
                        type='number'
                        fieldValue={anoInicio}
                        stateFunction={setAnoInicio}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorAnoFim'
                        textoLabel='Ano de Fim'
                        type='number'
                        fieldValue={anoFim}
                        stateFunction={setAnoFim}
                        blurFunction={refetchApi}
                    />
                    <FiltroAtributo
                        idLabel='valorLugarDeOrigem'
                        textoLabel='Lugar de Origem'
                        fieldValue={lugarDeOrigem}
                        stateFunction={setLugarDeOrigem}
                        blurFunction={refetchApi}
                    />
                    <button
                        className='float-right px-2 py mt-2 rounded-md border-2 border-gray-600'
                        onClick={resetarFiltros}
                    >
                        Resetar Filtros
                    </button>
                </>
            )}
        </div>
    );
}
