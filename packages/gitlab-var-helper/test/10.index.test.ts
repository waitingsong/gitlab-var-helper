import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { genEnvSettings, EnvSettings } from '../src/index'

import { settings } from './settings'
import { astItemMap } from './test.helper'


const filename = basename(__filename)

describe(filename, () => {
  const path = `${__dirname}/settings.toml`

  describe('should works', () => {
    const json: EnvSettings = genEnvSettings(path)
    assert(json && typeof json === 'object')

    it('baseHost', () => {
      assert(json.host && json.host === settings.host)
    })

    it('token', () => {
      assert(json.token && json.token === settings.token)
    })

    it('gids', () => {
      const { groups } = json
      const { groups: im } = settings

      assert(groups && groups.size > 0)
      assert(im && im.size > 0)

      for (const [id] of groups) {
        assert(typeof id === 'string' && +id > 0)
        assert(im && im.has(id))
      }
      for (const [id] of im) {
        assert(typeof id === 'string' && +id > 0)
        assert(groups && groups.has(id))
      }
    })
    it('pids', () => {
      const { projects } = json
      const { projects: im } = settings

      assert(projects && projects.size > 0)
      assert(im && im.size > 0)

      for (const [id] of projects) {
        assert(typeof id === 'string' && +id > 0)
        assert(im && im.has(id))
      }
      for (const [id] of im) {
        assert(typeof id === 'string' && +id > 0)
        assert(projects && projects.has(id))
      }
    })

    it('Group rowData', () => {
      const { groups } = json
      const { groups: im } = settings

      assert(groups && groups.size > 0)
      assert(im && im.size > 0)

      astItemMap(groups, im)
    })
    it('Project rowData', () => {
      const { projects } = json
      const { projects: im } = settings

      assert(projects && projects.size > 0)
      assert(im && im.size > 0)

      astItemMap(projects, im)
    })

  })
})

