import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import FiltroOrdem from '../FiltroOrdem';

interface grupoFiltrosAtributosProps {
    refetchFunction: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}

export const filtroDeOrdemAtom = atom('');

export default function GrupoFiltrosOrdem({ refetchFunction }: grupoFiltrosAtributosProps) {
    const [grupoAtivo, setGrupoAtivo] = useState(false);
    const [filtroOrdem, setFiltroOrdem] = useAtom(filtroDeOrdemAtom);

    function onFilterSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        setFiltroOrdem(event.currentTarget.value);
        setTimeout(() => {
            refetchFunction();
        }, 0);
    }
    return (
        <div
            className='bg-projectWhite mx-4 rounded-md p-2 border border-gray-900'
            onClick={(evt) => (!grupoAtivo ? setGrupoAtivo(true) : null)}
        >
            <span className='inline-block mb-2 font-semibold text-gray-900'>Ordenar Resultados Por</span>
            {grupoAtivo && (
                <>
                    <button
                        className='float-right px-2 text-gray-900 rounded-md'
                        onClick={(evt) => setGrupoAtivo(false)}
                    >
                        X
                    </button>
                    <FiltroOrdem idLabel='filtroOrdemNomeArtista' textoLabel='' stateFunction={onFilterSelect} />
                </>
            )}
        </div>
    );
}
