/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans JP', 'sans-serif'],
            },
            colors: {
                blue: {
                    50: '#E8F1FF',
                    100: '#D9EAFE',
                    500: '#0B63F6',
                    600: '#0B63F6',
                    700: '#0B63F6',
                },
            },
        },
    },
    plugins: [],
}
