<template>
  <div class="containar">
    <h4>草稿箱({{postDraft.length}})</h4>
    <div
      class="draft"
      v-for="(item,index) in postDraft"
      :key="index"
      @click="handleEditDraft(item)"
    >
      <div class="title">
        {{item.title}}
        <i class="iconfont icon44"></i>
      </div>
      <div class="time">{{item.postTime}}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {};
  },
  computed: {
    postDraft() {
      const newArr = this.$store.state.postdraft.postDraft.map(v => {
        moment(v.postTime).format("llll");
        return v;
      });
      return newArr;
    }
  },
  methods: {
    handleEditDraft(item) {
      this.$emit('handleeditdraft',item)
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
      &:hover {
        color: #ffa500;

        text-decoration: underline;
      }
    }
    .time {
      font-size: 14px;
      color: #999999;
    }
  }
}
</style>