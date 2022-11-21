import React, { Dispatch, SetStateAction } from 'react';

interface filtroAtributoProps {
    idLabel: string;
    textoLabel: string;
    fieldValue: string | number | undefined;
    type?: string;
    stateFunction: Dispatch<SetStateAction<any>>;
    blurFunction: () => void;
}

export default function FiltroAtributo({
    idLabel,
    textoLabel,
    fieldValue,
    type = 'text',
    stateFunction,
    blurFunction,
}: filtroAtributoProps) {
    function valueHandler(e: React.ChangeEvent<HTMLInputElement>) {
        stateFunction(e.currentTarget.value);
    }

    return (
        <div className=''>
            <label className='block' htmlFor={idLabel}>
                {textoLabel}
            </label>
            <input
                type={type}
                onChange={(evt) => valueHandler(evt)}
                id={idLabel}
                className='leading-8 px-2 border border-gray-600 rounded-md mb-2'
                value={fieldValue}
                onBlur={blurFunction}
            />
        </div>
    );
}
