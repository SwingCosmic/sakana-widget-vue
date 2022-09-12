
import { install,SakanaWidget } from "./components";

import { createApp } from "vue3";
import Vue2 from "vue";
import { isVue3, h } from "vue-demi";

const appComponent = {
    render() {
        return h("div", [
            h(SakanaWidget, {

            })
        ]) as any;
    }
}

if (isVue3) {
    console.log("current is Vue3");
    const app = createApp(appComponent);
    app.use(install);
    app.mount("#sakana-widget-chisato")
} else {
    console.log("current is Vue2");
    Vue2.use(install);
    const app = new Vue2(appComponent);
    app.$mount("#sakana-widget-chisato");
}
