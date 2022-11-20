import { artists } from '@prisma/client';

interface TabelaProps {
    artistas: artists[] | undefined;
}

export default function Tabela({ artistas }: TabelaProps) {
    return (
        <table className='font-bold text-sm border-collapse'>
            <thead>
                <tr className='border-y-2 border-gray-400'>
                    <th className='text-center px-4 py-2'>Nome</th>
                    <th className='text-center px-4 py-2'>É Artista?</th>
                    <th className='text-center px-4 py-2'>Ano Nascimento</th>
                    <th className='text-center px-4 py-2'>Ano Morte</th>
                </tr>
            </thead>
            <tbody>
                {artistas?.map((artista) => {
                    return (
                        <tr key={artista.id} className='text-center border-b border-gray-700'>
                            <td className='p-2'>{artista.title}</td>
                            <td className='p-2'>{artista.is_artist ? 'Sim' : 'Não'}</td>
                            <td className='p-2'>
                                {artista.is_artist && artista.birth_date ? artista.birth_date : '-'}
                            </td>
                            <td className='p-2'>
                                {artista.is_artist && artista.death_date ? artista.death_date : '-'}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
