<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/hotel">南京酒店</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>好来阁商务宾馆</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <span>{{hotelDetail.name}}</span>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
    </div>
    <p>{{hotelDetail.alias}}</p>
    <p>
      <i class="iconfont icondingwei"></i>
      {{hotelDetail.address}}
    </p>
    <div class="hotel_imgs">
      <el-row type="flex" justify="space-between">
        <div class="left">
          <img :src="url" alt />
        </div>
        <div class="left_disp" style="display:none;">
          <img src="../../assets/images/1.jpg" alt />
          <img src="../../assets/images/2.jpg" alt />
          <img src="../../assets/images/3.jpg" alt />
          <img src="../../assets/images/4.jpg" alt />
          <img src="../../assets/images/5.jpg" alt />
          <img src="../../assets/images/6.jpg" alt />
        </div>

        <div class="right">
          <img :src="item" alt v-for="(item,index) in data" :key="index" @click="handleImg(item)" />
        </div>
      </el-row>
    </div>
    <div class="detail">
      <div class="detail_title">
        <el-row type="flex" justify="space-between">
          <span>价格来源</span>
          <span>低价房型</span>
          <span>最低价格/每晚</span>
        </el-row>
      </div>
      <router-link to="http://hotels.ctrip.com/">
        <div class="detail_content" v-for="(item,index) in hotelDetail.products" :key="index">
          <el-row type="flex" justify="space-between">
            <span>{{item.name}}</span>
            <span>{{item.bestType}}</span>
            <span class="price">
              ￥{{item.price}}
              <em>起</em>
              <i class="iconfont iconjiantou"></i>
            </span>
          </el-row>
        </div>
      </router-link>
    </div>
    <div class="map">
      <!-- 地图的容器 -->
      <el-row type="flex" justify="space-between">
        <div id="container"></div>

        <div class="right">
          <el-tabs type="card" name="1" value="1">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
              style="width:200px; height:90px; overflow:hidden;overflow-y:auto;"
            >
              <P v-for="(data,index) in item.arr" :key="index">{{data.name}}</P>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-row>
    </div>
    <div class="essential">
      <div class="message">
        <el-row type="flex" justify="space-between">
          <div class="message_title">基本信息</div>
          <span>入住时间: 14:00之后</span>
          <span>离店时间: 12:00之前</span>
          <span>{{hotelDetail.creation_time}} / {{hotelDetail.renovat_time}}</span>
          <span>酒店规模: {{hotelDetail.roomCount}}间客房</span>
        </el-row>
      </div>
      <div class="facility">
        <el-row type="flex" justify="start">
          <div class="facility_title1">主要设施</div>
          <span>外币兑换服</span>
          <span>电梯</span>
          <span>洗衣服务</span>
          <span>热水壶</span>
        </el-row>
      </div>
      <div class="facility">
        <el-row type="flex" justify="start">
          <div class="facility_title">停车服务</div>
          <span class="one">-</span>
        </el-row>
      </div>
      <div class="facility">
        <el-row type="flex" justify="start">
          <div class="facility_title">品牌信息</div>
          <span class="one">-</span>
        </el-row>
      </div>
    </div>
    <div class="user_comment">
      <h4>0条真实用户评论</h4>
      <el-row type="flex" justify="start">
        <div class="box">
          <p>总评分：{{(hotelDetail.very_good_remarks + hotelDetail.very_bad_remarks)}}</p>
          <p>好评分：{{hotelDetail.very_good_remarks}}</p>
          <p>差评数：{{hotelDetail.very_bad_remarks}}</p>
        </div>
        <div class="box1">
          <div class="xing">
            <el-rate
              v-model="hotelDetail.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
          <i>分</i>
          <span>推荐</span>
        </div>
        <div class="box2">
          <el-progress
            :width="80"
            :stroke-width="3"
            type="circle"
            :show-text="false"
            :percentage="hotelDetail.scores.environment *10"
            color="#f7ba2a"
          ></el-progress>
          <p class="environment">
            <span>环境</span>
            <span>{{hotelDetail.scores.environment===null?0:hotelDetail.scores.environment}}</span>
          </p>
        </div>
        <div class="box3">
          <el-progress
            :width="80"
            :stroke-width="3"
            type="circle"
            :show-text="false"
            :percentage="hotelDetail.scores.product *10"
            color="#f7ba2a"
          ></el-progress>
          <p class="environment">
            <span>产品</span>
            <span>{{hotelDetail.scores.product===null?0:hotelDetail.scores.product}}</span>
          </p>
        </div>
        <div class="box4">
          <el-progress
            :width="80"
            :stroke-width="3"
            type="circle"
            :show-text="false"
            :percentage="hotelDetail.scores.service *10"
            color="#f7ba2a"
          ></el-progress>
          <p class="environment">
            <span>服务</span>
            <span>{{hotelDetail.scores.service===null?0:hotelDetail.scores.service}}</span>
          </p>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import path from "path";
