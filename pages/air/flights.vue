<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @filtrateData="filtrateData" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div v-if="flightList.length>0">
          <FlightsItem v-for="(item,index) in flightList" :key="index" :data="item" />
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
        </div>
        <div
          v-if="flightList.length===0 && !loading"
          style="margin-top:20px;text-align:center;height:100px;"
        >暂无航班信息！</div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        options: {},
        info: {}
      }, // 航班总数据
      cacheFlightsData: {
        flights: [],
        options: {},
        info: {}
      },
      total: 0,
      pageIndex: 1,
      pageSize: 5,

      loading: true
    };
  },
  watch: {
    $route() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        this.cacheFlightsData = { ...res.data };

        this.total = res.data.total;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data;
      this.cacheFlightsData = { ...res.data };

      this.total = res.data.total;
      this.loading = false;
    });
  },
  computed: {
    flightList() {
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // console.log(arr)
      return arr;
    }
  },
  methods: {
    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
    },

    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
    },
    filtrateData(arr) {
      this.total = arr.length;
      this.flightsData.flights = arr;
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>