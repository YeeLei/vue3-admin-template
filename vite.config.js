import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  server: {
    open: true,
    host: '0.0.0.0',
    port: 9527,
    proxy: {
      '/dev-api': {
        target: 'https://www.fastmock.site/mock/21de672fe9d25fcefb061ea8ca878037', // 开发环境
        // target: 'https://xxxx', // 测试环境
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.vue', '.js'],
  },
  plugins: [
    vue(),
    vitePluginVueSetupExtend(),
    // 配置svg
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    // 构建后是否生成 source map 文件
    sourcemap: false,
    //  chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
  },
})
