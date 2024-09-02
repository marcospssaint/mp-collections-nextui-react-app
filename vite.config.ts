import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: env.VITE_HOMEPAGE_URL || '/',
    plugins: [react(), commonjs()],
    define: {
      'process.env': env,
    },
  })
}