import { from as ofrom, concat, Observable } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'

import {
  EnvSettings,
  EnvJson,
  SettingsInput,
  ItemId,
  ApiType,
  SaveRet,
} from './model'
import { readSettingsFromToml } from './read-file'
import { validateSettingsInput, genItemMap } from './parse-vars'
import { fetchItemRows } from './util'
import { updateById } from './update'
import { createById } from './create'


export function loadFiles(paths: string[]): Observable<SaveRet> {
  const path$ = ofrom(paths)
  const ret$ = path$.pipe(
    mergeMap((path) => {
      const settings = genEnvSettings(path)
      const save$ = saveSettings(settings)
      return save$
    }),
    filter((ret): ret is SaveRet => !! ret),
  )
  return ret$
}


export function genEnvSettings(path: string): EnvSettings {
  const settings: SettingsInput = readSettingsFromToml(path)
  validateSettingsInput(settings)

  const ret: EnvSettings = {
    host: settings.host,
    token: settings.token,
    groups: genItemMap('groups', settings.gids, settings.gVars),
    projects: genItemMap('projects', settings.pids, settings.pVars),
  }
  return ret
}


export function saveSettings(settings: EnvSettings): Observable<SaveRet | null> {
  const project$: Observable<SaveRet | null> = ofrom(settings.projects.keys()).pipe(
    mergeMap((itemId: ItemId) => {
      const apiType: ApiType = 'projects'
      return updateGroupProjectByItemId(apiType, itemId, settings)
    }),
  )
  const group$: Observable<SaveRet | null> = ofrom(settings.groups.keys()).pipe(
    mergeMap((itemId: ItemId) => {
      const apiType: ApiType = 'groups'
      return updateGroupProjectByItemId(apiType, itemId, settings)
    }),
  )

  const ret$ = concat(project$, group$)
  return ret$
}


function updateGroupProjectByItemId(
  apiType: ApiType,
  itemId: ItemId,
  settings: EnvSettings,
) {

  const existingRows$ = fetchItemRows<EnvJson[]>(
    apiType,
    settings.host,
    settings.token,
    itemId,
  )

  const update$ = existingRows$.pipe(
    mergeMap((arr) => {
      return updateById(apiType, itemId, settings, arr)
    }),
  )
  const create$ = existingRows$.pipe(
    mergeMap((arr) => {
      return createById(apiType, itemId, settings, arr)
    }),
  )

  const stream$ = concat(update$, create$)
  return stream$
}

