/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                liu: ['"Liu Jian Mao Cao"', 'cursive'],
                montserrat: ['"Montserrat"', 'sans-serif'],
            },
            colors: {
                projectWhite: '#f8f8f8',
                projectWhite2: '#ededee',
                projectPurple: '#7D5BA6',
                projectRed: '#ff3d4a',
            },
        },
    },
    plugins: [],
};
