<template>
      <scroll-view scroll-y style="height:100%;" @scrolltoupper="Update">
        <div>
    <div class="root container">
      <div class="top-holder">{{updateText}}</div>
        <div class="card" v-for="(item,index) in canteenInfos" :key="index" :data-ename=item.ename :id="index" @click="NavToCanteen">
          <img class="pic" mode="aspectFill" :src="item.picUrl"/>
          <div class="texts">
            <div class="name">{{item.name}}</div>
            <div :class="item.isOpen?'state-open':'state-close'">{{item.isOpen?"开放中":"已关闭"}}</div>
            <div class="enter"><div>点击查看详情</div></div>
          </div>
        </div>
        <div @click="Update" class="bottom-holder">已经拉到底啦～</div>
        </div>
        </div>
      </scroll-view>
    
</template>
<script>
import { GetSortedCanteenInfos } from "../../utils/index";
import { GetTimeOffsetText, GetFormattedTimeText } from "../../utils/tool";
export default {
  name: "list",
  data() {
    return {
      updateText: "",
      canteenInfos: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    NavToCanteen(e) {
      // console.log(e.currentTarget.id);
      console.log(e.currentTarget.id);
      wx.navigateTo({
        url:
          "/pages/display/main?canteen_ename=" +
          this.canteenInfos[e.currentTarget.id].ename
      });
    },
    Update() {
      this.updateText = "正在更新……";
      setTimeout(() => {
        this.canteenInfos = GetSortedCanteenInfos();
        this.updateText = "更新时间：" + GetFormattedTimeText(new Date(), 1);
        // wx.navigateTo({
        //   url:"/pages/comment/main?data="+JSON.stringify(this.canteenInfos[5])
        // });
      }, 300);
    }
  },
  created() {
    setTimeout(this.Update, 1000);
  }
};
</script>
<style scoped>
.top-holder {
  font-size: 0.3rem;
  color: #999;
}
.root {
  padding: 0.2rem 0;
  display: flex;
  flex-direction: column;
}
.card {
  width: 80%;
  border-radius: 10px;
  box-shadow: 0px 0px 20px -5px #333;
  display: flex;
  flex-direction: row;
  height: 2.4rem;
  margin: 0.3rem 0;
}
.enter {
  text-align: right;
  font-size: 0.3rem;
  width: 100%;
  color: #999;
}
.root div:last-child {
  margin-bottom: 0.6rem;
}
.card .pic {
  display: flex;
  width: 38%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: 1px solid #aaa;
}
.card .texts {
  padding: 0.3rem 0.3rem 0 0.3rem;
  display: flex;
  flex-direction: column;
  width: 55%;
}
.texts .name {
  font-size: 0.5rem;
  color: #666;
}
.texts .state-open {
  font-size: 0.35rem;
  color: green;
  margin: 0.1rem 0 0.15rem 0;
}
.texts .state-close {
  font-size: 0.35rem;
  color: firebrick;
  margin: 0.1rem 0 0.15rem 0;
}
.bottom-holder {
  font-size: 0.3rem;
  color: #999;
}
</style>
