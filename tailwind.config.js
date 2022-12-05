const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.html"],
  theme: {
    extend: {
      boxShadow: {
        'inner-all': 'inset 0 0 5px 2px rgb(0 0 0 / 0.05);',
      },
    },
    fontFamily: {
      'Kanit': ['Kanit']
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.5xl') },
        'h2': { fontSize: theme('fontSize.4xl') },
        'h3': { fontSize: theme('fontSize.3xl') },
        'h4': { fontSize: theme('fontSize.2xl') },
        'h5': { fontSize: theme('fontSize.xl') },
      })
    })
  ],
}
