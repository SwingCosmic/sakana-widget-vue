<p align="center">
<img src="https://raw.githubusercontent.com/dsrkafuu/sakana-widget/main/src/characters/chisato.png" height="160px">
<img src="https://raw.githubusercontent.com/dsrkafuu/sakana-widget/main/src/characters/takina.png" height="160px">
</p>

# 🐟「Sakana! Widget Vue」

[Origin Repo](https://github.com/dsrkafuu/sakana-widget)

Sakana! Widget for Vue2/3.

Vue组件包装的石蒜模拟器，通过`vue-demi`库实现了同时支持Vue2和Vue3.

## Pre-Requirements

* 如果使用项目使用Vue2，在安装前需要安装`@vue/composition-api`和`vue-demi`作为peerDependencies

* 如果项目使用Vue3，只需要安装`vue-demi`

## Quick Start

> 原始项目存在webpack兼容性问题，打包后的代码在加载时会报module相关的加载问题，目前只能通过源码引用

* Vue2

```typescript
import Vue from "vue";
import SakanaWidget from "@lovekicher/sakana-widget-vue/src/main";
Vue.use(SakanaWidget);
```
* Vue3

```typescript
import { createApp } from "vue";
import SakanaWidget from "@lovekicher/sakana-widget-vue/src/main";
const app = createApp({});
app.use(SakanaWidget);
```

## License

Released under MIT License, please note that the 2 default images **should not be used for any commercial activities**. This project used to be a secondary development based on [sakana-widget](https://github.com/dsrkafuu/sakana-widget).

Image source: 大伏アオ [@blue00f4](https://twitter.com/blue00f4) [pixiv](https://pixiv.me/aoiroblue1340)
