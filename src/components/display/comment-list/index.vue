<template>
    <div v-if="HasComment" class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentList" :key="index">
        <div class="cmt-content">
          <div class="cmt-title">
          <div class="cmt-info">
            <img mode="aspectFit" class="avator" :src="item.user_avatar_url" />
            <div>
              <div class="nickname">{{item.user_nickname}}</div>
              <div class="cmt-time">{{item.add_time_text}}</div>
            </div>
          </div>
            <div @click="onCmtUpClick" :id="index" class="cmt-unupped" :class="{'cmt-upped':item.upped}"><span>喜欢 ({{item.up_count}})</span></div>
          </div>
          <div class="cmt-text"><p>{{item.comment_text}}</p></div>
        </div>
        <div class="cmt-iso"></div>
      </div>
      <div class="cmt-end">已经拉到底了～</div>
    </div>
    <div v-else class="cmt-no">暂无评论</div>
</template>
<script>
import fly from "../../../utils/fly.js";
export default {
  name: "comment-list",
  data() {
    return {};
  },
  props: {
    commentList: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onCmtUpClick(e) {
      let id = e.currentTarget.id;
      let commentItem = this.commentList[id];
      let loginStatus = wx.getStorageSync("loginStatus") || {};
      if (loginStatus && loginStatus.status == 0) {
        console.log("用户未登录");
        return;
      }
      // if(this.commentList[id].upped){
      //   console.log("不能重复点赞！");
      //   return;
      // }
      console.log(id + " " + commentItem.pk + " " + loginStatus.pk);
      fly
        .post("comment_up/", {
          user_pk: loginStatus.pk,
          comment_pk: commentItem.pk
        })
        .then(res => {
          console.log(res);
          if (!("error" in res)) {
            this.commentList[id].up_count += res.offset;
            this.commentList[id].upped ^= 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    HasComment() {
      return this.commentList.length > 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.cmt-list {
  margin: 0 0;
  background-color: #fff;
  .cmt-item {
    padding: 0.18rem 0.15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cmt-content {
      width: 96%;
      .cmt-title {
        margin: 0.1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .cmt-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          .avator {
            height: 0.6rem;
            width: 0.6rem;
            border-radius: 100%;
            margin: 0 10px;
            border: 1px solid #ccc;
          }
          .nickname {
            padding: 0.05rem 0;
            font-size: 0.3rem;
          }
          .cmt-time {
            color: #999;
            font-size: 0.2rem;
          }
        }
      }
      .cmt-text {
        padding: 0.2rem;
        font-size: 0.3rem;
        color: #333;
      }
    }
    .cmt-iso {
      width: 95%;
      border-bottom: 1px solid #eee;
    }
  }
}
.cmt-end {
  font-size: 0.3rem;
  color: #666;
  width: 100%;
  padding: 0.3rem 0;
  margin: 0 0 1.2rem 0;
  text-align: center;
}

.cmt-unupped {
  font-size: 0.28rem;
  color: #666;
  transition: all 0.3s ease;
}
.cmt-upped {
  font-weight: 800;
  color: rgb(238, 136, 53);
}
.cmt-no {
  width: 100%;
  font-size: 0.3rem;
  text-align: center;
  padding: 0.3rem 0;
  background-color: #fff;
}
</style>
