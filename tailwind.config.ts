import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'display': ['Gradient Premium', 'Helvetica', 'san-serif'],
      'sans': ['Graphik', 'Helvetica', 'san-serif'],
    },
    fontSize: {
    },
    letterSpacing: {
      normal: '-0.08em',
    },
    extend: {
      colors: {
        'secondary': '#9a9a9a',
      },
    }
  },
  plugins: [],
}
export default config
