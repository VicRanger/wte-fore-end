<template>
    <div :class="isShow?'show':'hide'" v-show="isDisplay" class="content-root">
        <div class="root">
            攻城狮在极速完成中……
        </div>
    </div>
</template>
<script>
export default {
  name: "item",
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
    color: #666;
    display: flex;
    justify-content: center;
    background-color: #fff;
}
.show {
  opacity: 1;
  right: 0;
}
.hide {
  opacity: 0;
  right: -1rem;
}
</style>