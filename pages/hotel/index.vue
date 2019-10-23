<template>
  <div class="container">
    <div class="crumbs">
      酒店
      <i class="iconfont iconjiantou"></i>南京市酒店预订
    </div>
    <el-row type="flex" justify="start">
      <el-autocomplete
        :fetch-suggestions="queryDepartSearch"
        placeholder="目的地"
        @select="handleDepartSelect"
        class="el-autocomplete"
        v-model="city"
        @blur="handleSelectCity('depart')"
      ></el-autocomplete>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="入住时间"
        end-placeholder="离店时间"
        @blur="handleGetTime"
      ></el-date-picker>
      <el-aside width="200px">
        <el-form>
          <el-form-item class="inpPeople">
            <el-input
              v-model="headcount"
              placeholder="人数未定"
              suffix-icon="el-icon-edit-outline"
              v-popover:popover2
              ref="renshu"
              @focus="handleFocus"
            ></el-input>
            <el-popover
              ref="popover2"
              placement="bottom"
              title="请选择入住人数"
              width="300"
              class="numberPeople"
            >
              <span>每间</span>
              <el-select v-model="value1" placeholder="成人" style="width:85px;">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="value2" placeholder="儿童" style="width:85px">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button type="primary" class="confirm" @click="handleConfirm">确定</el-button>
            </el-popover>
          </el-form-item>
        </el-form>
      </el-aside>
      <span class="btn" @click="handleLookPrice">查看价格</span>
    </el-row>
    <div class="content">
      <el-row type="flex" justify="space-between">
        <div class="left">
          <el-row type="flex" justify="space-between">
            <div class="area">区域：</div>
            <p ref="p">
              <router-link to="#">全部</router-link>

              <router-link
                :to="`/hotel?city=${cityId}&scenic=${item.id}`"
                v-for="(item,index) in scenics"
                :key="index"
              >{{item.name}}</router-link>
            </p>
          </el-row>
          <a class="icon" href="#" @click="handlezhankai">
            <i class="iconfont iconGroup- jiantou"></i>等43个区域
          </a>
          <el-row type="flex" justify="space-between">
            <div class="strategy">攻略：</div>
            <p class="strategy1">
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。
              景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。
              由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </p>
          </el-row>
          <el-row type="flex" justify="start">
            <!-- 均价 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价,设施和服务等各方面水平的综合评估"
              placement="top"
            >
              <div class="price">
                <em>均价 &nbsp;</em> :
                <span class="details">?</span>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价,设施和服务等各方面水平的综合评估"
              placement="bottom-start"
            >
              <div class="price">
                <span>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <em>¥332</em>
                </span>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价,设施和服务等各方面水平的综合评估"
              placement="bottom-start"
            >
              <div class="price">
                <span>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <em>¥521</em>
                </span>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价,设施和服务等各方面水平的综合评估"
              placement="bottom-start"
            >
              <div class="price">
                <span>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <i class="iconfont iconhuangguan"></i>
                  <em>¥768</em>
                </span>
              </div>
            </el-tooltip>
          </el-row>
        </div>
        <el-table v-if="hotelDetail.length===0" v-loading="loading" style="width: 100%"></el-table>
        <div class="right" v-if="hotelDetail.length !==0">
          <!-- 地图的容器 -->
          <div id="container"></div>
          <div id="panel"></div>
        </div>
      </el-row>
    </div>
    <div class="filtrate">
      <el-row type="flex" justify="start">
        <template>
          <div class="block">
            <el-row type="flex" justify="space-between">
              <span class="demonstration">价格</span>
              <i>0-{{num}}</i>
            </el-row>
            <el-slider @input="handleInput" v-model="num" :max="4000"></el-slider>
          </div>
          <div class="grade">
            <div class="demonstration">住宿等级</div>
            <el-dropdown class="buxian" v-model="grade">
              <el-row type="flex" justify="space-between">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown" class="dropdown" style="width:100px;">
                <el-checkbox-group
                  v-model="checkList"
                  v-for="(item,index) in optionList.levels"
                  :key="index"
                  @change="handleChange"
                >
                  <el-dropdown-item>
                    <el-checkbox :label="item.name" :value="item.name"></el-checkbox>
                  </el-dropdown-item>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="type">
            <div class="demonstration">住宿类型</div>
            <el-dropdown class="buxian">
              <el-row type="flex" justify="space-between">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown" class="dropdown" style="width:150px;">
                <el-checkbox-group
                  v-model="checkList"
                  v-for="(item,index) in optionList.types"
                  :key="index"
                  @change="handleChange"
                >
                  <el-dropdown-item>
                    <el-checkbox :label="item.name" :value="item.name"></el-checkbox>
                  </el-dropdown-item>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="facilities">
            <div class="demonstration">酒店设施</div>
            <el-dropdown class="buxian">
              <el-row type="flex" justify="space-between">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu slot="dropdown" class="dropdown" style="width:150px;">
                <el-checkbox-group
                  v-model="checkList"
                  v-for="(item,index) in optionList.assets"
                  :key="index"
                  @change="handleChange"
                >
                  <el-dropdown-item>
                    <el-checkbox :label="item.name" :value="item.name"></el-checkbox>
                  </el-dropdown-item>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="brand">
            <div class="demonstration">酒店品牌</div>
            <el-dropdown class="buxian">
              <el-row type="flex" justify="space-between">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-row>
              <el-dropdown-menu
                slot="dropdown"
                class="dropdown"
                style="width:150px;height:200px;line-height:20px;overflow:auto;overflow-x:hidden;"
              >
                <el-checkbox-group
                  v-model="checkList"
                  v-for="(item,index) in optionList.brands"
                  :key="index"
                  @change="handleChange"
                >
                  <el-dropdown-item>
                    <el-checkbox :label="item.name" :value="item.name"></el-checkbox>
                  </el-dropdown-item>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-row>
    </div>
    <el-table v-if="hotelDetail.length===0" v-loading="loading" style="width: 100%"></el-table>
    <hodelItem :data="item" v-for="(item,index) in hotelDetail" :key="index" />

    <el-pagination
      v-if="!hotelDetail.length==0"
      style="margin-left:250px"
      class="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import hodelItem from "@/components/hodel/hodelItem.vue";
