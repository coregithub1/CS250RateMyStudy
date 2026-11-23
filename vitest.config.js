// From google: removes the .specs so playwright doesnt clash with vitest
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      '**/*.spec.js', 
    ],
  },
})