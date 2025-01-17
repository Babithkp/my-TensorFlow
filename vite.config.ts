import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import gltf from 'vite-plugin-gltf';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),gltf()],
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.bin'],
})
