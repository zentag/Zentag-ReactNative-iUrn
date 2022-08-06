module.exports = {
  content: ["./screens/*.tsx","./components/*.tsx"],
  theme: {
    extend: {
      colors:{
        "dark-primary": "#00066d",
        "dark-secondary": "#000000",
        "dark-tertiary": "#000ab5",
        "light-primary": "#949aff",
        "light-secondary": "#444eff",
        "light-tertiary": "#ffffff"
      },},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
