import App from './App.svelte'
import 'carbon-components-svelte/css/g90.css'

const element = document.getElementById('app')
if (!element) {
  throw new Error('Expected element to exist with ID `app`')
}

const app = new App({
  target: element,
})

export default app
