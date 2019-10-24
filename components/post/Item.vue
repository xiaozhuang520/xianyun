<template>
  <div class="containar">
      <Item :data="data.parent" v-if="data.parent" @handlehuifu="handlehuifu"/>
    <el-row class="user" type="flex" justify="space-between">
      <div class="user_info">
        <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt="">
        <span>{{data.account.nickname}}</span>
        <i>{{data.created_at}}</i>
      </div>
      <em>{{data.level}}</em>
    </el-row>
    <div class="content">
      <p>{{data.content}}</p>
      <el-row type="flex" justify="start">
        <div class="content_img" v-for="(item,index) in data.pics" v-if="data.pics">
          <img :src="$axios.defaults.baseURL+item.url" alt />
           
        </div>
      </el-row>
      <span class="reply" @click="handlehuifu(data)">回复</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name:'Item',
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    mounted(){
          this.data.created_at=moment(this.data.created_at).format('YYYY-MM-DD HH:mm:ss')

    },
    methods:{
        handlehuifu(item){
            this.$emit('handlehuifu',item)
        }
    }

};
</script>

<style scoped lang="less">
.containar {
  padding: 10px 15px;
  background: #f9f9f9;
  border: 1px solid #dddddd;
  border-radius: 5px;
  .user {
    margin-bottom: 10px;
    margin-top: 5px;
    font-size: 13px;
    .user_info{
      img{
        width: 15px;;
        height: 15px;
        border-radius: 50%;
      }
    }
    span {
      color: #666666;
    }
    i {
      color: #999;
    }
  }
  .content {
      position: relative;
    width: 100%;
    p {
      margin-bottom: 10px;
    }
    .content_img {
      padding: 5px;
      width: 80px;
      height: 80px;
      border: 1px dashed #dddddd;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span{
          position: absolute;
          display: none;
          right: 0;
          bottom: 0;
          font-size: 14px;
      
        }
        &:hover span{
          display: block;
          color: #ffa500;
          cursor: pointer;
        }
  }
}
</style>