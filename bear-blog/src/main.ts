import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import './assets/main.less';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'animate.css';

const app = createApp(App);
// // 假设设计稿宽度为1920px，我们希望100px等于1REM
// const designWidth = 1920;
// const remBase = 100; // 1REM对应的像素值
// const htmlFontSize = (designWidth * (remBase / 100)) / window.innerWidth || 100; // 初始值设为100px，防止除以0
// // 在main.js或类似的入口文件中
// document.documentElement.style.fontSize = `${htmlFontSize}px`;
// console.log(htmlFontSize);

// // 监听窗口大小变化，更新字体大小
// window.onresize = function () {
//     const newFontSize = (designWidth * (remBase / 100)) / window.innerWidth || 100;

//     console.log(newFontSize);
    
//     document.documentElement.style.fontSize = `${newFontSize}px`;
// };
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount('#app');
