<template>
    <div class="cmt-smt">
      <div class="cmt-smt-box">
        <button @click="onSubmitComment" class="cmt-smt-btn" :class="{'cmt-smt-btn-hide':smtHide}">{{cmtSmtBtn}}</button>
        <textarea @focus="onSubmitFocus" @blur="onSubmitBlur" v-model="commentValue" maxlength="200" auto-height fixed :placeholder="pHolder" class="cmt-smt-txt" :class="{'cmt-smt-txt-hide':smtHide}" />
      </div>
    </div>
</template>
<script>
import fly from "../../../utils/fly.js";
import {addTimeText} from "../../../utils/tool.js";
export default {
  name: "comment-smt",
  data(){
      return {
          cmtSmtBtn: "发表评论",
          smtHide: true,
          pHolder: "",
          cmtSmtHideClock: {},
          commentValue: "",
      }
  },
  methods: {
    onSubmitFocus() {
      clearTimeout(this.cmtSmtHideClock);
    },
    onSubmitBlur() {
      setSmtHideTimeout(this);
    },
    onSubmitComment() {
      if (this.smtHide) {
        this.smtHide = false;
        this.cmtSmtBtn = "发表";
        setTimeout(() => {
          this.pHolder = "发表一下你的看法吧";
        }, 800);
        // setSmtHideTimeout(this);
        return;
      }
      let loginStatus = wx.getStorageSync("loginStatus") || {};
      if (loginStatus && loginStatus.status == 0) {
        console.log("用户未登录");
        return;
      }
      console.log(this.commentValue);
      if (this.commentValue.length <= 0) {
        console.log("评论太短啦");
        return;
      }
      let userID = wx.getStorageSync("userID") || {};
      let userInfo = wx.getStorageSync("userInfo") || {};
      if (
        Object.keys(userID).length <= 0 ||
        Object.keys(userInfo).length <= 0
      ) {
        console.log("未获取到用户本地信息");
        return;
      }
      fly
        .post("comment/", {
          user_openid: userID.openid,
          canteen_ename: this.$root.$mp.query.canteen_ename,
          comment_text: this.commentValue
        })
        .then(res => {
          if (!("error" in res)) {
            addTimeText(res.data);
            // this.commentList.splice(0, 0, res.data);
            this.$parent.AddComment(res.data);
            setSmtHideTimeout(this, 100);
            console.log("评论已发表：");
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
function setSmtHideTimeout(vue, time = 3500) {
  vue.cmtSmtHideClock = setTimeout(() => {
    vue.smtHide = true;
    vue.cmtSmtBtn = "发表评论";
    vue.commentValue = "";
    vue.pHolder = "";
  }, time);
}
</script>
<style lang="scss" scoped>
.cmt-smt {
  position: fixed;
  bottom: 0.5rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.cmt-smt-box {
  display: flex;
  flex-direction: row-reverse;
  width: 95%;
}
.cmt-smt-txt {
  background: #fff;
  box-shadow: 0 0 20px -3px #999;
  border-radius: 8px;
  padding: 0.2rem 0.2rem;
  width: 4.5rem;
  margin: 0 0 0 0.2rem;
  transition: all 0.3s ease;
  align-self: flex-end;
}
.cmt-smt-txt-hide {
  padding: 0.1rem 0;
  width: 0;
}
.cmt-smt-btn {
  font-size: 0.4rem;
  font-weight: normal;
  line-height: 0.4rem;
  height: 0.8rem;
  width: 1.4rem;
  padding: 0.2rem 0.2rem;
  margin: 0 0.2rem;
  box-shadow: 0 0 20px -3px #999;
  background-color: rgb(238, 136, 53);
  color: #fff;
  transition: all 0.3s ease;
}
.cmt-smt-btn-hide {
  font-size: 0.36rem;
  line-height: 0.4rem;
  height: 0.7rem;
  padding: 0.1rem 0.2rem;
  width: 2.1rem;
  background-color: #fff;
  color: rgb(238, 136, 53);
  border: 1px solid rgb(238, 136, 53);
}
</style>