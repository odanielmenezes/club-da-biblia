;(async () => {
  try {
    await import('./index.js')
  } catch (error) {
    console.error('Falha ao carregar API ESM:', error)
    process.exit(1)
  }
})()

module.exports = {}