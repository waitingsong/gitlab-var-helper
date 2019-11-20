import * as assert from 'power-assert'
import { from as ofrom, of } from 'rxjs'
import { tap, mergeMap, mapTo } from 'rxjs/operators'

import {
  ApiType,
  EnvKey,
  EnvJson,
  EnvSettings,
  EnvValue,
  fetchItemRows,
  ItemId,
  ItemMap,
  RowData,
  RowDataMap,
} from '../src/index'


export function astItemMap(input1: ItemMap, input2: ItemMap): void {
  assert(input1 && input1.size > 0)
  assert(input2 && input2.size > 0)

  input1.forEach((rowDataMap, itemId) => {
    assert(rowDataMap && rowDataMap.size > 0)
    assert(input2.has(itemId))

    const row = input2.get(itemId)
    assert(row)
    row && astRowDataMap(rowDataMap, row)
  })

  input2.forEach((rowDataMap, itemId) => {
    assert(rowDataMap && rowDataMap.size > 0)
    assert(input1.has(itemId))

    const row = input1.get(itemId)
    assert(row)
    row && astRowDataMap(row, rowDataMap)
  })
}

function astRowDataMap(input1: RowDataMap, input2: RowDataMap): void {
  assert(input1 && input1.size > 0)
  assert(input2 && input2.size > 0)

  input1.forEach((rowData, label) => {
    assert(rowData)
    assert(input2.has(label), 'astRowDataMap()')

    const row = input2.get(label)
    assert(row)
    row && astRowData(rowData, row)
  })

  input2.forEach((rowData, label) => {
    assert(rowData)
    assert(input1.has(label), 'astRowDataMap()')

    const row = input1.get(label)
    assert(row)
    row && astRowData(row, rowData)
  })
}

function astRowData(input1: RowData, input2: RowData): void {
  assert(input1 && Object.keys(input1).length > 0)
  assert(input2 && Object.keys(input2).length > 0)

  Object.entries(input1).forEach(([key, val]: [EnvKey, EnvValue]) => {
    assert(typeof input2[key] !== 'undefined')
    assert(val === input2[key], 'astRowData')
  })

  Object.entries(input2).forEach(([key, val]: [EnvKey, EnvValue]) => {
    assert(typeof input1[key] !== 'undefined')
    assert(input1[key] === val, 'astRowData')
  })
}


export function astResult(
  apiType: ApiType,
  item: ItemMap,
  host: EnvSettings['host'],
  token: EnvSettings['token'],
) {

  const ret$ = ofrom(item.keys()).pipe(
    mergeMap((itemId: ItemId) => {
      const rowDataMap = item.get(itemId)

      if (! rowDataMap || ! rowDataMap.size) {
        return of(null)
      }

      const rows$ = fetchItemRows<EnvJson[]>(
        apiType,
        host,
        token,
        itemId,
      )

      const ast$ = rows$.pipe(
        tap((arr) => {
          for (const [envKey, rowData] of rowDataMap.entries()) {
            let matched = false
            const value = rowData.value.toString()

            arr.forEach((remoteRow: EnvJson) => {
              if (envKey === remoteRow.key
                && value === remoteRow.value
                && rowData.protected === remoteRow.protected) {

                matched = true
              }
            })
            assert(matched, `itemId: ${itemId}, envKey: ${envKey}`)
          }
        }),
        mapTo(null),
      )

      return ast$
    }, 5),
  )

  return ret$
}
