import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react(),
    // process.env.API_KEY를 코드 내에서 사용할 수 있도록 주입
    EnvironmentPlugin(['API_KEY'])
  ],
  base: './', // GitHub Pages 배포를 위한 상대 경로 설정
  build: {
    outDir: 'dist',
  }
});