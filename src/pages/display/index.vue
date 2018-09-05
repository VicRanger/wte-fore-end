<template>
  <div class="root">
    <div>
      <img mode="aspectFill" class="image" :src="canteen.picUrl" />
      <div class="scroll-box">
        
          <div class="canteen-name">{{canteen.name}}</div>
          
        <display-nav @OnTabChange="OnTabChange"/>
        <div class="content-box">
          <intro ref="introRef"/>
          <comment ref="commentRef" />
          <item ref="itemRef"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fly from "../../utils/fly.js";
import comment from "../../components/display/comment";
import displayNav from "../../components/display/nav";
import intro from "../../components/display/intro";
import item from "../../components/display/item";
import { GetTimeOffsetText, GetFormattedTimeText } from "../../utils/tool";
import { Obj2style, addTimeText } from "../../utils/tool";
export default {
  name: "display",
  data() {
    return {
      curTab: 0,
      canteen: {},
      navTop: 0,
      navFullTop: 0,
      refOrder: ["introRef", "commentRef", "itemRef"]
    };
  },
  components: {
    comment: comment,
    displayNav: displayNav,
    intro: intro,
    item: item
  },
  methods: {
    OnTabChange(index) {
      this.$refs[this.refOrder[this.curTab]].Hide();
      this.$refs[this.refOrder[(this.curTab = index)]].Show();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs[this.refOrder[this.curTab]].Hide();
      setTimeout(() => {
        this.$refs[this.refOrder[this.curTab]].Show();
      }, 100);
      this.$refs.commentRef.GetComments();
    });
  },
  onLoad() {
    OnLoadFunc(this);
  },
  onUnload() {},
  onPageScroll() {}
};
function OnLoadFunc(vue) {
  let dataBase = wx.getStorageSync("dataBase") || {};
  // console.log(dataBase);
  if (dataBase) {
    vue.canteen = dataBase.data.canteen[vue.$root.$mp.query.canteen_ename];
  }
}
</script>
<style scoped>
.content-box {
  position: relative;
  background-color: #fff;
}
.scroll-box {
  position: relative;
  top: 3.4rem;
  width: 100%;
}
.root {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #333;
}
.image {
  width: 100%;
  height: 4.5rem;
  position: fixed;
  z-index: -999;
}
.canteen-name {
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
  padding: 0.2rem 0 0.3rem 0;
  font-size: 0.4rem;
  /* font-weight: 500; */
  width: 100%;
  text-align: center;
  color: rgb(238, 136, 53);
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1));
}
</style>

