<template>
  <div>
    <div class="detail" v-if="data.images.length>=1 && data.images.length<3">
      <el-row type="flex" justify="space-between">
        <div class="detail_img">
          <router-link :to="`post/detail?id=${data.id}`">
            <img :src="item" alt v-for="(item,index) in data.images" :key="index" />
          </router-link>
        </div>
        <div class="scenic_detail">
          <router-link :to="`post/detail?id=${data.id}`">
            <h3 :title="data.title">{{data.title}}</h3>
            <p>{{data.summary}}</p>
          </router-link>
          <div class="user_info">
            <i class="iconfont icondingwei">{{data.cityName}} by</i>
            <router-link :to="`/user/personal`">
              <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
              <span>{{data.account.nickname}}</span>
            </router-link>
            <i class="iconfont icon29">{{data.watch}}</i>

            <em>{{data.like===null?0:data.like}} 赞</em>
          </div>
        </div>
      </el-row>
    </div>
    <div class="detail_more" v-if="data.images.length>=3">
      <router-link :to="`post/detail?id=${data.id}`">
        <h3 :title="data.title">{{data.title}}</h3>
        <p>{{data.summary}}</p>
        <el-row type="flex" justify="space-between">
          <img :src="item" alt v-for="(item,index) in data.images" :key="index" />
        </el-row>
      </router-link>
      <div class="user_info">
        <i class="iconfont icondingwei">{{data.cityName}} by</i>
        <router-link :to="`/user/personal`">
          <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
          <span>{{data.account.nickname}}</span>
        </router-link>
        <i class="iconfont icon29">{{data.watch}}</i>

        <em>{{data.like===null?0:data.like}} 赞</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {}
};
</script>

<style scoped lang='less'>
.detail {
  padding: 25px 0;
  border-bottom: 1px solid #eeeeee;
  .detail_img {
    width: 220px;
    height: 150px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 150px;
    }
  }
  .scenic_detail {
    width: 470px;
    h3 {
      font-weight: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      &:hover {
        color: #ffad52;
      }
    }
    p {
      margin-top: 20px;
      height: 60px;
      font-size: 14px;
      color: #666666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .user_info {
      margin-top: 20px;
      font-size: 12px;
      i {
        font-size: 12px;
        color: #999999;
      }
      span {
        color: #ffad52;
      }
      img {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        vertical-align: middle;
      }
      em {
        float: right;
        font-size: 18px;
        color: #ffad52;
      }
    }
  }
}
.detail_more {
  margin: 20px 0;
  border-bottom: 1px solid #eeeeee;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  h3 {
    font-weight: normal;
    margin-bottom: 20px;
    &:hover {
      color: #ffad52;
    }
  }
  p {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666666;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  img {
    width: 33%;
    height: 150px;
  }
  .user_info {
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 12px;
    i {
      font-size: 12px;
      color: #999999;
    }
    span {
      color: #ffad52;
    }
    img {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      vertical-align: middle;
    }
    em {
      float: right;
      font-size: 18px;
      color: #ffad52;
    }
  }
}
</style>