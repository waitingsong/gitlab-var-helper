import { readFileSync } from 'fs'

import { parse } from 'toml'

import { SettingsInput } from './model'


export function readSettingsFromToml(path: string): SettingsInput {
  const buf = readFileSync(path)
  const ret = parse(buf.toString())
  return ret
}

