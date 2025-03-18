/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
      './components/**/*.{js,jsx,ts,tsx,md,mdx}',
      './styles/**/*.{js,jsx,ts,tsx,md,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './theme.config.tsx',
   
      // Or if using `src` directory:
      './src/**/*.{js,jsx,ts,tsx,md,mdx}'
    ],
    theme: {
      extend: {
      }
    },
    plugins: [
      require('daisyui'),
    ],
}