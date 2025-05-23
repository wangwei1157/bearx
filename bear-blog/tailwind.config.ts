import type { Config } from 'tailwindcss';

export default {
    //定义 Tailwindcss 需要扫描哪些文件 用以 生成CSS类
    content: [
        './index.html' /*扫描src目录下的.js、.ts、.jsx、.tsx 文件；
     如果你用的vue框架，在.{js,ts,jsx,tsx，vue}里面加上vue就行了；
     注意：不要直接 ./，否则会 走到其他路径下 如nodo_modules文件里面*/,
        './src/**/*.{js,ts,jsx,tsx,vue}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config;
