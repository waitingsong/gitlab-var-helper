/* eslint-disable id-length */
import { CliArgs } from './model'


export const cmdSet = new Set(['load'])

export const sp2 = ' '.repeat(2)
export const sp3 = ' '.repeat(3)
export const sp4 = ' '.repeat(4)
export const tw1 = '\t'.repeat(1)
export const tw2 = '\t'.repeat(2)
export const tw3 = '\t'.repeat(3)

export const initialCliArgs: CliArgs = {
  cmd: void 0,
  options: {
    f: '',
    ignoreCert: false,
    logLevel: 'error',
  },
  needHelp: false,
  debug: false,
}
