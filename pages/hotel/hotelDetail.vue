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
          <el-col :span="10">价格来源</el-col>
          <el-col :span="10">低价房型</el-col>
          <el-col :span="4">最低价格/每晚</el-col>
        </el-row>
      </div>
      <a href="https://hotels.ctrip.com/hotel/694679.html">
        <div class="detail_content" v-for="(item,index) in hotelDetail.products" :key="index">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">{{item.name}}</el-col>
            <el-col :span="10">{{item.bestType}}</el-col>
            <el-col :span="4" class="price">
              ￥{{item.price}}
              <em>起</em>
              <i class="iconfont iconjiantou"></i>
            </el-col>
          </el-row>
        </div>
      </a>
    </div>
    <div class="map">
      <!-- 地图的容器 -->
      <el-row type="flex" justify="space-between">
        <div id="container"></div>

        <div class="right">
          <el-tabs type="card" value="1" style="height:100%" @tab-click="handleTabClick">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
              style="width:200px; height:90px; overflow:hidden;overflow-y:auto;"
            >
              <P
                v-if="item.name=='1'"
                style="height:30px;line-height:30px ;overflow:hidden;"
                v-for="(data,index) in poisList"
                :key="index"
              >{{data.name}}</P>
              <p
                v-if="item.name=='2'"
                style="height:30px;line-height:30px ;overflow:hidden;"
                v-for="(data,index) in poisList"
                :key="index"
              >{{data.name}}</p>
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
            :percentage="hotelDetail.scores.environment *10===null?0:hotelDetail.scores.environment *10"
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
            :percentage="hotelDetail.scores.product *10===null?0:hotelDetail.scores.product *10"
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
            :percentage="hotelDetail.scores.service *10 ===null?0:hotelDetail.scores.service *10"
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
          name: "1"
        },
        {
          title: "交通",
          name: "2"
        }
      ],
      tabIndex: 2,
      hotelDetail: {
        scores: {},
        location: {}
      },
      poisList: [],
      cachepois: [],
      flag: true
    };
  },
  async mounted() {
    //获取酒店详情数据
    const result = await this.$axios({
      url: `/hotels?id=${this.$route.query.id}`
    });

    const { data } = result.data;
    this.hotelDetail = data[0];

    this.getFengjing();

    // 整个页面加载完毕之后执行
    window.onLoad = () => {
      this.map();
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
    async getFengjing() {
      const res = await this.$axios({
        url: `https://restapi.amap.com/v3/place/text?rectangle=116.351147,39.966309;116.357134,39.968727&key=0f20256dccf79ff8a575e0a1a1dc8d86&location=${this.hotelDetail.location.longitude},${this.hotelDetail.location.latitude}&city=南京&types=风景名胜`
      });

      const { pois } = res.data;
      this.poisList = pois;
      this.cachepois = res.data.pois;
      this.map();
    },
    map() {
      // 地图对象
      var map = new AMap.Map("container", {
        zoom: 14 , //级别
        center: [
          this.hotelDetail.location.longitude,
          this.hotelDetail.location.latitude
        ], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      setTimeout(() => {
        var arr = this.cachepois.map(v => {
           return v.location.split(",");
        });
        var marker1 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[0][0],
            arr[0][1]
          ),
          title: this.cachepois[0].name
        });
         marker1.setLabel({
		        offset: new AMap.Pixel(6, 6),
		        content: "1"
         })
        
        var marker2 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[1][0],
            arr[1][1]
          ),
          title: this.cachepois[1].name
        });
        var marker3 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[2][0],
            arr[2][1]
          ),
          title: this.cachepois[2].name
        });
        var marker4 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[3][0],
            arr[3][1]
          ),
          title: this.cachepois[3].name
        });
        var marker5 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[4][0],
            arr[4][1]
          ),
          title: this.cachepois[4].name
        });
        var marker6 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[5][0],
            arr[5][1]
          ),
          title: this.cachepois[5].name
        });
        var marker7 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[6][0],
            arr[6][1]
          ),
          title: this.cachepois[6].name
        });
        var marker8 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[7][0],
            arr[7][1]
          ),
          title: this.cachepois[7].name
        });
        var marker9 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[8][0],
            arr[8][1]
          ),
          title: this.cachepois[8].name
        });
        var marker10 = new AMap.Marker({
          position: new AMap.LngLat(
            arr[9][0],
            arr[9][1]
          ),
          title: this.cachepois[9].name
        });
        var markerList = [marker1,marker2,marker3,marker4,marker5,marker6,marker7,marker8,marker9,marker10];
        map.add(markerList); //添加到地图
      },200);
    },
    handleImg(item) {
      this.url = item;
    },
    handleTabClick() {
      if (this.flag) {
        this.$axios({
          url: `https://restapi.amap.com/v3/place/text?rectangle=116.351147,39.966309;116.357134,39.968727&key=0f20256dccf79ff8a575e0a1a1dc8d86&location=${this.hotelDetail.location.longitude},${this.hotelDetail.location.latitude}&city=南京&types=交通设施服务`
        }).then(res => {
          const { pois } = res.data;
          this.poisList = pois;
           this.cachepois = res.data.pois;
           this.map();
        });
        this.flag = false;
      } else {
        this.getFengjing();
        this.flag = true;
      }
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
      p {
        &:hover {
          cursor: pointer;
        }
      }
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
/deep/ .el-tab-pane {
  height: 300px !important;
  width: 300px !important;
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