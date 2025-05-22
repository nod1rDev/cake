import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
=======
// https://vite.dev/config/
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
=======
      '/api': 'hhtp://localhost:5000'
    }
  }
})
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
