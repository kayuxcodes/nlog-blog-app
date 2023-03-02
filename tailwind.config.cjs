/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: "var(--header-font)",
        primary: "var(--primary-font)",
      },
      colors: {
        primary: "var(--primary-color)",
        pry: "var(--primary-color)",
        main: "var(--main-color)",
        light: "var(--light-color)",
        dng: "var(--bg-danger)",
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
        dng: "var(--bg-danger)",
        main: "var(--primary-color)",
      },
      writingMode: {
        vrLr: "w",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
