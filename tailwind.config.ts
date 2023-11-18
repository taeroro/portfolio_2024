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
      normal: '-0.08rem',
    },
    extend: {
      colors: {
        'primary': '#343434',
        'secondary': '#9a9a9a',
        'highlight': '#0000ff',
      },
    }
  },
  plugins: [],
}
export default config
