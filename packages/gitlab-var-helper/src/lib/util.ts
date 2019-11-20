import { get } from 'rxxfetch'
import { Observable } from 'rxjs'

import {
  ApiType,
  EnvSettings,
  ItemId,
} from './model'


export function fetchItemRows<T extends object>(
  apiType: ApiType,
  host: EnvSettings['host'],
  token: EnvSettings['token'],
  itemId: ItemId,
): Observable<T> {

  const url = `${host}/api/v4/${apiType}/${itemId}/variables`
  const opts = { headers: { 'PRIVATE-TOKEN': token } }
  const ret$ = get<T>(url, opts)

  return ret$
}


export function validateMaskValue(
  key: string,
  input: string,
  host: EnvSettings['host'],
): void {

  const ref = `${host}/help/ci/variables/README#masked-variables`

  if (/\n|\r/u.test(input)) {
    throw new TypeError(`Invalid value to be masked.
    The value must be in a single line, key: "${key}".
    See: ${ref}`)
  }
  if (input.length < 8) {
    throw new TypeError(`Invalid value to be masked.
    The value must be at least 8 characters long, key: "${key}", value: "${input}".
    See: ${ref}`)
  }
  // @TODO The value must only consist of characters from the Base64 alphabet (RFC4648).
}

