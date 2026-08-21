/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#522AB0',
          dk: '#41208C',
          lt: '#EFE9FB',
        },
        yellow: {
          DEFAULT: '#FEDC00',
          dk: '#E3C500',
        },
        ink: '#1c1f23',
        body: '#4a5158',
        muted: '#79818a',
        line: '#e3e6ea',
        bg: '#f6f7f9',
        green: '#0f9d58',
        amber: '#f0a500',
      },
    },
  },
  plugins: [],
};
