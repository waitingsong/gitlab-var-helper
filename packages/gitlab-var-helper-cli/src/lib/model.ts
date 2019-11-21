
export type CmdType = 'load'

export interface Options {
  /** file path */
  f: string | string[]
  /** ignore verification of the certificate */
  ignoreCert: boolean
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

