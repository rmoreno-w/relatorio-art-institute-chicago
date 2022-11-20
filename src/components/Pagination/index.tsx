interface PaginationProps {
    paginaAtual: number;
    itemAnterior: () => void;
    proximoItem: () => void;
}

export default function Pagination({ paginaAtual, itemAnterior, proximoItem }: PaginationProps) {
    return (
        <div className='flex justify-between w-60 text-white font-bold rounded mt-6 items-center'>
            {paginaAtual == 1 ? (
                <button className='text-white pointer-events-none font-bold py-2 px-4 rounded flex items-center gap-4 border-2 border-white-500'>
                    Anterior
                </button>
            ) : (
                <button
                    className='hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center gap-4 border-2 border-white-500'
                    onClick={itemAnterior}
                >
                    Anterior
                </button>
            )}

            <p>{paginaAtual}</p>

            <button
                className='hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center gap-4 border-2 border-white-500'
                onClick={proximoItem}
            >
                Próximo
            </button>
        </div>
    );
}
