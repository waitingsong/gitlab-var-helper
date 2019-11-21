
export type CmdType = 'load'

export interface Options {
  /** file path */
  f: string | string[]
  /** Ignore verification of the certificate, Default: false */
  ignoreCert?: boolean
}

export interface InputOptions {
  [prop: string]: string | number
}

export interface RunCmdArgs {
  cmd: CmdType | void
  options: Options
  debug: boolean
}

export interface CliArgs extends RunCmdArgs {
  needHelp: boolean
}

