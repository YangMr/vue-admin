<template>
  <!-- 外部图标   -->
  <div
    v-if="isExternal"
    class="svg-external-icon svg-icon"
    :style="styleExternalIcon"
    :class="className"
  ></div>
  <!-- 项目内图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal as external } from "../../utils/validate.js";
export default {
  name: "",
  props: {
    icon: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    //验证是否为外部资源图标
    isExternal() {
      return external(this.icon);
    },
    //加载外部图标地址
    styleExternalIcon() {
      return {
        mask: `url(${this.icon}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.icon}) no-repeat 50% 50%`,
      };
    },
    //加载项目内的图标地址
    iconName() {
      return `#icon-${this.icon}`;
    },
  },
  data() {
    return {};
  },

  components: {},
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
