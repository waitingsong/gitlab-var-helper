# [gitlab-var-helper](https://waitingsong.github.io/gitlab-var-helper/)

Create and update [GitLab CI/CD environment variables] from settings file in `toml` format,
based on [gitlab-variable-helper]


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/gitlab-var-helper.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Installation

```sh
npm i gitlab-var-helper
# cli
npm i -g gitlab-var-helper-cli
```


## Usage

### 生成 token

1. Open page
  ```
  https://git.your.com/profile/personal_access_tokens
  ```
2. Create `Personal Access Tokens` with `Scopes`
  - `api` 
  - `read_repository`
  - `write_repository`
3. Remember the generated `token`
  ```
  Upw_foooooooooooo
  ```


### 创建设置文件

```toml
# settings.toml
title = "gitlab var settints"
host = "https://git.your.com"
token = "Upw_foooooooooooo"

# groups ids
gids = [ 13 ]

# project ids
pids = [ 76, 77 ]

# gVars.0 provides default values for groups in gids 
[gVars.0.publicVars]
  VAR_PUB = 1024
  VAR_DUP_PUB = 1024

[gVars.0.protectedVars]
  VAR_HIDE = 1024
  VAR_HIDE2 = 1024

[gVars.13.publicVars]
  VAR_PUB = 'abcd'
[gVars.13.protectedVars]
  VAR_HIDE = 'def'
  VAR_DUP_PUB = 2048

# pVars.0 provides default values for Projects in pids
[pVars.0.publicVars]
  VAR_PUB = 1024
[pVars.0.protectedVars]
  VAR_HIDE = 1024

[pVars.77.publicVars]
  VAR_PUB = 2048
  VAR_77_PUB = 2048
[pVars.77.protectedVars]
  VAR_77_HIDE = 2048

```

### 通过包调用

```ts
import { loadFiles } from 'gitlab-var-helper'

const paths = [ './settings.toml' ]
loadFiless(paths)
```

### 通过命令行调用

```sh
gitlab-var-helper -f ./settings.toml
gitlab-var-helper -f ./settings.toml -f ./other.toml
```


## Packages

| Package                   | Version                | Dependencies                 | DevDependencies                |
| ------------------------- | ---------------------- | ---------------------------- | ------------------------------ |
| [`gitlab-var-helper`]     | [![main-svg]][main-ch] | [![main-d-svg]][main-d-link] | [![main-dd-svg]][main-dd-link] |
| [`gitlab-var-helper-cli`] | [![cli-svg]][cli-ch]   | [![cli-d-svg]][cli-d-link]   | [![cli-dd-svg]][cli-dd-link]   |


## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)


[`gitlab-var-helper`]: https://github.com/waitingsong/gitlab-var-helper/tree/master/packages/gitlab-var-helper
[main-svg]: https://img.shields.io/npm/v/gitlab-var-helper.svg?maxAge=86400
[main-ch]: https://github.com/waitingsong/gitlab-var-helper/tree/master/packages/gitlab-var-helper/CHANGELOG.md
[main-d-svg]: https://david-dm.org/waitingsong/gitlab-var-helper.svg?path=packages/gitlab-var-helper
[main-d-link]: https://david-dm.org/waitingsong/gitlab-var-helper.svg?path=packages/gitlab-var-helper
[main-dd-svg]: https://david-dm.org/waitingsong/gitlab-var-helper/dev-status.svg?path=packages/gitlab-var-helper
[main-dd-link]: https://david-dm.org/waitingsong/gitlab-var-helper?path=packages/gitlab-var-helper#info=devDependencies


[`gitlab-var-helper-cli`]: https://github.com/waitingsong/gitlab-var-helper/tree/master/packages/gitlab-var-helper-cli
[cli-svg]: https://img.shields.io/npm/v/gitlab-var-helper-cli.svg?maxAge=86400
[cli-ch]: https://github.com/waitingsong/gitlab-var-helper/tree/master/packages/gitlab-var-helper-clie/CHANGELOG.md
[cli-d-svg]: https://david-dm.org/waitingsong/gitlab-var-helper.svg?path=packages/gitlab-var-helper-cli
[cli-d-link]: https://david-dm.org/waitingsong/gitlab-var-helper.svg?path=packages/gitlab-var-helper-cli
[cli-dd-svg]: https://david-dm.org/waitingsong/gitlab-var-helper/dev-status.svg?path=packages/gitlab-var-helper-cli
[cli-dd-link]: https://david-dm.org/waitingsong/gitlab-var-helper?path=packages/gitlab-var-helper-cli#info=devDependencies


[GitLab CI/CD environment variables]: https://docs.gitlab.com/ee/ci/variables/README.html#gitlab-cicd-environment-variables
[gitlab-variable-helper]: https://github.com/soulteary/gitlab-variable-helper

