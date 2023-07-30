/**
 * 2023/03/09 テストランナーの実行からストーリーを除外するデコレーターを実装する
 *            https://github.com/storybookjs/test-runner/issues/74#issuecomment-1165389157
 */

const { getJestConfig } = require('@storybook/test-runner');

// The default configuration comes from @storybook/test-runner
const defaultConfig = getJestConfig()

module.exports = {
  ...defaultConfig,
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
  testEnvironmentOptions: {
    'jest-playwright': {
      ...defaultConfig['jest-playwright'],
      contextOptions: {
        userAgent: 'Storybook Test Runner',
      }
    }
  }
}