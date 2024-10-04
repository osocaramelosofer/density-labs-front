/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
export default {
  content: [
    './src/**/*.{mjs,js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [nextui()]
}
