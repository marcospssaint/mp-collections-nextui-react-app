import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: env.VITE_HOMEPAGE_URL || '/',
    plugins: [react()],
    define: {
      'process.env': env,
    },
  })
}