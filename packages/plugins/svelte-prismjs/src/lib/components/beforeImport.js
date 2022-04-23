if (typeof window !== 'undefined') {
  console.log('window', window)
  // @ts-ignore
  window.Prism = window.Prism || {}
  window.Prism.manual = true
}
