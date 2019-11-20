import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'
import { tap, reduce } from 'rxjs/operators'

import {
  EnvSettings,
  genEnvSettings,
  saveSettings,
  SaveRet,
} from '../src/index'

import { astResult } from './test.helper'


const filename = basename(__filename)

describe.skip(filename, () => {
  const path = `${__dirname}/settings2.toml`

  describe('should works', () => {
    before(() => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    })
    after(() => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'
    })

    const json: EnvSettings = genEnvSettings(path)
    assert(json && typeof json === 'object')

    it('real load', async () => {
      await saveSettings(json)
        .pipe(
          tap((info) => {
            if (info === null) {
              return
            }
            else if (info) {
              console.info(info)
              if (! info.result) {
                assert(false)
              }
            }
            else {
              assert(false, 'Invalid result info')
            }
          }),
          reduce((acc: SaveRet[], cur: SaveRet | null) => {
            cur && acc.push(cur)
            return acc
          }, []),
        )
        .toPromise()

      const {
        groups, projects, host, token,
      } = json

      await astResult('groups', groups, host, token).toPromise()
      await astResult('projects', projects, host, token).toPromise()
    })

  })
})
