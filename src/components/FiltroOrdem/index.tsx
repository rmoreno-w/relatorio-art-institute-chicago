import React from 'react';

interface filtroOrdemProps {
    idLabel: string;
    textoLabel: string;
    stateFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FiltroOrdem({ idLabel, textoLabel, stateFunction }: filtroOrdemProps) {
    // function valueHandler(e: React.ChangeEvent<HTMLInputElement>) {
    //     stateFunction(e.currentTarget.value);
    // }

    return (
        <>
            <label className='block' htmlFor={idLabel}>
                {textoLabel}
            </label>
            <select name={idLabel} className='w-full border-none' onChange={(evt) => stateFunction(evt)}>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value=''></option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='nomeArtista'>
                    Nome Artista
                </option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='nomeObra'>
                    Nome Obra
                </option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='tipoObra'>
                    Tipo Obra
                </option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='nomeDepartamento'>
                    Nome Departamento
                </option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='anoInicio'>
                    Ano Inicio
                </option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='anoFim'>
                    Ano Fim
                </option>
                <option className='leading-8 px-2 border border-gray-600 rounded-md mb-2' value='lugarOrigem'>
                    Lugar de Origem
                </option>
            </select>
        </>
    );
}
