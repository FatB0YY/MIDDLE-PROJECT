const path = require('path')

// выходим на верхний уровень проекта, до корня

module.exports = (...segments) =>
  path.resolve(__dirname, '..', '..', ...segments)
