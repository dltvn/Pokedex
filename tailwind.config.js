/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        poke_red: '#DC0C2E',
        poke_blue: '#27ABFF',
        poke_gray: '#E6DFDD',
        gray25: "rgba(0, 0, 0, 0.25)",
        gray15: "rgba(0, 0, 0, 0.15)",
        poke_grass: colors.green[500],
        poke_poison: colors.purple[500],
        poke_fire: colors.red[500],
        poke_water: colors.blue[500],
        poke_electric: colors.yellow[500],
        poke_bug: colors.lime[500],
        poke_fairy: colors.pink[500],
        poke_normal: colors.gray[300],
        poke_fighting: colors.red[700],
        poke_flying: colors.indigo[500],
        poke_psychic: colors.pink[300],
        poke_rock: colors.yellow[700],
        poke_ghost: colors.indigo[700],
        poke_dragon: colors.indigo[900],
        poke_dark: colors.gray[700],
        poke_steel: colors.gray[500],
        poke_ice: colors.teal[400],
        poke_ground: colors.yellow[600],
      },
    },
  },
  safelist: [
    {
      pattern: /^bg-poke_/,
    },
  ],
  plugins: [],
}