<template>
  <div class="container">
    <el-row type="flex" justify="start">
      <router-link :to="`/hotel/hotelDetail/?id=${data.id}`">
          <div class="hodel_img">
        <img :src="data.photos" alt />
      </div>
      </router-link>
      <div class="hodel_detail">
        <router-link :to="`/hotel/hotelDetail/?id=${data.id}`">
            <div class="hodel_title">{{data.name}}</div>
        </router-link>
        <el-row type="flex" justify="space-between">
          <div class="content_left">
            <span>{{data.alias}}</span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <em>{{data.hoteltype.name}}</em>
            <div class="left_evaluate">
              <el-row type="flex" justify="start">
                <el-rate
                  v-model="data.stars"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <i>分</i>
                <span>
                  <i>{{data.all_remarks}}</i>  条评价
                </span>
                <span>
                  <i>65</i>  篇游记
                </span>
              </el-row>
            </div>
            <div class="left_site">
                <i class="iconfont icondingwei"></i>位于: {{data.address}}
            </div>
          </div>
          <div class="content_right_detail">
           <router-link to="https://hotels.ctrip.com/">
                <div class="content_right" v-for="(item,index) in data.products" :key="index">
              <el-row type="flex" justify="space-between">
                <span>{{item.name}}</span>
                <span>
                  <em>￥{{item.price}}  </em>起
                  <i class="iconfont iconjiantou"></i>
                </span>
              </el-row>
            </div>
           </router-link>
            
          </div>
        </el-row>
      </div>
    </el-row>
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
  data() {
    return {
      evaluate: 3.5
    };
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dddddd;
  .hodel_img {
    width: 320px;
    height: 210px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .hodel_detail {
    margin-left: 20px;
    .hodel_title {
      font-size: 24px;
    }
    .content_left {
      width: 400px;
      color: #9999a6;
      font-size: 14px;
      >i{
          color: #ff9900;
      }
      .left_evaluate {
        margin: 10px 0;
        span{
            margin: 0 20px;
            color: #000000;
        }
        i{
            color: #ff9900;
        }
      }
      .left_site{
          color: #666666;
          font-size: 12px;
      }
    }
    .content_right_detail {
      margin-top: -10px;
      font-size: 14px;
      color: #606266;
      .content_right {
        width: 180px;
        padding: 12px 5px;
        border-bottom: 1px solid #ddd;
        &:hover{
            background: #f5f7fa;
        }
        em{
            color: #ff9900;
        }
      }
    }
  }
}
</style>