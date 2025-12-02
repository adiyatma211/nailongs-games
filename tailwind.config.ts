import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'haris-pijam': ['"Haris Pijam"', '"system-ui"', '"sans-serif"'],
        'fredoka': ['"Fredoka"', '"system-ui"', '"sans-serif"'],
        'nailong': ['"Fredoka"', '"Haris Pijam"', '"system-ui"', '"sans-serif"'],
      }
    },
  },
}

export default config