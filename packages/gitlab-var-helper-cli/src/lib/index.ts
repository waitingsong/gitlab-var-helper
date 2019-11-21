/* eslint-disable id-length */
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import {
  loadFiles,
  SaveRet,
} from 'gitlab-var-helper'

import { RunCmdArgs, Options } from './model'


export function runCmd(args: RunCmdArgs): Observable<SaveRet | null> {
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
  const { f: file, ignoreCert } = options
  const paths: string[] = typeof file === 'string'
    ? [file]
    : file

  const oldVal = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  if (ignoreCert === true) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  const ret$ = loadFiles(paths)
  return ret$.pipe(
    finalize(() => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = oldVal
    }),
  )
}

