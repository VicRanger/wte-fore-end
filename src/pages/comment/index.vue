<template>
  <div class="root">
    <img mode="aspectFill" class="image" :src="data.picAdd" />
    <div class="name"><span>{{data.name}}</span></div>
    <div class="cmt-bar" @click="ToggleSmt"><span>所有评论({{commentList.length}})</span></div>
    <comment-list :commentList="commentList"></comment-list>
    <div class="cmt-smt">
      <div class="cmt-smt-box">
        <button @click="onSubmitComment" class="cmt-smt-btn" :class="{'cmt-smt-btn-hide':smtHide}">{{cmtSmtBtn}}</button>
        <textarea @focus="onSubmitFocus" @blur="onSubmitBlur" v-model="commentValue" maxlength="200" auto-height fixed :placeholder="pHolder" class="cmt-smt-txt" :class="{'cmt-smt-txt-hide':smtHide}" />
      </div>
    </div>
  </div>
</template>
<script>
import commentList from "../../components/comment-list";
import fly from "../../utils/fly.js";
import { GetTimeOffsetText, GetFormattedTimeText } from "../../utils/index";
export default {
  name: "comment",
  data() {
    return {
      cmtSmtBtn: "发表评论",
      smtHide: true,
      pHolder: "",
      cmtSmtHideClock: {},
      message: "",
      data: {},
      commentValue: "",
      commentList: [
        {
          user_nickname: "Loading",
          user_avatar_url: "",
          comment_text: "Loading",
          up_count: "Loading",
          time: ""
        }
      ]
    };
  },
  components:{
    commentList:commentList,
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
        }, 600);
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
      }
      fly
        .post("comment/", {
          user_openid: userID.openid,
          canteen_ename: this.data.ename,
          comment_text: this.commentValue
        })
        .then(res => {
          if (!("error" in res)) {
            addTimeText(res.data);
            this.commentList.splice(0, 0, res.data);
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
  computed: {
    
  },
  created() {
    // console.log("comment created");
  },
  onLoad(res) {
    getComments(this);
  }
};
function getComments(vue) {
  let loginStatus = wx.getStorageSync("loginStatus") || {};
  if (loginStatus && loginStatus.status == 0) {
    console.log("用户未登录");
    return;
  }
  let userID = wx.getStorageSync("userID") || {};
  vue.data = JSON.parse(vue.$root.$mp.query.data);
  // console.log(this.data);
  fly
    .get("comment_list/", {
      canteen_ename: vue.data.ename,
      user_openid: userID.openid
    })
    .then(res => {
      console.log(res);
      vue.commentList = [];
      for (var i = 0; i < res.data.length; i++) {
        addTimeText(res.data[i]);
        vue.commentList.splice(0, 0, res.data[i]);
      }
      var compare = function (x,y){
        if(x.up_count>y.up_count){
          return -1;
        }else if(x.up_count<y.up_count){
          return 1;
        }else{
          return 0;
        }
      }
      vue.commentList.sort(compare);
    })
    .catch(err => {
      console.log(err);
      vue.commentList = [];
    });
}
function setSmtHideTimeout(vue, time = 3500) {
  vue.cmtSmtHideClock = setTimeout(() => {
    vue.smtHide = true;
    vue.cmtSmtBtn = "发表评论";
    vue.commentValue = "";
    vue.pHolder = "";
  }, time);
}
function addTimeText(obj) {
  let strs = obj.add_time.split(" ");
  strs[1] = strs[1].replace(/-/g, ":");
  obj.add_time_text = GetTimeOffsetText(new Date(strs));
}
</script>
<style scoped>
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
  font-size: 0.4rem;
  line-height: 0.5rem;
  height: 0.7rem;
  padding: 0.1rem 0.2rem;
  width: 2.1rem;
  background-color: #fff;
  color: rgb(238, 136, 53);
  border: 1px solid rgb(238, 136, 53);
}


.cmt-bar {
  border-left: 5px solid rgb(238, 136, 53);
  padding: 8px 0 8px 10px;
  text-align: left;
  font-size: 0.4rem;
  /* border-bottom:2px solid #ccc; */
  box-shadow: 0px 2px 2px -1px #ccc;
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
  height: 4rem;
}
.name {
  padding: 10px 0;
  font-size: 0.5rem;
  width: 100%;
  text-align: center;
  color: rgb(238, 136, 53);
  box-shadow: 0 0px 8px 0px #ccc;
}
</style>

