const createTemplate = require('./templates/createTemplate')

// argv[2] путь до ноды
// argv[3] путь до скрипта

const layer = process.argv[2]
const sliceName = process.argv[3]

const layers = ['features', 'essence', 'pages']

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`)
}

if (!sliceName) {
  throw new Error('Укажите название слайса')
}

createTemplate(layer, sliceName)
