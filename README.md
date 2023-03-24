# 介绍

[vue3-admin-template](https://github.com/YeeLei/vue3-admin-template)  是一个后台前端解决方案，它基于  [vue](https://github.com/vuejs/vue)  和  [element-plus](https://github.com/element-plus/element-plus.git)实现。它使用了最新的前端技术栈，内置了动态路由，权限验证，提供了多种布局方式，它可以帮助你快速搭建企业级中后台产品原型。

## 功能

```js
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - Screenfull全屏
```

## 前序准备

你需要在本地安装  [node](http://nodejs.org/)  和  [git](https://git-scm.com/)。本项目技术栈基于  [ES2015+](http://es6.ruanyifeng.com/)、[element-plus](https://github.com/element-plus/element-plus.git)、[axios](https://github.com/axios/axios.git[)、[pinia](https://github.com/vuejs/pinia.git)、[vue-router](https://github.com/vuejs/vue-router.git)和[vite](https://github.com/vitejs/vite.git)和提前了解和学习这些知识会对使用本项目有很大的帮助。

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```js
├── .husky
├── public
│   └── favicon.ico
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── icons
│   ├── layout
│   ├── router
│   ├── settings.js
│   ├── store
│   ├── styles
│   ├── utils
│   └── views
│   ├── App.vue
│   ├── main.js
│   ├── permission.js
│   ├── settings.js
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── auto-imports.d.ts
├── commitlint.config.js
├── components.d.ts
├── index.html
├── jsconfig.json
├── package.json
├── README.md
├── vite.config.js
├── yarn.lock
```

## 安装

```js
# 克隆项目
git clone https://github.com/YeeLei/vue3-admin-template

# 进入项目目录
cd vue3-admin-template

# 安装依赖
yarn install

# 本地开发 启动项目
yarn dev
```

> TIP
>
> 强烈建议使用 yarn 安装依赖，避免使用 npm 或者 cnpm 安装，可能会有各种诡异的 bug。

## 代码规范

随着前端应用逐渐变得大型化和复杂化，在同一个项目中有多个人员参与时，每个人的前端能力程度不等，他们往往会用不同的编码风格和习惯在项目中写代码，长此下去，势必会让项目的健壮性越来越差。解决这些问题，理论上讲，口头约定和代码审查都可以，但是这种方式无法实时反馈，而且沟通成本过高，不够灵活，更关键的是无法把控。不以规矩，不能成方圆，我们不得不在项目使用一些工具来约束代码规范。
决定采用 `EditorConfig` + `ESLint` + `Prettier` 组合来实现代码规范化。
这样做带来好处：

* 解决团队之间代码不规范导致的可读性差和可维护性差的问题。
* 解决团队成员不同编辑器导致的编码规范不统一问题。
* 提前发现代码风格问题，给出对应规范提示，及时修复。
* 减少代码审查过程中反反复复的修改过程，节约时间。
* 自动格式化，统一编码风格，从此和脏乱差的代码说再见。

### 集成 EditorConfig 配置

`EditorConfig` 主要用于统一不同 IDE 编辑器的编码风格。
在项目根目录下添加 `.editorconfig` 文件，具体格式参照项目`.editorconfig` 文件
> 很多 IDE 中会默认支持此配置，但是也有些不支持，如：VSCode、Atom、Sublime Text 等。
> 具体列表可以参考官网，如果在 VSCode 中使用需要安装 EditorConfig for VS Code 插件。
>
### 集成 ESLint 配置

ESLint 是针对 EScript 的一款代码检测工具，它可以检测项目中编写不规范的代码，如果写出不符合规范的代码会被警告。

由此我们就可以借助于 ESLint 强大的功能来统一团队的编码规范。
**安装依赖**

* ESLint - ESLint 本体
* eslint-define-config - 改善 ESLint 规范编写体验
* eslint-plugin-vue - 适用于 Vue 文件的 ESLint 插件
* vue-eslint-parser - 使用 eslint-plugin-vue 时必须安装的 ESLint 解析器

```bash
yarn add eslint eslint-define-config eslint-plugin-vue vue-eslint-parser -D
```

**安装插件**
Visual Studio Code 编辑器使用 ESLint 配置需要下载插件 ESLint 。
**创建ESLint配置文件**
在项目根目录创建 `.eslintrc.js` 文件，具体格式如下：

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  overrides: [],

  rules: {
    // "off" or 0 - 关闭规则
    // "warn" or 1 - 将规则视为一个警告
    // "error" or 2 - 将规则视为一个错误
    // 强制使用 === 和 !==
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off',
  },
}
```

> 关于更多配置项信息，请前往 ESLint 官网查看[ESLint-Configuring](https://link.juejin.cn/?target=http%3A%2F%2Feslint.cn%2Fdocs%2Fuser-guide%2Fconfiguring)

**创建ESLint过滤规则**

在项目根目录添加一个 `.eslintignore` 文件，内容如下：

```bash
dist
node_modules
!.prettierrc.js
components.d.ts
auto-imports.d.ts
```

### 集成 Prettier 配置

[Prettier](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io) 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

**安装依赖**

```bash
yarn add prettier -D
```

**安装插件**

Visual Studio Code 编辑器使用 `Prettier` 配置需要下载插件 **Prettier - Code formatter** 。

**创建Prettier配置文件**

Prettier 支持多种格式的[配置文件](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Fconfiguration.html)，比如 `.json`、`.yml`、`.yaml`、`.js`等。

在项目根目录创建 `.prettierrc.js` 文件，具体代码格式如下：

```js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
  // html, vue, jsx 中每个属性占一行
  singleAttributePerLine: false,
}
```

> 关于更多配置项信息，请前往 Prettier 官网查看 [Prettier-Options](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Foptions.html)

**创建Prettier 过滤规则**

在项目根目录添加一个 `.prettierignore` 文件，内容如下：

```bash
## OS
.DS_Store
.idea
.editorconfig
pnpm-lock.yaml
.npmrc

