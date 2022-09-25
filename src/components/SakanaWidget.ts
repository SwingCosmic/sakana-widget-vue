import { 
  defineComponent, 
  h, 
  nextTick,
  watch,
  computed,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  PropType
} from "vue-demi";
import SakanaWidgetStandalone, { SakanaWidgetOptions, SakanaWidgetState, defaultOptions } from "../index";
import {pick, cloneDeep} from "lodash";

// import type { Prop } from "vue3";
type Prop<T> = PropType<T>;

const optionKeys: (keyof SakanaWidgetOptions)[] = [
  "autoFit", "character", "controls", "rotate", "size", "stroke", "threshold"
];

type SakanaWidgetOptionProps = {
  [P in  keyof SakanaWidgetOptions]: Prop<SakanaWidgetOptions[P]>;
}

const optionProps = optionKeys.reduce<SakanaWidgetOptionProps>((s: any, v) => {
  let defaultValue = defaultOptions[v]
  if (typeof defaultValue === "number") {
    s[v] = {
      type: Number,
      default: defaultValue
    };
  } else if (typeof defaultValue === "string") {
    s[v] = {
      type: String,
      default: defaultValue
    };
  } else if (typeof defaultValue === "boolean") {
    s[v] = {
      type: Boolean,
      default: defaultValue
    };
  } else {
    s[v] = {
      type: Object,
      default: () => cloneDeep(defaultValue) 
    };
  }
  return s;
}, {});

interface AllProps extends Required<SakanaWidgetOptions> { 
  state: SakanaWidgetState;
}

export default defineComponent({
  name: "SakanaWidget",
  props: {
    ...optionProps,
    state: {
      type: Object,
      default: () => ({})
    }
  } as any,
  setup(props: AllProps & Record<string, any>) {
    // 创建一个和渲染函数中ref同名的ref
    const root = shallowRef<HTMLElement>();
    const instance = shallowRef<SakanaWidgetStandalone>();

    const options = computed<SakanaWidgetOptions>(() => pick(props, optionKeys) as any);

    /**
     * 初始化组件
     * @returns SakanaWidget实例
     */
    function initWidget() {
      const i = new SakanaWidgetStandalone(options.value);
      if (!root.value) {
        throw new ReferenceError("Cannot render SakanaWidget before component mounted");
      }
      // 清除所有子元素并创建新的挂载元素，该元素稍后将被替换
      root.value.innerHTML = '<div class="__mount_root__" style="height:100%;width:100%"></div>';
      i.mount(root.value.firstElementChild as HTMLElement);
      return i;
    }

    function destroyWidget() {
      instance.value?.unmount();
    }

    /**
     * 更新组件
     * @param prop 发生变化的属性名
     * @param immutable 是否为创建实例后不可变的属性，如果为true，需要销毁并重新创建组件
     */
    function updateWidget(prop: keyof AllProps | "all", immutable = false) {
      if (!instance.value) {
        instance.value = initWidget();
      }
      if (!immutable) {
        if (prop == "character") {
          instance.value.setCharacter(props.character);
        } else if (prop == "state") {
          instance.value.setState(props.state);
        }
      } else {
        destroyWidget();
        instance.value = initWidget();
        instance.value.setState(props.state);
      }
    }

    const wachers = [
      watch(options, (newValue, oldValue) => {
        if (newValue.character != oldValue.character) {
          updateWidget("character", false);
        } else {
          updateWidget("all", true);
        }
      }, { deep: true }),
      watch(props.state, () => updateWidget("state"), { deep: true })
    ];

    onMounted(() => updateWidget("state"));
    onBeforeUnmount(() => {
      destroyWidget();
      for (const w of wachers) w();
    });

    return {
      root,
      options,
      instance
    };
  },
  render() {
    return h("div", 
      {
        ref: "root",
        class: "sakana-widget-component"
      }, 
    );
  }
}) as any;