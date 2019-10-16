# Vue轮子

[![Build Status](https://www.travis-ci.org/xzfd1010/nick-vue-wheels.svg?branch=master)](https://www.travis-ci.org/xzfd1010/nick-vue-wheels)

## 介绍
这是我在学习Vue过程中做的一个UI框架，希望对你有用

## 开始使用

1. 安装
    使用本框架前，请在CSS中开启border-box
    ```css
    *, *::before, *::after{
      box-sizing: border-box;
    }
    ```
    IE 8 及以上浏览器都支持次样式
    
    你还需要设置默认颜色等变量，后续会改为scss变量
    ```css
    html {
          --button-height: 32px;
          --font-size: 14px;
          --button-bg: #fff;
          --button-active-bg: #eee;
          --border-radius: 4px;
          --color: #333;
          --border-color: #999;
          --border-color-hover: #666;
        }
    ```
    IE 15 及以上浏览器支持此样式
2. 安装框架
   ```
   npm i --save nick-vue-wheels
   ```
3. 引入框架
    ```javascript
    import { Button } from 'nick-vue-wheels'
    import 'nick-vue-wheels/dist/index.css'
    
    export default {
      name: 'app',
      components: {
      'my-button': Button
      }
    }
    ```

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码

