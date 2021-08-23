import type { Options } from 'tsup'

export const tsup: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
}
