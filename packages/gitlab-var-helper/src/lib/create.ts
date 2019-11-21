import { Observable, from as ofrom, of } from 'rxjs'
import {
  mergeMap,
  catchError,
  map,
} from 'rxjs/operators'
import { post } from 'rxxfetch'

import {
  ApiType,
  EnvSettings,
  ItemId,
  EnvJson,
  RowData,
  CreateRowsOpts,
  SaveRet,
} from './model'
import { validateMaskValue } from './util'


/** Create env rows for group or project */
export function createById(
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

  const existingRowKeys: CreateRowsOpts['existingRowKeys'] = new Set()
  existingRows.forEach((row) => {
    existingRowKeys.add(row.key)
  })

  const ret = createRows({
    apiType, itemId: id, settings, existingRowKeys, rowDataMap,
  })
  return ret
}


function createRows(options: CreateRowsOpts): Observable<SaveRet | null> {
  const {
    apiType, itemId, settings, existingRowKeys, rowDataMap,
  } = options

  const srcRows: EnvJson[] = []

  rowDataMap.forEach((row: RowData) => {
    if (row && Object.keys(row).length) {
      const { key } = row
      if (existingRowKeys.has(key)) {
        return
      }

      const data: EnvJson = {
        key,
        value: row.value.toString(),
        protected: row.protected,
        variable_type: 'env_var',
        masked: false,
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
      const create$ = createRow(
        apiType,
        settings.host,
        settings.token,
        itemId,
        row,
      )
      return create$
    }, 5),
  )

  return ret$
}


function createRow(
  apiType: ApiType,
  host: EnvSettings['host'],
  token: EnvSettings['token'],
  itemId: ItemId,
  data: EnvJson,
): Observable<SaveRet> {

  const url = `${host}/api/v4/${apiType}/${itemId}/variables`
  const opts = {
    headers: { 'PRIVATE-TOKEN': token },
    data: {
      key: data.key,
      value: data.value,
      protected: data.protected,
    },
  }

  const ret$ = post<EnvJson>(url, opts).pipe(
    map(() => {
      const ret: SaveRet = {
        result: 'success',
        action: 'create',
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
        action: 'create',
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

