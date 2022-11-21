// import { SetStateAction } from 'react';

interface filtroAtributoProps {
    idLabel: string;
    textoLabel: string;
    // fieldValue: string | number
    // toggleFunction: (update: SetStateAction<boolean>) => void;
}
export default function FiltroAtributo({ idLabel, textoLabel }: filtroAtributoProps) {
    return (
        <div className=''>
            <label className='inline-block' htmlFor={idLabel}>
                {textoLabel}
            </label>
            <input
                type='text'
                // onChange={() => toggleFunction(!checkedValue)}
                // id={idLabel
                className='leading-8 px-2 border border-gray-600 rounded-md'
            />
        </div>
    );
}
