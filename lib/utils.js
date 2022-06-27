const isDef = v => v !== null && v !== undefined

const isAsyncPlaceholder = vnode => vnode.isComment && vnode.asyncFactory

const targetMap = new Map()

export const setTargetMap = (key, value) => {
  targetMap.set(key, value)
}

export const getTargetMap = key => targetMap.get(key)

export const targetMapHasKey = key => targetMap.has(key)

export const deleteTargetMapKey = key => targetMap.delete(key)

const _toString = Object.prototype.toString
const isRegExp = (value) => {
  return _toString.call(value) === '[object RegExp]'
}

export const getFirstComponentChild = (children) => {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

export const getComponentName = (opts) => {
  return opts && (opts.Ctor.options.name || opts.tag)
}

export const matches = (pattern, name) => {
  if (Array.isArray(pattern)) {
    return pattern.some(p => matches(p, name))
  } else if (typeof pattern === 'string') {
    return pattern.split(',').includes(name)
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }

  return false
}

export const getVnodeKey = (vnode, componentOptions) => {
  return vnode.key == null
    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
    : vnode.key
}

export const remove = (arr, value) => {
  if (arr.length) {
    const index = arr.indexOf(value)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export const pruneCache = (keepAliveInstance, filter) => {
  const { _vnode, uniqueKey } = keepAliveInstance
  const { cache, keys } = getTargetMap(uniqueKey)
  for (const key in cache) {
    const cacheVnode = cache[key]
    if (cacheVnode) {
      const name = getComponentName(cacheVnode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

export const pruneCacheEntry = (cache, key, keys, current) => {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

export const pruneMaxLimit = (target) => {
  const { max, _vnode, uniqueKey } = target
  const { cache, keys } = getTargetMap(uniqueKey)
  if (max && keys.length > +max) {
    pruneCacheEntry(cache, keys[0], keys, _vnode)
  }
}

let prevRouteName = null

export const setPrevRouteName = name => {
  prevRouteName = name
}

export const isResetCacheKey = (rules, currentRouteName) => {
  let rule = null
  if (!rules || !currentRouteName || !prevRouteName) return false
  if (!(rule = rules[currentRouteName])) return false

  const { refresh, notRefresh } = rule
  if (
    (refresh && matches(refresh, prevRouteName)) ||
    (notRefresh && !matches(notRefresh, prevRouteName))
  ) {
    return true
  }

  return false
}
