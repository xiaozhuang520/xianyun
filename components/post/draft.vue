<template>
  <div class="containar">
    <h4>草稿箱({{postDraft.length}})</h4>
    <div class="draft" v-for="(item,index) in postDraft" :key="index">
      <el-row type="flex" justify="space-between">
        <div class="title" @click="handleEditDraft(item,index)">
          {{item.title}}
          <i class="iconfont icon44"></i>
        </div>
        <span @click="handleDelete(index)">移除</span>
      </el-row>
      <div class="time">{{item.postTime}}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      postDraft: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.postDraft = this.$store.state.postdraft.postDraft;
    }, 20);
  },
  methods: {
    handleEditDraft(item,index) {
      this.$emit("handleeditdraft", item,index);
    },
    // 删除草稿
    handleDelete(index) {
      this.$store.commit("postdraft/deletePostDraft", index);
      this.$message.success("移除成功");
    }
  }
};
</script>

<style scoped lang="less">
.containar {
  width: 180px;
  padding: 10px;
  border: 1px solid #dddddd;
  overflow: hidden;
  h4 {
    font-weight: normal;
  }
  .draft {
    margin: 10px 0;
    .title {
      width: 130px;
      overflow: hidden;
      &:hover {
        color: #ffa500;

        text-decoration: underline;
      }
    }
    .time {
      font-size: 14px;
      color: #999999;
    }
    span {
      display: inline-block;
      width: 30px;
      height: 20px;
      border-radius: 5px;
      line-height: 20px;
      background: red;
      text-align: center;
      font-size: 12px;
      color: #ffffff;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>