export default {
  data() {
    return {
      url: "/_nuxt/assets/images/1.jpg",
      data: [
        "/_nuxt/assets/images/1.jpg",
        "/_nuxt/assets/images/2.jpg",
        "/_nuxt/assets/images/3.jpg",
        "/_nuxt/assets/images/4.jpg",
        "/_nuxt/assets/images/5.jpg",
        "/_nuxt/assets/images/6.jpg"
      ],
      tableData: [],

      editableTabsValue: "2",
      editableTabs: [
        {
          title: "风景",
          name: "1",
          arr: [{ name: "没但考虑到" }, { name: "没但考虑到" }]
        },
        {
          title: "交通",
          name: "2"
        }
      ],
      tabIndex: 2,
      hotelDetail: {
        scores: {}
      }
    };
  },
  mounted() {
    //获取酒店详情数据
    this.$axios({
      url: `/hotels?id=${this.$route.query.id}`
    }).then(res => {
      const { data } = res.data;
      this.hotelDetail = data[0];

      console.log(this.hotelDetail);
    });
    // 整个页面加载完毕之后执行
    window.onLoad = () => {
      // 地图对象
      var map = new AMap.Map("container", {
        zoom: 15, //级别
        center: [
          this.hotelDetail.location.longitude,
          this.hotelDetail.location.latitude
        ], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      // 点标记
      var marker1 = new AMap.Marker({
        position: [
          this.hotelDetail.location.longitude,
          this.hotelDetail.location.latitude
        ], //位置
        offset: new AMap.Pixel(-10, -10),
        icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        title: `${this.hotelDetail.name}`
      });
      var markerList = [marker1];
      map.add(markerList); //添加到地图
    };
    // 地图的连接
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=33c8000282564b2965c1984b23b6cb07&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    handleImg(item) {
      this.url = item;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    margin-top: 20px;
    font-size: 24px;
    i {
      color: #ff9900;
    }
    p {
      color: #666666;
      font-size: 12px;
    }
  }
  p {
    font-size: 14px;
  }
  .hotel_imgs {
    margin-top: 40px;
    margin-bottom: 40px;
    .left {
      width: 640px;
      height: 360px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .right {
      margin-left: 30px;
      width: 350px;
      img {
        margin-bottom: 10px;
        margin-right: 10px;
        width: 160px;
        height: 110px;
      }
    }
  }
  .map {
    margin-top: 40px;
    .right {
      width: 330px;
    }
  }
  .essential {
    margin-top: 40px;
    .message,
    .facility {
      padding: 20px;
      border-bottom: 1px solid #eeeeee;
      .facility_title1 {
        margin-right: 90px;
        font-size: 14px;
      }
    }
    .message {
      font-size: 14px;
    }
    .message_title,
    .facility_title {
      font-size: 14px;
    }
    .facility {
      span {
        margin-right: 10px;
        display: inline-block;
        padding: 5px 10px;
        background: #eeeeee;
        font-size: 14px;
      }
      .one {
        margin-left: 90px;
      }
    }
  }
  .user_comment {
    position: relative;
    margin-top: 30px;

    h4 {
      margin-bottom: 20px;
    }
    .box {
      p {
        margin: 5px;
      }
    }
    .box2,
    .box3,
    .box4 {
      position: relative;
      margin-left: 80px;
    }
    .box2,
    .box3,
    .box4 {
      .environment {
        position: absolute;
        top: 25px;
        left: 25px;
        text-align: center;
        color: #ffa600;
        span {
          display: block;
        }
      }
    }
    .box1 {
      margin-left: 100px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: #ffe6c0 2px solid;
      text-align: center;
      line-height: 80px;
      .xing {
        position: absolute;
        top: 20px;
        left: 150px;
      }
      span {
        color: #ffe6c0;
      }
      i {
        position: absolute;
        left: 280px;
        top: -10px;
        font-size: 13px;
        color: #ffa600;
      }
    }
  }
  .detail {
    .detail_title {
      padding: 15px 0;
      border-bottom: 1px solid #ebeef5;
    }
    .detail_content {
      padding: 15px 0;
      border-bottom: 1px solid #ebeef5;
      &:hover {
        background: #f5f7fa;
      }
      .price {
        color: #ff9900;
        em {
          color: #606266;
        }
      }
    }
  }
}
#container {
  width: 650px;
  height: 360px;
}
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>