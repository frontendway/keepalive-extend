
export const createElm = (tagName) => {
  return document.createElement(tagName)
}

export const querySelector = (selector, target) => {
  return (target || document).querySelector(selector)
}

export const fnCreatedCallsCount = (component) => {
  return component.created.mock.calls.length
}

export const fnDestroyedCallsCount = (component) => {
  return component.destroyed.mock.calls.length
}

export const getHomeTitleContent = (el) => {
  return querySelector('h3', el).textContent
}
