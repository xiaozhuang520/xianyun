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
        v-model="form.city"
        @blur="handleSelectCity('depart')"
      ></el-autocomplete>
      <el-date-picker
        v-model="form.enterTime"
        type="daterange"
        range-separator="-"
        start-placeholder="入住时间"
        end-placeholder="离店时间"
      ></el-date-picker>
      <el-aside width="200px">
        <el-form>
          <el-form-item class="inpPeople">
            <el-input
              v-model="form.person"
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
              trigger="click"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
              class="numberPeople"
            >
              <span>每间</span>
              <el-select
                v-model="value1"
                placeholder="成人"
                style="width:85px;"
               
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="value2"
                placeholder="儿童"
                style="width:85px"
                
              >
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
      <span class="btn">查看价格</span>
    </el-row>
    <div class="content" >
      <el-row type="flex" justify="space-between">
        
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      form: {
        city: "南京",
        enterTime: "",
        person: ""
      },
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
  methods: {
   
    handleFocus(){
      this.$refs.popover2.$refs.popper.hidden=false;
    },
    handleConfirm() {
      if (this.value2==0) {
        this.$refs.renshu.value = `${this.value1}成人`;
      }else{
        this.$refs.renshu.value = `${this.value1}成人${this.value2}儿童`;
      }
     this.$refs.popover2.$refs.popper.hidden=true
    },
    // 出发城市输入框获得焦点时触发
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

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.city = item.value;
    },
    handleSelectCity(type) {
      if (this.Cities.length === 0) return false;
      this.form.city = this.Cities[0].value;
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
}
/deep/ .el-date-editor {
  margin: 0 20px;
}
</style>