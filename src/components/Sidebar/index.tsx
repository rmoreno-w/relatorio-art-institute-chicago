import GrupoFiltrosColuna from '../GrupoFiltrosColuna';

interface sidebarProps {
    isMenuOpen: boolean;
}

export default function Sidebar({ isMenuOpen }: sidebarProps) {
    return (
        <aside
            className={`bg-red-700 flex flex-col gap-4 z-10 py-20 ease-linear overflow-hidden w-96 h-screen absolute left-0 top-0 transition-transform duration-[450ms] ${
                isMenuOpen ? '' : '-translate-x-96'
            }`}
        >
            <GrupoFiltrosColuna />
        </aside>
    );
}
