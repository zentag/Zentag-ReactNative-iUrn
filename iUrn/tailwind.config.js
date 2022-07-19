module.exports = {
  content: ["./screens/*.tsx","./components/*.tsx"],
  theme: {
    extend: {
      colors: {
        "light-primary": "#949aff",
        // "light-secondary": "#444eff",
        "light-secondary": "#5157D1",
        "light-text": "#000000"
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
