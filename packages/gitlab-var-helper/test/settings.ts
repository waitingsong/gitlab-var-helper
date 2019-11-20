import { readFileSync } from 'fs'

import { SettingsInput, EnvSettings, EnvKey, EnvValue, RowData } from '../src'


const pemPath = `${__dirname}/comodo-ecc-ca.crt`

export const caBuff = readFileSync(pemPath)
export const caEncoded = caBuff.toString('base64')

// the input settings of settings.toml
export const settingsInput: SettingsInput = {
  host: 'https://gitlab.foo.com',
  token: 'H7hHmdCnryy7UCeFB7tH',

  gids: [1, 2],
  gVars: {
    0: {
      publicVars: {
        VAR_PUB: 1024,
        CA_PUB: caEncoded,
      },
      protectedVars: {
        VAR_HIDE: 1024,
        VAR_HIDE2: 1024,
      },
    },
    2: {
      publicVars: {
        VAR_PUB: 2048,
        CA_PUB: caEncoded,
      },
      protectedVars: {
        VAR_HIDE: 2048,
        VAR_HIDE2: 1024,
      },
    },
  },

  pids: [76, 77],
  pVars: {
    0: {
      publicVars: {
        VAR_PUB: 1024,
      },
      protectedVars: {
        VAR_HIDE: 1024,
        VAR_HIDE2: 1024,
      },
    },
    77: {
      publicVars: {
        VAR_PUB: 2048,
        VAR_77_PUB: 2048,
      },
      protectedVars: {
        VAR_HIDE: 1024,
        VAR_HIDE2: 1024,
        VAR_77_HIDE: 2048,
      },
    },
  },
}

// the result settings of settings.toml
export const settings: EnvSettings = {
  host: 'https://gitlab.foo.com',
  token: 'H7hHmdCnryy7UCeFB7tH',

  groups: new Map([
    // groups
    [
      '1',
      new Map<EnvKey, RowData>([
        [
          'VAR_PUB', {
            apiType: 'groups',
            itemId: '1',
            key: 'VAR_PUB',
            value: 1024,
            protected: false,
          },
        ],
        [
          'CA_PUB', {
            apiType: 'groups',
            itemId: '1',
            key: 'CA_PUB',
            value: caEncoded,
            protected: false,
          },
        ],
        [
          'VAR_DUP_PUB', {
            apiType: 'groups',
            itemId: '1',
            key: 'VAR_DUP_PUB',
            value: 1024,
            protected: false,
          },
        ],
        [
          'VAR_HIDE', {
            apiType: 'groups',
            itemId: '1',
            key: 'VAR_HIDE',
            value: 1024,
            protected: true,
          },
        ],
        [
          'VAR_HIDE2', {
            apiType: 'groups',
            itemId: '1',
            key: 'VAR_HIDE2',
            value: 1024,
            protected: true,
          },
        ],
      ]),
    ],

    [
      '2',
      new Map<EnvKey, RowData>([
        [
          'VAR_PUB', {
            apiType: 'groups',
            itemId: '2',
            key: 'VAR_PUB',
            value: 2048,
            protected: false,
          },
        ],
        [
          'CA_PUB', {
            apiType: 'groups',
            itemId: '2',
            key: 'CA_PUB',
            value: caEncoded,
            protected: false,
          },
        ],
        [
          'VAR_HIDE', {
            apiType: 'groups',
            itemId: '2',
            key: 'VAR_HIDE',
            value: 2048,
            protected: true,
          },
        ],
        [
          'VAR_HIDE2', {
            apiType: 'groups',
            itemId: '2',
            key: 'VAR_HIDE2',
            value: 1024,
            protected: true,
          },
        ],
        [
          'VAR_DUP_PUB', {
            apiType: 'groups',
            itemId: '2',
            key: 'VAR_DUP_PUB',
            value: 2048,
            protected: true,
          },
        ],
      ]),
    ],
  ]),

  projects: new Map([
    [
      '76',
      new Map<EnvKey, RowData>([
        [
          'VAR_PUB', {
            apiType: 'projects',
            itemId: '76',
            key: 'VAR_PUB',
            value: 1024,
            protected: false,
          },
        ],
        [
          'VAR_HIDE', {
            apiType: 'projects',
            itemId: '76',
            key: 'VAR_HIDE',
            value: 1024,
            protected: true,
          },
        ],
        [
          'VAR_HIDE2', {
            apiType: 'projects',
            itemId: '76',
            key: 'VAR_HIDE2',
            value: 1024,
            protected: true,
          },
        ],
        [
          'VAR_HIDE3', {
            apiType: 'projects',
            itemId: '76',
            key: 'VAR_HIDE3',
            value: 1024,
            protected: true,
          },
        ],
      ]),
    ],

    // project
    [
      '77',
      new Map<EnvKey, RowData>([
        [
          'VAR_PUB', {
            apiType: 'projects',
            itemId: '77',
            key: 'VAR_PUB',
            value: 2048,
            protected: false,
          },
        ],
        [
          'VAR_77_PUB', {
            apiType: 'projects',
            itemId: '77',
            key: 'VAR_77_PUB',
            value: 2048,
            protected: false,
          },
        ],
        [
          'VAR_HIDE', {
            apiType: 'projects',
            itemId: '77',
            key: 'VAR_HIDE',
            value: 1024,
            protected: true,
          },
        ],
        [
          'VAR_HIDE2', {
            apiType: 'projects',
            itemId: '77',
            key: 'VAR_HIDE2',
            value: 1024,
            protected: true,
          },
        ],
        [
          'VAR_77_HIDE', {
            apiType: 'projects',
            itemId: '77',
            key: 'VAR_77_HIDE',
            value: 2048,
            protected: true,
          },
        ],
        [
          'VAR_HIDE3', {
            apiType: 'projects',
            itemId: '77',
            key: 'VAR_HIDE3',
            value: 1024,
            protected: true,
          },
        ],
      ]),
    ],

  ]),
}