# Ignored suffix
*.log
*.md
*.svg
*.png
*.ico
*ignore

## Local
.husky

## Built-files
.cache
dist
```

### 解决 Prettier 和 ESLint 冲突

本项目中的 ESLint 配置使用了 Airbnb JavaScript 风格指南校验，其规则之一是*代码结束后面要加分号*，而在 Prettier 配置文件中加了*代码结束后面不加分号*配置项，从而冲突了。

解决两者冲突问题，需要用到 **eslint-plugin-prettier** 和 **eslint-config-prettier**。

* `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中
* `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则

最后形成优先级：`Prettier 配置规则` > `ESLint 配置规则`

```bash
yarn add eslint-plugin-prettier eslint-config-prettier -D
```

**修改ESLint配置文件**

修改 `.eslintrc.js` 文件，在 `extends` 中添加 `plugin:prettier/recommended` 规则（此规则一定要加在最后）。

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
}
```

### 自动格式化代码

Visual Studio Code 在 `settings.json` 设置文件中，增加以下代码：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```

### 集成 husky 和 lint-staged

在项目中已集成 ESLint 和 Prettier，在编码时，这些工具可以对代码进行实时校验，在一定程度上能有效规范所写代码，但有些人可能觉得这些限制很麻烦，从而选择视“提示”而不见，依旧按自己编程风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，日积月累，ESLint 也就形同虚设。

所以，还需要做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

为了解决这个问题，需要用到 Git Hook，在本地执行 `git commit` 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 `eslint --fix`），如果这些代码没通过 ESLint 规则校验，则禁止提交。

实现这一功能，需要借助 [husky](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fhusky) + [lint-staged](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fokonet%2Flint-staged) 。

**配置husky**

使用 `husky-init` 命令快速在项目初始化 `husky` 配置：

```
# 初始化仓库
git init

# 初始化
npx husky-init

# 安装依赖
npm install
```

husky 包含很多 `hook`（钩子），常用有：`pre-commit`、`commit-msg`。

使用 `pre-commit` 来触发 ESLint 命令，修改 `.husky/pre-commit` 文件触发命令：

```bash
eslint --fix ./src --ext .vue,.js,.ts
```

`pre-commit` hook 文件作用是：当执行 `git commit -m "xxx"` 时，会先对 `src` 目录下所有的 `.vue`、`.js`、`.ts`文件执行 `eslint --fix` 命令，如果 ESLint 通过，成功 `commit`，否则终止 `commit`。

但是又存在一个问题：有时候明明只改动了一两个文件，却要对所有的文件执行 `eslint --fix`。

假如这是一个历史项目，在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，可能会造成大量文件出现 ESLint 错误，显然这不是我们想要的结果。

所以只需要用 ESLint 修复此次写的代码，而不去影响其他的代码，此时需要借助 **lint-staged** 工具。

**配置lint-staged**

lint-staged 一般结合 husky 来使用，它可以让 husky 的 `hook` 触发的命令只作用于 `git` 暂存区的文件，而不会影响到其他文件。

```bash
yarn add lint-staged -D
```

在 `package.json` 里增加 `lint-staged` 配置项：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "prettier --write",
      "eslint --fix",
    ],
    "*.{html,vue,vss,sass,less}": [
      "prettier --write",
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  },
}
```

修改 `.husky/pre-commit` 文件触发命令为：

```bash
npx lint-staged
```

经过以上配置之后，就可以在每次提交之前对所有代码进行格式化，保证线上代码的规范性。

