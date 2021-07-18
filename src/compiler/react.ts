// import svgr from '@svgr/core'

function capitalize(strList: string[]) {
  return strList
    .flatMap(item => item.split('-'))
    .map(item => item[0].toUpperCase() + item.slice(1).toLowerCase())
    .join('')
}

export async function ReactCompiler(svg: string, name: string, icon: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const svgr = require('@svgr/core').default

  return svgr(svg, { icon: true }, { componentName: capitalize([name, icon]) })
}
