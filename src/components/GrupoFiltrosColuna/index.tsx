import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import FiltroColuna from '../FiltroColuna';

export const showIdAtom = atom(true);
export const showNomeArtistaAtom = atom(true);
export const showNomeObraAtom = atom(true);
export const showTipoObraAtom = atom(true);
export const showNomeDepartamentoAtom = atom(true);
export const showAnoInicioAtom = atom(true);
export const showAnoFimAtom = atom(true);
export const showLugarOrigemAtom = atom(true);
export const showDimensoesAtom = atom(true);
export const showLinkAtom = atom(true);

export default function GrupoFiltrosColuna() {
    const [grupoAtivo, setGrupoAtivo] = useState(false);
    const [filtroColunaId, setFiltroColunaId] = useAtom(showIdAtom);
    const [filtroColunaNomeArtista, setFiltroColunaNomeArtista] = useAtom(showNomeArtistaAtom);
    const [filtroColunaNomeObra, setFiltroColunaNomeObra] = useAtom(showNomeObraAtom);
    const [filtroColunaTipoObra, setFiltroColunaTipoObra] = useAtom(showTipoObraAtom);
    const [filtroColunaNomeDepartamento, setFiltroColunaNomeDepartamento] = useAtom(showNomeDepartamentoAtom);
    const [filtroColunaAnoInicio, setFiltroColunaAnoInicio] = useAtom(showAnoInicioAtom);
    const [filtroColunaAnoFim, setFiltroColunaAnoFim] = useAtom(showAnoFimAtom);
    const [filtroColunaLugarOrigem, setFiltroColunaLugarOrigem] = useAtom(showLugarOrigemAtom);
    const [filtroColunaDimensoes, setFiltroColunaDimensoes] = useAtom(showDimensoesAtom);
    const [filtroColunaLink, setFiltroColunaLink] = useAtom(showLinkAtom);

    return (
        <div className='bg-gray-700 mx-4 rounded-md p-2' onClick={(evt) => (!grupoAtivo ? setGrupoAtivo(true) : null)}>
            <span className='inline-block mb-2'>Mostrar Coluna</span>
            <button className='float-right px-2 bg-red-400 rounded-sm' onClick={(evt) => setGrupoAtivo(false)}>
                X
            </button>
            {grupoAtivo && (
                <div className='ml-4'>
                    <FiltroColuna
                        idLabel='filtroId'
                        checkedValue={filtroColunaId}
                        toggleFunction={setFiltroColunaId}
                        textoLabel='Id'
                    />

                    <FiltroColuna
                        idLabel='nomeArtista'
                        checkedValue={filtroColunaNomeArtista}
                        toggleFunction={setFiltroColunaNomeArtista}
                        textoLabel='Nome do Artista'
                    />

                    <FiltroColuna
                        idLabel='nomeObra'
                        checkedValue={filtroColunaNomeObra}
                        toggleFunction={setFiltroColunaNomeObra}
                        textoLabel='Nome da Obra'
                    />

                    <FiltroColuna
                        idLabel='tipoObra'
                        checkedValue={filtroColunaTipoObra}
                        toggleFunction={setFiltroColunaTipoObra}
                        textoLabel='Tipo da Obra'
                    />

                    <FiltroColuna
                        idLabel='nomeDepartamento'
                        checkedValue={filtroColunaNomeDepartamento}
                        toggleFunction={setFiltroColunaNomeDepartamento}
                        textoLabel='Nome do Departamento'
                    />

                    <FiltroColuna
                        idLabel='anoInicio'
                        checkedValue={filtroColunaAnoInicio}
                        toggleFunction={setFiltroColunaAnoInicio}
                        textoLabel='Ano de Início'
                    />

                    <FiltroColuna
                        idLabel='anoFim'
                        checkedValue={filtroColunaAnoFim}
                        toggleFunction={setFiltroColunaAnoFim}
                        textoLabel='Ano de Fim'
                    />

                    <FiltroColuna
                        idLabel='lugarOrigem'
                        checkedValue={filtroColunaLugarOrigem}
                        toggleFunction={setFiltroColunaLugarOrigem}
                        textoLabel='Lugar de Origem'
                    />

                    <FiltroColuna
                        idLabel='dimensoes'
                        checkedValue={filtroColunaDimensoes}
                        toggleFunction={setFiltroColunaDimensoes}
                        textoLabel='Dimensões'
                    />

                    <FiltroColuna
                        idLabel='link'
                        checkedValue={filtroColunaLink}
                        toggleFunction={setFiltroColunaLink}
                        textoLabel='Link Extra'
                    />
                </div>
            )}
        </div>
    );
}
