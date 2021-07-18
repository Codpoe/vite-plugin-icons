import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import { Options, ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './loader'

function detectCompiler(config: ResolvedConfig): NonNullable<Options['compiler']> {
  if (config.plugins.some(i => i.name === 'react-refresh'))
    return 'react'

  if (config.plugins.some(i => i.name === 'vite-plugin-vue2'))
    return 'vue2'

  return 'vue3'
}

function VitePluginIcons(userOptions: Options = {}): Plugin {
  let options: ResolvedOptions
  let server: ViteDevServer

  return {
    name: 'vite-plugin-icons',
    enforce: 'post',
    configResolved(config) {
      options = Object.assign({
        scale: 1.2,
        defaultStyle: '',
        defaultClass: '',
        compiler: detectCompiler(config),
      }, userOptions)
    },
    configureServer(_server) {
      server = _server
    },
    resolveId(id) {
      if (isIconPath(id)) {
        // need to a relative path in for vite to resolve node_modules in build
        return normalizeIconPath(id).replace(/\.vue$/i, '').replace(/^\//, '')
      }
      return null
    },
    async load(id) {
      if (isIconPath(id))
        return await generateComponentFromPath(id, options) || null

      return null
    },
    async transform(code, id) {
      if (isIconPath(id) && options.compiler === 'react')
        return await server.transformWithEsbuild(code, `${id}.jsx`)
    },
  }
}

export { VitePluginIcons as Plugin }
export * from './resolver'

export default VitePluginIcons
