import { install as _install } from 'vue-demi'
import SakanaWidget from "./SakanaWidget";

interface VueStatic {
    component(name: string, component: any): any;
}

_install();

function install(vue: VueStatic) {
    vue.component(SakanaWidget.name, SakanaWidget);
}

export {
    install,
    SakanaWidget
};