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
npm i -g gitlab-var-helper-cli
```

## Usage

```sh
gitlab-var-helper-cli load -f settings.toml
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

