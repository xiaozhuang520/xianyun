<template>
  <section class="container">
    <!-- 导航列表 -->
    <el-row type="flex" justify="space-between">
      <div class="left">
        <div class="nav" @mouseleave="handleLeave">
          <ul>
            <li v-for="(item,index) in cities" :key="index" @mouseenter="enter(item,index)" @mouseleave="leave(index)" ref="li">
              {{item.type}}
              <span class="iconfont iconjiantou"></span>
            </li>
          </ul>
          <div class="nav-right" ref="nav_right" v-if="status">
            <router-link to="#">
              <p
                v-for="(item,index) in cityData"
                :key="index"
                @mouseenter="handleEnter"
                @mouseleave="handleLeave"
                @click="handleClick(item)"
              >
                <i>{{index+1}}</i>
                <span>{{item.city}}</span>
                <em>{{item.desc}}</em>
              </p>
            </router-link>
          </div>
        </div>
        <div class="recommend_city">
          <p>推荐城市</p>
          <img src="../../assets/images/Cg.jpg" alt />
        </div>
      </div>
      <!-- banner广告 -->
      <div class="right">
        <div class="search">
          <input placeholder="请输入想去的地方,比如:'广州'" v-model="city" />
          <span class="iconfont iconfangdajing search_btn" @click="handleSearch"></span>
        </div>
        <div class="recommend">
          <i>推荐：</i>
          <em class="recommend_city" v-for="(item,index) in recommendCity" :key="index">
            <span @click="handleSelectCity(item.name)">{{item.name}}</span>
          </em>
        </div>
        <div class="strategy">
          <el-row type="flex" justify="space-between">
            <h2>推荐攻略</h2>
            <span class="write_travel">
             <router-link to="/post/create">
                <i class="iconfont icon44"></i> 写游记
             </router-link>
            </span>
          </el-row>
        </div>
        <!-- 景点详情 -->
        <postItem :data="item" v-for="(item,index) in postList" :key="index" />
        <!-- 分页 -->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>
  </section>
</template>

<script>
import postItem from "@/components/post/postItem";
export default {
  data() {
    return {
      // 城市列表
      cities: [],
      // 城市详情列表
      cityData: [],
      // 文章列表
      postList: [],
      // 城市
      city: "",
      index:0,
      // 推荐城市
      recommendCity: [
        {
          name: "广州"
        },
        {
          name: "上海"
        },
        {
          name: "北京"
        }
      ],
      // 文章总数量
      total: 0,
      status: false,
      pageIndex: 1,
      pageSize: 3,
      start: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      const { data } = res.data;
      this.cities = data;
    });

    this.getPostCity();
  },
  methods: {
    getPostCity(data) {
      if (data) {
        this.$axios({
          url: `/posts?_start=${this.start}&_limit=${this.pageSize}${data}`
        }).then(res => {
          const { data, total } = res.data;
          this.total = total;
          this.postList = data;
        });
      } else {
        this.$axios({
          url: `/posts?_start=${this.start}&_limit=${this.pageSize}`
        }).then(res => {
          const { data, total } = res.data;
          this.total = total;
          this.postList = data;
        });
      }
    },
    // 导航菜单显示与隐藏
    enter(item,index) {
      this.$refs.li[index].className="active";
      this.cityData = item.children;
      this.status = true;
    },
    leave(index){
      this.$refs.li[index].className="";
      this.index=index;
    },
    handleEnter(index) {
      this.$refs.li[this.index].className="active";
      this.status = true;
    },
    handleLeave() {
      this.$refs.li[this.index].className="";
      this.status = false;
    },
    // 点击导航右侧切换城市
    handleClick(data) {
      const city = data.city;
      this.city = city;
      this.getPostCity(`&city=${city}`);
    },
    handleSizeChange(val) {
      this.pageSize=val;
      this.getPostCity()
    },
    handleCurrentChange(val) {
      if (val === 1) {
        this.start = 0;
      } else if (val === 2) {
        this.start = 3;
      } else {
        this.start = (val-1) * 3;
      }
      this.getPostCity();
    },
    //点击推荐下的城市搜索城市
    handleSelectCity(city){
      this.city = city;
      this.getPostCity(`&city=${city}`);
    },
    //点击搜索图标切换城市
    handleSearch(){
        const city=this.city;
        if(!city)return;
        this.getPostCity(`&city=${city}`);
    }
  },
  components: {
    postItem
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  margin-top: 20px;
  .left {
    width: 260px;
    .nav {
      position: relative;
      border: 1px solid #dddddd;
      .nav-right {
        position: absolute;
        z-index: 3;
        top: -1px;
        right: -401px;
        width: 360px;
        padding: 0 20px;
        border: 1px solid #dddddd;
        background: #fff;
        p {
          padding: 6px 0;
        }
        i {
          font-size: 20px;
          color: #ffa500;
          font-style: oblique;
        }
        span {
          font-size: 14px;
          color: #ffa500;
          padding: 0 5px;
          &:hover {
            text-decoration: underline;
          }
        }
        em {
          font-size: 14px;
          color: #999999;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      ul {
        position: relative;
        z-index: 5;
        li {
          padding: 10px 20px;
          border-bottom: 1px solid #dddddd;

          font-size: 14px;
          span {
            float: right;
          }
          &:last-child {
            border-bottom: none;
          }
          // &:hover {
          //   border-right: 1px solid #fff;
          //   color: #ffa500;
          // }
        }
      }
    }
    .recommend_city {
      width: 260px;
      margin-top: 20px;
      p {
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }
      img {
        margin-top: 10px;
        display: block;
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
      }
    }
  }
  .right {
    width: 700px;
    .search {
      position: relative;
      input {
        width: 100%;
        height: 34px;
        border: 3px solid #ffa500;
        text-indent: 20px;
        outline: none;
      }
      span {
        position: absolute;
        top: 6px;
        right: 5px;
        font-size: 25px;
        font-weight: 600;
        color: #ffa500;
        cursor:pointer;
      }
    }
    .recommend {
      margin-top: 10px;
      font-size: 12px;
      color: #666666;
      span {
        &:hover {
          cursor: pointer;
          text-decoration: underline;
          color: #ffa500;
        }
        padding-right: 10px;
      }
    }
    .strategy {
      margin-top: 20px;
      border-bottom: 1px solid #eeeeee;
      h2 {
        border-bottom: 2px solid #ffa500;
        font-size: 18px;
        color: #ffa500;
        font-weight: normal;
      }
      .write_travel {
        width: 106px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        color: #fff;
        background: #409eff;
      }
    }
    .paging {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
.active{
  border-right:1px solid #fff;
  color: #ffa500;
}
</style>