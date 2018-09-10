<template>
    <div class="nav">
      <div class="nav-list">
        <div @click="OnTabClick" v-for="(item,index) in navList" class="item" :class="currentTab==index?'item-active':'item-deactive'" :key="index" :data-index="index">
            {{item.text}}
        </div>
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
      // console.log(this.currentTab);
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
  background-color: #fff;
  padding: 0 0.4rem;
  .nav-list {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #eee;
  }
  .item {
    font-size: 0.36rem;
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


