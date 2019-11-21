
export interface SaveRet {
  result: 'success' | 'fail'
  action: 'create' | 'update'
  apiType: ApiType
  itemId: ItemId
  key: EnvKey
  masked: boolean
  protected: boolean
  errMsg: string
}

export interface SettingsInput {
  /**
   * Your gitlab host,
   * eg. https://gitlab.foo.com/api/v4
   */
  host: string
  /** TOKEN to accessing gitlab repository */
  token: string
  gids: number[]
  gVars?: ItemObj
  pids: number[]
  pVars?: ItemObj
}
export interface EnvSettings {
  host: string
  token: string
  groups: ItemMap
  projects: ItemMap
}

export type ItemMap = Map<ItemId, RowDataMap>
export type RowDataMap = Map<EnvKey, RowData>
export interface RowData {
  apiType: ApiType
  itemId: ItemId
  key: EnvKey
  value: EnvValue
  protected: boolean
}

/** groupId or projectId, numeric string */
export type ItemId = string
// export type ItemIds = ItemId[]
export type ApiType = 'groups' | 'projects'

/** variable Key */
export type EnvKey = string
/** variable Value */
export type EnvValue = number | string


export interface ItemObj {
  [itemId: string]: VarObj
}
/** group or project env object */
export interface VarObj {
  publicVars: VarRows
  protectedVars: VarRows
}
export interface VarRows {
  [key: string]: EnvValue
}

export interface EnvJson {
  key: EnvKey
  masked: boolean
  protected: boolean
  value: string
  variable_type: 'env_var' | 'env_file'
}
export interface CreateRowsOpts {
  apiType: ApiType
  itemId: ItemId
  settings: EnvSettings
  existingRowKeys: Set<EnvKey>
  rowDataMap: RowDataMap
}
export interface UpdateRowsOpts {
  apiType: ApiType
  itemId: ItemId
  settings: EnvSettings
  existingRows: EnvJson[]
  rowDataMap: RowDataMap
}

