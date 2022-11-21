import { SetStateAction } from 'react';

interface filtroColunaProps {
    idLabel: string;
    textoLabel: string;
    checkedValue: boolean;
    toggleFunction: (update: SetStateAction<boolean>) => void;
}

export default function FiltroColuna({ idLabel, textoLabel, checkedValue, toggleFunction }: filtroColunaProps) {
    return (
        <div className='ml-4'>
            <input type='checkbox' checked={checkedValue} onChange={() => toggleFunction(!checkedValue)} id={idLabel} />
            <label className='inline-block ml-2' htmlFor={idLabel}>
                {textoLabel}
            </label>
        </div>
    );
}
