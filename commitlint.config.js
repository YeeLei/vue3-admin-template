/**
 * feat：新增功能
 * fix：修复缺陷
 * docs：文档更新
 * style：不影响程序逻辑的代码修改（修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑）
 * refactor：代码重构
 * perf：性能提升
 * test：测试相关
 * build：构建相关
 * ci：持续集成
 * chore：不属于以上类型的其他类型，比如构建流程, 依赖管理
 * revert：回退代码
 */
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [0, 'never'],
    'footer-leading-blank': [0, 'never'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'perf', 'style', 'docs', 'test', 'refactor', 'build', 'ci', 'chore', 'revert', 'release'],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能' },
      { value: 'fix', name: 'fix:      修复缺陷' },
      { value: 'docs', name: 'docs:     文档更新' },
      { value: 'style', name: 'style:    代码格式' },
      { value: 'refactor', name: 'refactor: 代码重构' },
      { value: 'perf', name: 'perf:     性能提升' },
      { value: 'test', name: 'test:     测试相关' },
      { value: 'build', name: 'build:    构建相关' },
      { value: 'ci', name: 'ci:       持续集成' },
      { value: 'revert', name: 'revert:   回退代码' },
      { value: 'chore', name: 'chore:    其他修改' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
  },
}
