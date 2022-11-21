import { artists, artworks, artwork_types, departments, Prisma } from '@prisma/client';
import { useAtom } from 'jotai';
import {
    showAnoFimAtom,
    showAnoInicioAtom,
    showDimensoesAtom,
    showIdAtom,
    showLinkAtom,
    showLugarOrigemAtom,
    showNomeArtistaAtom,
    showNomeDepartamentoAtom,
    showNomeObraAtom,
    showTipoObraAtom,
} from '../GrupoFiltrosColuna';

interface TabelaProps {
    obras:
        | (artworks & {
              artists: artists | null;
              artwork_types: artwork_types | null;
              departments: departments | null;
              _count: Prisma.ArtworksCountOutputType;
          })[]
        | undefined;
}

export default function Tabela({ obras }: TabelaProps) {
    const [showId] = useAtom(showIdAtom);
    const [showNomeArtista] = useAtom(showNomeArtistaAtom);
    const [showNomeObra] = useAtom(showNomeObraAtom);
    const [showTipoObra] = useAtom(showTipoObraAtom);
    const [showDepartamento] = useAtom(showNomeDepartamentoAtom);
    const [showAnoInicio] = useAtom(showAnoInicioAtom);
    const [showAnoFim] = useAtom(showAnoFimAtom);
    const [showLugarOrigem] = useAtom(showLugarOrigemAtom);
    const [showDimensoes] = useAtom(showDimensoesAtom);
    const [showLink] = useAtom(showLinkAtom);

    return (
        <table className='font-bold text-sm border-collapse w-full table-fixed'>
            <thead>
                <tr className='border-y-2 border-gray-800'>
                    {showId && <th className='text-center px-4 py-2'>Id</th>}
                    {showNomeArtista && <th className='text-center px-4 py-2'>Nome do Artista</th>}
                    {showNomeObra && <th className='text-center px-4 py-2'>Nome da Obra</th>}
                    {showTipoObra && <th className='text-center px-4 py-2'>Tipo da Obra</th>}
                    {showDepartamento && <th className='text-center px-4 py-2'>Nome do Departamento</th>}
                    {showAnoInicio && <th className='text-center px-4 py-2'>Ano de Início da Obra</th>}
                    {showAnoFim && <th className='text-center px-4 py-2'>Ano de Fim da Obra</th>}
                    {showLugarOrigem && <th className='text-center px-4 py-2'>Lugar de Origem da Obra</th>}
                    {showDimensoes && <th className='text-center px-4 py-2'>Dimensões</th>}
                    {showLink && <th className='text-center px-4 py-2'>Link extra</th>}
                </tr>
            </thead>
            <tbody className='overflow-y-scroll'>
                {obras?.map((obra) => {
                    return (
                        <tr key={obra.id} className='text-center border-b border-gray-400 '>
                            {showId && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>{obra.id}</td>
                            )}
                            {showNomeArtista && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.artists?.title}
                                </td>
                            )}
                            {showNomeObra && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.title}
                                </td>
                            )}
                            {showTipoObra && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.artwork_types?.title}
                                </td>
                            )}
                            {showDepartamento && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.departments?.title}
                                </td>
                            )}
                            {showAnoInicio && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.date_start}
                                </td>
                            )}
                            {showAnoFim && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.date_end}
                                </td>
                            )}
                            {showLugarOrigem && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.place_of_origin}
                                </td>
                            )}
                            {showDimensoes && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    {obra.dimensions}
                                </td>
                            )}
                            {showLink && (
                                <td className='text-center font-[355] px-4 py-2 truncate hover:text-clip'>
                                    <a href={obra.api_link as string} className='hover:underline'>
                                        Link externo
                                    </a>
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
