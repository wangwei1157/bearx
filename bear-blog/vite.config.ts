import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(), vueDevTools()],
    css: {
        // 预处理器配置项
        preprocessorOptions: {
            less: {
                math: 'always',
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
