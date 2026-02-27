/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            letterSpacing: {
                'widest-plus': '0.5em',
            },
        },
    },
    plugins: [],
}
