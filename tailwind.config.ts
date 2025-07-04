import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /col-span-./,
    },
    {
      pattern: /^col-start-(1[0-2]|[1-9])$/,
    },
  ],
  theme: {
    fontFamily: {
      'display': ['Gradient Bold', 'Helvetica', 'san-serif'],
      // 'sans': ['Graphik', 'Helvetica', 'san-serif'],
      'sans': ['neue-haas-unica', 'Helvetica', 'san-serif'],
    },
    letterSpacing: {
      // normal: '-0.08rem',
      normal: '-0.06rem',
    },
    extend: {
      colors: {
        'primary': '#222222',
        'secondary': '#9a9a9a',
        'highlight': '#0000ff',
      },
    }
  },
  plugins: [],
}
export default config
