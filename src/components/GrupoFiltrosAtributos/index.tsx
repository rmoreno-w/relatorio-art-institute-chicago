import { useState } from 'react';
import FiltroAtributo from '../FiltroAtributo';

export default function GrupoFiltrosAtributos() {
    const [grupoAtivo, setGrupoAtivo] = useState(false);

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
                    <FiltroAtributo idLabel='valorNomeObra' textoLabel='Nome da Obra' />
                    <button
                        className='float-right px-2 py mt-2 rounded-md border-2 border-gray-600'
                        onClick={() => (1 == 1 ? true : false)}
                    >
                        Resetar Filtros
                    </button>
                </>
            )}
        </div>
    );
}
