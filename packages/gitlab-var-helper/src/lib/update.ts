import { Observable, from as ofrom, of } from 'rxjs'
import {
  mergeMap,
  catchError,
  map,
} from 'rxjs/operators'
import { put } from 'rxxfetch'

import {
  ApiType,
  EnvSettings,
  ItemId,
  EnvJson,
  UpdateRowsOpts,
  SaveRet,
} from './model'
import { validateMaskValue } from './util'


/** Update env rows for group or project */
export function updateById(
  apiType: ApiType,
  itemId: ItemId | number,
  settings: EnvSettings,
  existingRows: EnvJson[],
): Observable<SaveRet | null> {

  const id = itemId.toString()

  const rowDataMap = settings[apiType].get(id)
  if (! rowDataMap) {
    throw new Error(`settings[${apiType}] NOT contains key: "$itemId"`)
  }

  const ret = updateExistingRows({
    apiType, itemId: id, settings, existingRows, rowDataMap,
  })
  return ret
}


function updateExistingRows(options: UpdateRowsOpts): Observable<SaveRet | null> {
  const {
    apiType, itemId, settings, existingRows, rowDataMap,
  } = options

  const srcRows: EnvJson[] = []

  existingRows.forEach((row: EnvJson) => {
    const rowData = rowDataMap.get(row.key)
    if (rowData) {
      const data: EnvJson = {
        ...row,
        value: rowData.value.toString(),
        protected: rowData.protected,
      }

      if (data.masked) {
        validateMaskValue(data.key, data.value, settings.host)
      }
      srcRows.push(data)
    }
  })

  if (! srcRows.length) {
    return of(null)
  }

  const ret$ = ofrom(srcRows).pipe(
    mergeMap((row: EnvJson) => {
      const stream$ = updateExistingRow(
        apiType,
        settings.host,
        settings.token,
        itemId,
        row,
      )
      return stream$
    }, 5),
  )

  return ret$
}

function updateExistingRow(
  apiType: ApiType,
  host: EnvSettings['host'],
  token: EnvSettings['token'],
  itemId: ItemId,
  data: EnvJson,
): Observable<SaveRet> {

  const url = `${host}/api/v4/${apiType}/${itemId}/variables/${data.key}`
  const opts = {
    headers: { 'PRIVATE-TOKEN': token },
    data: {
      value: data.value,
      protected: data.protected,
    },
  }

  const ret$ = put<EnvJson>(url, opts).pipe(
    map(() => {
      const ret: SaveRet = {
        result: 'success',
        action: 'update',
        apiType,
        itemId,
        key: data.key,
        masked: data.masked,
        protected: data.protected,
        errMsg: '',
      }
      return ret
    }),
    catchError((err: Error) => {
      const ret: SaveRet = {
        result: 'fail',
        action: 'update',
        apiType,
        itemId,
        key: data.key,
        masked: data.masked,
        protected: data.protected,
        errMsg: err.message,
      }
      return of(ret)
    }),
  )

  return ret$
}

