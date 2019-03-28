/**
 * created by andy-shang at 2019-03-28
 */
import vueClassify from "./vue-classify.vue"; // 导入组件

vueClassify.install = function(Vue) {
  Vue.component("v-classify", vueClassify);
  if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(vueClassify);
  }
};

export default vueClassify;
