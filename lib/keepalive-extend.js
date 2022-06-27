import {
  getFirstComponentChild,
  getComponentName,
  matches,
  getVnodeKey,
  remove,
  pruneMaxLimit,
  pruneCacheEntry,
  pruneCache,
  setPrevRouteName,
  isResetCacheKey,
  setTargetMap,
  getTargetMap,
  targetMapHasKey,
  deleteTargetMapKey
} from './utils'

const patternTypes = [String, RegExp, Array]

export default {
  name: 'keepalive-extend',
  abstract: true,

  props: {
    uniqueKey: {
      type: String,
      required: true
    },
    rules: Object,
    keepActive: Boolean,
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    const { uniqueKey } = this
    const state = {
      cache: Object.create(null),
      keys: []
    }

    if (!targetMapHasKey(uniqueKey)) {
      setTargetMap(uniqueKey, state)
    }
  },

  destroyed () {
    const { uniqueKey, keepActive } = this
    if (!keepActive) {
      const { cache, keys } = getTargetMap(uniqueKey)
      for (const key in cache) {
        pruneCacheEntry(cache, key, keys)
      }

      deleteTargetMapKey(uniqueKey)
    }
  },

  watch: {
    $route (_, from) {
      setPrevRouteName(from.name)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions

    if (componentOptions) {
      const name = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        (include && (!name || !matches(include, name))) ||
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { rules, uniqueKey } = this
      const { cache, keys } = getTargetMap(uniqueKey)
      const key = getVnodeKey(vnode, componentOptions)
      if (isResetCacheKey(rules, name)) {
        cache[key] = null
        remove(keys, key)
      }

      const cacheVnode = cache[key]
      if (cacheVnode) {
        vnode.componentInstance = cacheVnode.componentInstance
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        pruneMaxLimit(this)
      }

      vnode.data.keepAlive = true
    }

    return vnode || (slot && slot[0])
  }
}
