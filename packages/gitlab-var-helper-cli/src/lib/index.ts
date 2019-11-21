/* eslint-disable id-length */
import { Observable } from 'rxjs'
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
  const { f: file } = options
  const paths: string[] = typeof file === 'string'
    ? [file]
    : file

  const ret$ = loadFiles(paths)
  return ret$
}

