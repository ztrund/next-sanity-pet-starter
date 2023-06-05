/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'light-shades': 'hsl(75, 33%, 93%)',
                'light-accent': 'hsl(63, 21%, 62%)',
                'main-brand-color': 'hsl(39, 76%, 52%)',
                'dark-accent': 'hsl(27, 48%, 48%)',
                'dark-shades': 'hsl(5, 11%, 22%)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
