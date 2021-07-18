import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import Icons from 'vite-plugin-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), Icons()],
})
