<template>
  <div class="nav-block">
    <div class="slide-bar" :style="BarStyle"></div>
    <div class="nav">
        <div @click="ChangeTab" :class="currentTab==index?'nav-item-active':'nav-item'" :data-index="index" v-for="(item,index) in navList" :key="index">
            {{item.text}}
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "slider-nav",
  data() {
    return {
      navList: [
        { text: "吃什么呢" },
        { text: "随便逛逛" },
        { text: "我的信息" }
      ]
    };
  },
  props: {
    currentTab: {
      type: Number,
      default: 0
    },
    winWidth:{
        type:Number,
        default:320
    },
    barWidth: {
      type: Number,
      default: 100
    }
  },
  methods: {
    ChangeTab(e) {
      let index = e.target.dataset.index;
      if (index == this.currentTab) return;
      this.$emit("update:currentTab", index);
      // console.log(e);
    }
  },
  computed: {
    BarStyle() {
      let tabWidth = this.winWidth / this.navList.length;
      var style = {
        left:
          tabWidth * this.currentTab +
          tabWidth / 2 -
          this.barWidth / 2 +
          "px",
        width: this.barWidth + "px"
      };
      return obj2style(style);
    }
  }
};
var obj2style = style => {
  let str = [];
  Object.keys(style).forEach(key => {
    str.push(`${key}:${style[key]};`);
  });
  return str.join(";");
};
</script>
<style scoped>
.nav-block{
  box-shadow: 0px -10px 30px -15px #666;
  height: 60px;
}
.slide-bar {
  position: relative;
  left: 0;
  top: 10px;
  height: 6px;
  background-color: rgb(238, 136, 53);
  transition: all 0.3s ease;  
  border-radius: 3px;
}
.nav {
  z-index: 99;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.nav div {
  height: 50px;
  text-align: center;
  width: 100%;
  transition: all 0.5s ease;
  line-height: 50px;
}
.nav .nav-item-active {
  /* border-top:5px solid #fff;
    border-left:0px solid rgb(255, 169, 10);
    border-right:0px solid rgb(255, 169, 10);
    border-bottom:0px solid rgb(255, 169, 10); */
  color: rgb(238, 136, 53);
  background-color: #fff;
  padding-top: 5px;
}
.nav .nav-item {
  /* border:0px solid rgb(214, 96, 0); */
  color: #999;
  background-color: #fff;
  padding-top: 5px;
}
</style>
