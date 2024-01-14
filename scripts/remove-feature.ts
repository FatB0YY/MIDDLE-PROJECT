import { Project, SyntaxKind, Node, JsxAttribute } from 'ts-morph'

const removedFeatureName = process.argv[2] // example IsArticleEnable

const featureState = process.argv[3] // example off/on

const toggleFuncName = 'toggleFeaturesFunc'
const toggleCompName = 'ToggleFeatures'

if (!removedFeatureName) {
  throw new Error('Укажите название фича-флага')
}

if (!featureState) {
  throw new Error('Укажите состояние фичи (on или off)')
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Некорректное значение состояния фичи (on или off) ')
}

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

function isToggleFunc(node: Node) {
  let isToggleFeatures = false

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === toggleFuncName
    ) {
      isToggleFeatures = true
    }
  })

  return isToggleFeatures
}

function isToggleComp(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)

  return identifier?.getText() === toggleCompName
}

const replaceToggleFunc = (node: Node) => {
  const objectOptions = node.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression
  )

  if (!objectOptions) {
    throw new Error('Нет objectOptions')
  }

  const featureNameProperty = objectOptions.getProperty('name')
  const onFunctionProperty = objectOptions.getProperty('on')
  const offFunctionProperty = objectOptions.getProperty('off')

  const onFunc = onFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction
  )
  const offFunc = offFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction
  )
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1)

  if (featureName !== removedFeatureName) return

  if (featureState === 'on') {
    node.replaceWithText(onFunc?.getBody().getText() ?? '')
  }

  if (featureState === 'off') {
    node.replaceWithText(offFunc?.getBody().getText() ?? '')
  }
}

const getAttributeNodeByName = (
  jsxAttributes: JsxAttribute[],
  name: string
) => {
  return jsxAttributes.find((node) => node.getNameNode().getText() === name)
}

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText()

  if (value?.startsWith('(')) {
    return value.slice(1, -1)
  }

  return value
}

const replaceComp = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

  const onAttribute = getAttributeNodeByName(attributes, 'on')

  console.log('onAttribute', onAttribute)

  const offAttribute = getAttributeNodeByName(attributes, 'off')

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature')

  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1)

  if (featureName !== removedFeatureName) {
    throw new Error(
      `featureName !== removedFeatureName: ${featureName} !== ${removedFeatureName}`
    )
  }

  const offValue = getReplacedComponent(offAttribute)
  const onValue = getReplacedComponent(onAttribute)

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue)
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue)
  }
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunc(node)) {
      replaceToggleFunc(node)
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComp(node)) {
      replaceComp(node)
    }
  })
})

project.save()
