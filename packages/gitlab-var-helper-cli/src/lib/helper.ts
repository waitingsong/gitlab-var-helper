import { cmdSet, tw2, tw1 } from './config'
import { CmdType } from './model'


export function genCmdHelp(command: CmdType | ''): string {
  switch (command) {
    case 'load':
      return helpLoad()

    default:
      return helpDefault()
  }
}


export function helpDefault(): string {
  const head = 'Standard commands\n'
  const arr = Array.from(cmdSet)
  const more = 'More help: gitlab-var-helper <command> -h'

  return `${head}${arr.join('\t')}\n\n${more}`
}


export function helpLoad(): string {
  const head = 'Usage: load [options]'
  const intro = 'Load CI group/project variables from file(s) and save to the remote gitlab repository'
  const body = 'Valid options are:'
  const opts = [
    `  -f [FILE]${tw1}settings file in toml format`,
    `  --ignoreCert ${tw1}ignore verification of the certificate`,
    `  -h ${tw2}Display this summary`,
    `  -d ${tw2}Display debug info`,
  ]
  const demo = [
    'Demo:',
    '  gitlab-var-helper load -f settings.toml',
    '  gitlab-var-helper load -f settings.toml -f s2.toml',
    '  gitlab-var-helper load -f settings.toml --ignoreCert',
  ]

  return `${head}\n\n${intro}\n\n${body}\n${opts.join('\n')}\n\n${demo.join('\n')}`
}

