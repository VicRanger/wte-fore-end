<template>
    <div class="nav">
        <div @click="OnTabClick" v-for="(item,index) in navList" class="item" :class="currentTab==index?'item-active':'item-deactive'" :key="index" :data-index="index">
            {{item.text}}
        </div>
    </div>
</template>

<script>
export default {
  name: "display-nav",
  data() {
    return {
      navList: [{ text: "简介" }, { text: "评论" }, { text: "菜品" }]
    };
  },
  props: {
    currentTab: {
      type: Number,
      default: 0
    }
  },
  methods: {
    OnTabClick(e) {
      console.log(this.currentTab);
      let index = e.target.dataset.index;
      if (index == this.currentTab) return;
      this.currentTab = index;
      this.$emit("OnTabChange", index);
    }
  }
};
</script>
<style lang="scss" scoped>
$seleted: rgb(238, 136, 53);
$unselected: #ccc;
.nav {
  // position: fixed;
  // padding: 0.2rem 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  .item {
    font-size: 0.42rem;
    margin: 0 0.3rem;
    transition: all 0.3s ease-out;
    padding: 0 0.4rem;
    padding-bottom: 0.1rem;
    border-bottom: 4px solid #fff;
  }
  .item-deactive {
    color: $unselected;
  }
  .item-active {
    color: $seleted;
    border-bottom: 4px solid $seleted;
  }
}
</style>


