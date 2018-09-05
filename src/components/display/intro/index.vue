<template>
    <div :class="isShow?'show':'hide'" v-show="isDisplay" class="content-root">
        <div class="intro">
        {{intro}}
        </div>
    </div>
</template>
<script>
import { dataBase } from "../../../utils/data";
export default {
  name: "intro",
  data() {
    return {
      intro: "",
      isShow: false,
      isDisplay: false
    };
  },
  methods: {
    Hide() {
      this.isShow = false;
      setTimeout(() => {
        this.isDisplay = false;
      }, 100);
    },
    Show() {
      this.isDisplay = true;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
    }
  },
  onLoad() {
    this.intro = dataBase.canteen[this.$root.$mp.query.canteen_ename].intro;
  }
};
</script>
<style lang="scss" scoped>
.intro {
  padding: 0.5rem 0.75rem;
  text-indent: 2em;
  font-size: 0.3rem;
  line-height: 2em;
  color: #666;
  background-color: #fff;
}
.show {
  opacity: 1;
  left: 0;
}
.hide {
  opacity: 0;
  left: -1rem;
}
</style>