import moment from "moment";
export default {
  data() {
    return {
      // filter: {
      //   grade: "",
      //   type: "",
      //   facility: "",
      //   brand: ""
      // },
      checkList: [],
      grade: "",
      loading: true,
      // 总人数
      headcount: "",
      // 酒店数据列表
      cacheHotelList: {
        data: []
      },
      // 城市ID
      cityId: 0,
      // 条数
      pageSize: 2,
      // 开始数据（分页）
      start: 0,
      // 初始页码
      pageIndex: 1,
      // 初始价格
      num: 2140,
      //总条数
      total: 0,
      //酒店选项
      optionList: {},
      // 开关
      flag: true,
      //酒店详情信息
      hotelDetail: [],
      scenics: [],
      options1: [
        {
          value: "1",
          label: "1成人"
        },
        {
          value: "2",
          label: "2成人"
        },
        {
          value: "3",
          label: "3成人"
        },
        {
          value: "4",
          label: "4成人"
        },
        {
          value: "5",
          label: "5成人"
        }
      ],
      options2: [
        {
          value: "0",
          label: "0儿童"
        },
        {
          value: "1",
          label: "1儿童"
        },
        {
          value: "2",
          label: "2儿童"
        },
        {
          value: "3",
          label: "3儿童"
        },
        {
          value: "4",
          label: "4儿童"
        }
      ],
      value1: "", //成人
      value2: "", //儿童

      city: "南京",

      time: [],
      // 选择入住时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },

  async mounted() {
    //  获取城市id
    const res = await this.$axios({
      url: `/cities/?name=${this.city}`
    });

    this.cityId = res.data.data[0].id;

    this.scenics = res.data.data[0].scenics;

    //酒店选项
    const options = await this.$axios({
      url: "/hotels/options"
    });

    this.optionList = options.data.data;

    //  获取酒店详情
    this.getHotelDetail();

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
    handleChange() {
      // const arr=this.cacheHotelList.data.filter(v=>{
      //   let valid=true;
      //   if(v.hotellevel && this.checkList.indexOf(v.hotellevel) ===-1){
      //       valid=false;
      //   }
      //   return valid
      // })
      // console.log(arr)
      // this.hotelDetail=arr;
    },
    //改变价格
    handleInput() {
      this.getHotelDetail();
    },
    map() {
      // 地图对象
       var arr = this.hotelDetail.map(v => {
        return v.location.latitude;

      });
      var arr1 = this.hotelDetail.map(v => {
        return v.location.longitude;
      });
     
      var map = new AMap.Map("container", {
        zoom: 7, //级别
     
        center:[arr1[1],arr[1]],
        center:[arr1[0], arr[0]],
        viewMode: "3D" //使用3D视图
      });
     
      // 点标记
      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(arr1[0], arr[0]),
        offset: new AMap.Pixel(-10, -10),
        icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        title: "好来阁商务宾馆"
      });
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(arr1[1], arr[1]),
        
        offset: new AMap.Pixel(-10, -10),
        icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        title: "南京古都文化酒店（鼓楼店）(如家联盟)"
      });
      var markerList = [marker1, marker2];
      map.add(markerList); //添加到地图
    },
    //查看价格
    async handleLookPrice() {
      location.reload();
      // 获取酒店列表
      const Data = {
        city: this.cityId,
        enterTime: this.time[0],
        leftTime: this.time[1],
        _limit: this.pageSize,
        _start: this.start
      };
      const hotel = await this.$axios({
        url: `/hotels/`,
        params: Data
      });
      this.$router.push({
        path: "/hotel",
        query: Data
      });
      const { data, total } = hotel.data;
      this.hotelDetail = data;

      this.total = total;
    },
    //获取时间
    handleGetTime() {
      const arr = [];
      arr.push(moment(this.time[0]).format("YYYY-MM-DD"));
      arr.push(moment(this.time[1]).format("YYYY-MM-DD"));
      this.time = arr;
    },
    //点击展开内容
    handlezhankai() {
      if (this.flag) {
        this.$refs.p.style.height = "140px";
        this.flag = false;
      } else {
        this.$refs.p.style.height = "40px";
        this.flag = true;
      }
    },
    // 获取酒店列表
    async getHotelDetail() {
      const hotel = await this.$axios({
        url: `/hotels/`,
        params: {
          city: this.cityId,
          _limit: this.pageSize,
          _start: this.start
        }
      });
      const { data, total } = hotel.data;
      this.hotelDetail = data;
      this.cacheHotelList = { ...hotel.data };
      this.total = total;
    },
    // 切换评论条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getHotelDetail();
      this.map();
    },
    // 切换评论到第几条
    handleCurrentChange(val) {
      if (val === 1) {
        this.start = 0;
      } else if (val === 2) {
        this.start = 2;
      } else {
        this.start = (val - 1) * 2;
      }
      this.getHotelDetail();
      this.map();
    },

    handleFocus() {
      this.$refs.popover2.$refs.popper.hidden = false;
    },
    handleConfirm() {
      if (this.value2 == 0) {
        this.headcount = `${this.value1}成人`;
      } else {
        this.headcount = `${this.value1}成人${this.value2}儿童`;
      }
      this.$refs.popover2.$refs.popper.hidden = true;
    },
    // 城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      const res = await this.$axios({
        url: `/airs/city/`,
        params: {
          name: value
        }
      });
      const { data } = res.data;
      const newData = data.map(v => {
        v.value = v.name;
        return v;
      });
      this.Cities = newData;
      cb(newData);
    },

    // 城市下拉选择时触发
    handleDepartSelect(item) {
      this.city = item.value;
    },
    //失去焦点是默认选择第一个
    handleSelectCity(type) {
      if (this.Cities.length === 0) return false;
      this.city = this.Cities[0].value;
    }
  },
  components: {
    hodelItem
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .btn {
    margin-left: 20px;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    font-size: 14px;
    background: #409eff;
    color: #fff;
    &:hover {
      background: #66b1ff;
      cursor: pointer;
    }
  }
  .crumbs {
    margin-bottom: 20px;
    color: #606266;
    i {
      padding: 0 5px;
    }
  }
  .content {
    .left {
      position: relative;
      width: 600px;
      .area,
      .strategy,
      .evalute {
        width: 60px;
        color: #666666;
        font-size: 14px;
      }
      .strategy {
        margin-top: 30px;
      }
      .strategy1 {
        margin-top: 30px;
      }
      p {
        width: 520px;
        height: 40px;
        overflow: hidden;
        color: #666;
        font-size: 14px;
        a {
          margin-right: 15px;
          color: #666;
          font-size: 14px;
          &:hover {
            text-decoration: underline;
            color: #0099ff;
          }
        }
      }
      .icon {
        color: #666;
        margin-left: 60px;
        i {
          color: #ff9900;
        }
      }
      .price {
        position: relative;
        margin-right: 20px;
        em {
          color: #666;
          font-size: 14px;
          margin-right: 10px;
        }
        span {
          i {
            color: #ff9900;
          }
        }
        .details {
          position: absolute;
          top: 0px;
          left: 30px;
          display: block;
          width: 15px;
          width: 15px;
          border-radius: 50%;
          text-align: center;
          line-height: 15px;
          background: #cccccc;
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .right {
      width: 420px;
      height: 260px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .filtrate {
    margin: 20px 0;
    padding: 5px 0;
    border: 1px solid #dddddd;
    .block {
      width: 200px;
      padding: 0 20px;
      border-right: 1px solid #dddddd;
      font-size: 14px;
      color: #666666;
      span {
        float: left;
      }
      i {
        float: right;
      }
    }
    .grade,
    .type,
    .facilities,
    .brand {
      width: 150px;
      padding: 0 20px;
      border-right: 1px solid #dddddd;
      font-size: 14px;
      color: #666666;
      .buxian {
        margin-top: 10px;
        width: 100%;
        font-size: 12px;
      }
    }
    .brand {
      border-right: none;
    }
  }
}
/deep/ .el-date-editor {
  margin: 0 20px;
}
/deep/ .el-checkbox__inner {
  border-radius: 50%;
}
#container {
  width: 420px;
  height: 260px;
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
}
</style>