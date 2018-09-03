<template>
    <div :class="isShow?'show':'hide'" v-show="isDisplay" class="content-root">
        <div class="root">
        暂无
        </div>
    </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      isShow: false,
      isDisplay: false,
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
  }
};
</script>
<style lang="scss" scoped>
.root{
    padding: 0.5rem;
    text-indent: 2em;
    font-size:0.35rem;
    line-height: 2em;
    color:#666;
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



