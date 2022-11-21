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

    function resetarFiltros() {
        setFiltroColunaId(true);
        setFiltroColunaNomeArtista(true);
        setFiltroColunaNomeObra(true);
        setFiltroColunaTipoObra(true);
        setFiltroColunaNomeDepartamento(true);
        setFiltroColunaAnoInicio(true);
        setFiltroColunaAnoFim(true);
        setFiltroColunaLugarOrigem(true);
        setFiltroColunaDimensoes(true);
        setFiltroColunaLink(true);
    }

    return (
        <div
            className='bg-projectWhite mx-4 rounded-md p-2 border border-gray-900'
            onClick={(evt) => (!grupoAtivo ? setGrupoAtivo(true) : null)}
        >
            <span className='inline-block mb-2 font-semibold text-gray-900'>Selecionar Colunas</span>
            {grupoAtivo && (
                <>
                    <button
                        className='float-right px-2 text-gray-900 rounded-md'
                        onClick={(evt) => setGrupoAtivo(false)}
                    >
                        X
                    </button>
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
                        <button
                            className='float-right px-2 py mt-2 rounded-md border-2 border-gray-600'
                            onClick={resetarFiltros}
                        >
                            Resetar Filtros de Colunas
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
