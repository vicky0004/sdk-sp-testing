import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  external: [''],
  entry: ['index.ts', 'minikit-provider.ts'],
  define: { 'process.env.NODE_ENV': '"production"' },
});