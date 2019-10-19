<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filters.flightTimes"
          placeholder="起飞时间"
          
        >
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label='item.from+":00-"+item.to+":00"'
            :value="item.from+','+item.to"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.company" placeholder="航空公司" >
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.airSize" placeholder="机型" >
          <el-option
            v-for="(item,index) in airplaneModel"
            :key="index"
            :label="item.size"
            :value="item.airmodel"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
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
  data() {
    return {
      filters: {
        airport: "", // 机场
        flightTimes: "", // 出发时间
        company: "", // 航空公司
        airSize: "" // 机型大小
      },
      airplaneModel: [
        {
          size: "大",
          airmodel: "L"
        },
        {
          size: "中",
          airmodel: "M"
        },
        {
          size: "小",
          airmodel: "S"
        }
      ]
    };
  },
  watch: {
    filters: {
      deep: true,
      handler() {
         
        const arr=this.data.flights.filter(v => {
          let valid = true;
          if (this.filters.airSize && this.filters.airSize !== v.plane_size) {
            valid = false;
          }
          if (this.filters.company && this.filters.company !== v.airline_name) {
            valid = false;
          }
          if (
            this.filters.airport &&
            this.filters.airport !== v.org_airport_name
          ) {
            valid = false;
          }
          if (this.filters.flightTimes) {
              const start = this.filters.flightTimes.split(",");
            if (+v.dep_time.split(":")[0] > +v.arr_time.split(":")[0] || +v.dep_time.split(":")[0] < +start[0] ||
                +v.dep_time.split(":")[0] >= +start[1]) {
              valid=false
            }
          }
          return valid;
        });
        this.$emit("filtrateData", arr);
      }
    }
  },
  methods: {
    

    // 撤销条件时候触发
    handleFiltersCancel() {}
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>