## 提交规范

多人协作项目中，在提交代码环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况。

如果 `git commit` 的描述信息精准，在后期维护和 Bug 处理时会变得有据可查，项目开发周期内还可以根据规范的提交信息快速生成开发日志，从而方便我们追踪项目和把控进度。

社区最流行、最知名、最受认可的 [Angular](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fangular) 团队提交规范：

参考链接： [Angular Style Commit Message Conventions](https://link.juejin.cn/?target=https%3A%2F%2Fgist.github.com%2Fstephenparish%2F9941e89d80e2bc58a153)

### Commit Message 格式规范

`commit message` 由 Header、Body、Footer 组成。

```html
<Header>

<Body>

<Footer>
```

#### Header

Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）。

```css
<type>(<scope>): <subject>
```

* **type**

  type 用于说明 commit 的提交类型（必须是以下几种之一）。

  | 值       | 描述                                                         |
  | -------- | ------------------------------------------------------------ |
  | feat     | 新增功能                                                     |
  | fix      | 修复问题                                                     |
  | docs     | 文档变更                                                     |
  | style    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
  | refactor | 代码重构                                                     |
  | perf     | 改善性能                                                     |
  | test     | 测试                                                         |
  | build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
  | ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
  | chore    | 变更构建流程或辅助工具                                       |
  | revert   | 代码回退                                                     |

* **scope**

  scope 用于指定本次 commit 影响的范围。

  scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。

* **subject**

  subject 是本次 commit 的简洁描述，长度约定在 50 个字符以内，通常遵循以下几个规范：

  * 用动词开头，第一人称现在时表述，例如：change 代替 changed 或 changes
  * 第一个字母小写
  * 结尾不加句号（.）

#### Body

body 是对本次 commit 的详细描述，可以分成多行。

跟 subject 类似，用动词开头，body 应该说明修改的原因和更改前后的行为对比。

#### Footer

如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。

* 突破性的变更

  当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由。

* 关闭缺陷

  如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

#### 参考例子

* feat

  ```
  feat(browser): onUrlChange event (popstate/hashchange/polling)
  
  Added new event to browser:
  - forward popstate event if available
  - forward hashchange event if popstate not available
  - do polling when neither popstate nor hashchange available
  
  Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
  ```

* fix

  ```
  fix(compile): couple of unit tests for IE9
  
  Older IEs serialize html uppercased, but IE9 does not...
  Would be better to expect case insensitive, unfortunately jasmine does
  not allow to user regexps for throw expectations.
  
  Closes #392
  Breaks foo.bar api, foo.baz should be used instead
  ```

* style

  ```
  style(location): add couple of missing semi colons
  ```

* chore

  ```
  chore(release): v3.4.2
  ```

### 集成 cz-git 实现规范提交

> 一款工程性更强，轻量级，高度自定义，标准输出格式的 [commitizen](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcommitizen%2Fcz-cli) 适配器
>
> 官方网站：[cz-git](https://link.juejin.cn/?target=https%3A%2F%2Fcz-git.qbb.sh%2Fzh%2F)

#### 安装依赖

```
npm install -D cz-git
```

#### 指定适配器

修改 `package.json` 文件，添加 `config` 指定使用的适配器

```
{
  "scripts": {},
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

#### 自定义配置（可选）

**cz-git 与 [commitlint](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fcommitlint) 进行联动给予校验信息**，所以可以编写于 [commitlint](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fcommitlint%23config) 配置文件之中。

例如：

```js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {},
  prompt: {
    useEmoji: false,
    emojiAlign: 'center',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
};
```

本项目配置文件可参考：`commitlint.config.js`

### 集成 commitlint 验证规范提交

在“代码规范”章节中提到，尽管制定了规范，但在多人协作的项目中，总有些人依旧我行我素。

因此提交代码这个环节，也增加一个限制：**只让符合 Angular 规范的 commit message 通过**。

此功能需借助 `@commitlint/config-conventional` 和 `@commitlint/cli` 工具来实现

#### 安装

* [`@commitlint/cli`](https://link.juejin.cn/?target=https%3A%2F%2Fcommitlint.js.org) - Commitlint 本体
* [`@commitlint/config-conventional`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fcommitlint) - 通用提交规范

```bash
yarn add @commitlint/cli @commitlint/config-conventional -D
```

#### 配置

在项目根目录创建 `commitlint.config.js` 文件，并填入以下内容：

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

使用 husky 命令在 `.husky` 目录下创建 `commit-msg` 文件，并在此执行验证命令：

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

#### 整个提交流程

* 先执行 `git add .`
* 然后 `git cz`执行cz-git工具
* 根据 `commitlint.config.js`提供的提交规范，选择提交的类型
* 最后 `git push`即可
