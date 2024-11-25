/** @type {import('tailwindcss').Config} */
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
        poke_grass: "#9BCC50",
        poke_poison: "#B97FC9",
        poke_fire: "#F08030",
        poke_ice: "#51C4E7",
        poke_flying: "",
        poke_water: 'blue',
        poke_bug: 'yellow',
        poke_ground: 'yellow',
        poke_normal: 'yellow',
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