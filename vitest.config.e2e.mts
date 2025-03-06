import { configDefaults, defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import swc from 'unplugin-swc'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    exclude: [...configDefaults.exclude, '**/data/**'],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
