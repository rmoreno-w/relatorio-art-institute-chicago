import GrupoFiltrosAtributos from '../GrupoFiltrosAtributos';
import GrupoFiltrosColuna from '../GrupoFiltrosColuna';

interface sidebarProps {
    isMenuOpen: boolean;
}

export default function Sidebar({ isMenuOpen }: sidebarProps) {
    return (
        <aside
            className={`bg-projectWhite2 border-r border-gray-500 rounded-r-lg flex flex-col gap-4 z-10 py-20 ease-linear overflow-hidden w-96 h-screen fixed left-0 top-0 transition-transform overflow-y-auto scrollbar duration-[350ms] ${
                isMenuOpen ? '' : '-translate-x-96'
            }`}
        >
            <GrupoFiltrosColuna />
            <GrupoFiltrosAtributos />
        </aside>
    );
}
