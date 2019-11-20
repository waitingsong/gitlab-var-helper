import { basename, join } from '@waiting/shared-core'
import * as assert from 'power-assert'
import { tap, finalize, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { genEnvSettings, EnvSettings } from 'gitlab-var-helper'

import { runCmd, RunCmdArgs } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  const path = join(__dirname, './test.settings.toml')
  const json: EnvSettings = genEnvSettings(path)

  describe('Should cmd load works', () => {
    it('with -f, ignore ECONNREFUSED', async () => {
      const args: RunCmdArgs = {
        cmd: 'load',
        debug: false,
        options: {
          f: path,
        },
      }

      await runCmd(args)
        .pipe(
          tap((ret) => {
            console.info(ret)
            assert(ret && ret.result)
          }),
          catchError((err: Error) => {
            // @ts-ignore
            if (err.code === 'ECONNREFUSED' && err.message.includes(json.host)) {
              return of(null)
            }
            throw err
          }),
        )
        .toPromise()
    })
  })

})

