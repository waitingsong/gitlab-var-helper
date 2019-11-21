/* eslint-disable id-length */
import { Observable } from 'rxjs'
import { finalize, filter, tap } from 'rxjs/operators'
import {
  loadFiles,
  SaveRet,
} from 'gitlab-var-helper'

import { RunCmdArgs, Options } from './model'


export function runCmd(args: RunCmdArgs) {
  const { cmd, options, debug } = args

  debug && options && console.info(options)
  switch (cmd) {
    case 'load':
      return load(options)

    default:
      throw new Error(`invalid cmd: "${cmd}"`)
  }
}


function load(options: Options): Observable<SaveRet> {
  const { f: file, ignoreCert, logLevel } = options
  const paths: string[] = typeof file === 'string'
    ? [file]
    : file

  const oldVal = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  if (ignoreCert === true) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  let hasFail = false
  const load$ = loadFiles(paths)
  const ret$ = load$.pipe(
    tap((ret) => {
      if (! hasFail && ret.result === 'fail') {
        hasFail = true
      }
    }),
    finalize(() => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = oldVal
      if (hasFail) {
        process.exit(1)
      }
    }),
    filter((ret) => {
      // eslint-disable-next-line no-mixed-operators
      const flag = !! (logLevel === 'info' || logLevel === 'error' && ret.result === 'fail')
      return flag
    }),
  )

  return ret$
}

