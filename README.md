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

## Install

`npm install @lovekicher/sakana-widget-vue` 

或

`yarn add @lovekicher/sakana-widget-vue`

* Vue2

```typescript
import Vue from "vue";
import SakanaWidget from "@lovekicher/sakana-widget-vue";
Vue.use(SakanaWidget);
```
* Vue3

```typescript
import { createApp } from "vue";
import SakanaWidget from "@lovekicher/sakana-widget-vue";
const app = createApp({});
app.use(SakanaWidget);
```

## Usage

### Quick Start

创建一个没有控制栏，并初始化为泷奈的组件

```html
<SakanaWidget :controls="false" character="takina"/>
```
### Props

原有的`option`均作为组件prop传入，且支持响应式。
如果选项不支持动态修改，会销毁实例并自动重建。

支持的选项：

* `autoFit`
* `character`
* `controls`
* `rotate`
* `size`
* `stroke`
* `threshold`

`state`也作为prop传入并在修改时自动调用`setState`



### 关于autoFit的限制

✅ 无需要求父级DOM容器是一个BFC，内部已经提供了一个容器进行组件挂载
## License

Released under MIT License, please note that the 2 default images **should not be used for any commercial activities**. This project used to be a secondary development based on [sakana-widget](https://github.com/dsrkafuu/sakana-widget).

Image source: 大伏アオ [@blue00f4](https://twitter.com/blue00f4) [pixiv](https://pixiv.me/aoiroblue1340)
