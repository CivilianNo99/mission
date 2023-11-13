import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "node:path"


// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  resolve: {
  alias: [{
    find: /^npm:@js-temporal\/polyfill$/,
      replacement: resolve(__dirname, "./node_modules/@js-temporal/polyfill"),
    }, {
      find: "/db",
      replacement: resolve(__dirname, "./db"),
    }, {
      find: "/utility",
      replacement: resolve(__dirname, "./utility")
    }]
  },

  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import { svelte } from '@sveltejs/vite-plugin-svelte'

// // https://vitejs.dev/config/
// export default defineConfig({
//   root: "./",
//   plugins: [svelte({
    
//   })],
//   resolve: {
//     alias: [{
//       find: /^npm:@js-temporal\/polyfill$/,
//       replacement: resolve(__dirname, "./node_modules/@js-temporal/polyfill"),
//     }, {
//       find: "/db",
//       replacement: resolve(__dirname, "./db"),
//     }, {
//       find: "/utility",
//       replacement: resolve(__dirname, "./utility")
//     }]
//   }
// })
