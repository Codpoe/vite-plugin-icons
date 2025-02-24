declare module '@svgr/core' {
  interface Config {
    icon?: boolean
  }

  interface State {
    componentName?: string
  }

  export default function svgr(
    code: string,
    config: Config,
    state: State
  ): Promise<string>
}
