import {
  ApiType,
  EnvKey,
  EnvValue,
  ItemId,
  ItemMap,
  ItemObj,
  RowData,
  RowDataMap,
  SettingsInput,
  VarObj,
  VarRows,
} from './model'


export function validateSettingsInput(settings: SettingsInput): void {
  if (! settings.gVars && ! settings.pVars) {
    throw new Error('Both gVars and pVars empty')
  }

  if (settings.gVars) {
    validateItemObj(settings.gVars)
  }

  if (settings.pVars) {
    validateItemObj(settings.pVars)
  }
}
function validateItemObj(gpVars: ItemObj): void {
  Object.entries(gpVars).forEach(([itemId, varObj]: [ItemId, VarObj]) => {
    const id = +itemId
    if (typeof id !== 'number' || id < 0) {
      throw new TypeError(`Invalid itemId: "${itemId}", should be numeric string`)
    }

    const { publicVars, protectedVars: privateVars } = varObj
    if (publicVars && privateVars) {
      Object.keys(publicVars).forEach((key: EnvKey) => {
        if (typeof privateVars[key] !== 'undefined') {
          console.info(Object.keys(publicVars))
          throw new Error(`Duplicate key: "${key}" in both publicVars and privateVars with itemId: "${itemId}"`)
        }
      })
    }
  })
}


export function genItemMap(
  apiType: ApiType,
  ids: number[],
  itemObj?: ItemObj,
): ItemMap {

  const ret: ItemMap = new Map()
  if (! itemObj || ! Object.keys(itemObj).length) {
    return ret
  }

  const defaultId = '0'
  const defaultVarObj: VarObj | null = typeof itemObj[defaultId] === 'object'
    ? itemObj[defaultId]
    : null

  Object.entries(itemObj).forEach(([itemId, varObj]: [ItemId, VarObj]) => {
    if (itemId === defaultId) {
      return
    }
    else if (! ids.includes(+itemId)) {
      return
    }

    const rowDataMap = genItemDataMapFromVarObj(apiType, itemId, defaultVarObj, varObj)
    ret.set(itemId, rowDataMap)
  })

  if (defaultVarObj) {
    ids.forEach((id) => {
      const itemId = id.toString()
      if (ret.has(itemId)) {
        return
      }
      const rowDataMap = genItemDataMapFromVarObj(apiType, itemId, null, defaultVarObj)
      ret.set(itemId, rowDataMap)
    })
  }

  return ret
}

function genItemDataMapFromVarObj(
  apiType: ApiType,
  itemId: ItemId,
  defaultVarObj: VarObj | null,
  varObj: VarObj,
): RowDataMap {

  const ret: RowDataMap = new Map()
  const { publicVars, protectedVars } = varObj

  if (publicVars) {
    const defaults: VarRows | null = defaultVarObj && defaultVarObj.publicVars
      ? defaultVarObj.publicVars
      : null
    const map = genRowDataMap(apiType, itemId, defaults, publicVars, false)

    map.forEach((val, key) => {
      ret.set(key, val)
    })
  }

  if (protectedVars) {
    const defaults: VarRows | null = defaultVarObj && defaultVarObj.protectedVars
      ? defaultVarObj.protectedVars
      : null
    const map = genRowDataMap(apiType, itemId, defaults, protectedVars, true)

    map.forEach((val, key) => {
      ret.set(key, val)
    })
  }

  return ret
}

function genRowDataMap(
  apiType: ApiType,
  itemId: ItemId,
  defaults: VarRows | null,
  varRows: VarRows,
  isProtected: boolean,
): RowDataMap {

  const ret: RowDataMap = new Map()

  const defaultsRowDataMap = genRowDataMapFromVarRows(
    apiType,
    itemId,
    defaults,
    isProtected,
  )
  defaultsRowDataMap.forEach((rowData) => {
    ret.set(rowData.key, rowData)
  })

  const rowDataMap = genRowDataMapFromVarRows(
    apiType,
    itemId,
    varRows,
    isProtected,
  )
  rowDataMap.forEach((rowData) => {
    ret.set(rowData.key, rowData)
  })

  return ret
}


function genRowDataMapFromVarRows(
  apiType: ApiType,
  itemId: ItemId,
  varRows: VarRows | null,
  isProtected: boolean,
): RowDataMap {

  const ret: RowDataMap = new Map()

  if (varRows && Object.keys(varRows).length) {
    Object.entries(varRows).forEach(([key, value]: [EnvKey, EnvValue]) => {
      const rowData: RowData = {
        apiType,
        itemId,
        key,
        value,
        protected: isProtected,
      }
      ret.set(key, rowData)
    })
  }

  return ret
}

