<template>
  <div class="conment_item">
    <router-link :to="`/post/detail?id=${data.id}`" >
      <el-row type="flex" justify="space-between">
      <div class="left_img">
        <img :src="data.images[0]" alt />
      </div>
      <div class="right_content">
        <div class="title">
          <p>{{data.title}}</p>
        </div>
        <div class="time_read">
          <span>2019-10-20 4:22</span>
          <i>阅读: {{data.watch===null?0:data.watch}}</i>
        </div>
      </div>
    </el-row>
    </router-link>
  </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    watch:{
      $route(){
        this.$emit('handledetail')
      }
    },
};
</script>

<style scoped lang="less">
.conment_item {
  padding: 20px 0;
  border-bottom: 1px solid #dddddd;
  .left_img {
    width: 100px;
    height: 80px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .right_content {
    width: 170px;
    .title {
        margin-bottom: 12px;
      width: 100%;
      height: 48px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .time_read {
      font-size: 12px;
      color: #9999b3;
    }
  }
}
</style>