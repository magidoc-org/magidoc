import adapter from '@sveltejs/adapter-auto'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit({ preprocess: vitePreprocess(), adapter: adapter() })],
}

export default config
