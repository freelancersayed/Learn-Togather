// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // এটি Vite সার্ভারকে সব নেটওয়ার্ক ইন্টারফেসে শোনার জন্য বলে
    port: 5173, // পোর্ট নাম্বার (আপনার প্রজেক্টে ব্যবহৃত পোর্ট)
  }
})