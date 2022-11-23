interface hamburguerIconProps {
    menuClick: () => void;
    isMenuOpen: boolean;
}
export default function HamburguerIcon({ menuClick, isMenuOpen }: hamburguerIconProps) {
    return (
        <button
            onClick={menuClick}
            className='fixed top-4 left-4 h-[72px] w-[72px] z-[12] py-2 px-4 bg-projectWhite rounded-md'
        >
            <span className='flex flex-col'>
                <span
                    className={`h-[5px] w-full transition duration-[400ms] rounded-[3px] bg-projectPurple inline-block ${
                        isMenuOpen ? 'translate-y-3 rotate-[135deg]' : ''
                    }`}
                />
                <span
                    className={`h-[5px] w-full transition duration-[400ms] rounded-[3px] bg-projectPurple inline-block mt-1.5 ${
                        isMenuOpen ? 'scale-0 translate-x-4' : ''
                    }`}
                />
                <span
                    className={`h-[5px] w-full transition duration-[400ms] rounded-[3px] bg-projectPurple inline-block mt-1.5 ${
                        isMenuOpen ? '-translate-y-2 rotate-[-135deg]' : ''
                    }`}
                />
            </span>
        </button>
    );
}
