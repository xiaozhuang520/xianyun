<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input v-model="item.id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captCha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
      <span v-show="false">{{allPrice}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      infoData: {
        insurances: [], // 初始化保险数据
        seat_infos: {}
      },
      insurances: [], // 保险数据,
      contactName: "", //联系人名字
      contactPhone: "", //联系人电话
      captCha: "" //验证码
    };
  },
  computed: {
    allPrice() {
      var price = 0;
      price += this.infoData.seat_infos.org_settle_price;
      price += this.infoData.airport_tax_audlet;
      price += this.insurances.length * 30;
      price *= this.users.length;

      this.$emit("getallprice", price);
      return price;
    }
  },
  mounted() {
    this.$axios({
      url: `/airs/${this.$route.query.id}`,
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then(res => {
      this.infoData = res.data;
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    // 购买或移除保险
    handleChange(id) {
      const index = this.insurances.indexOf(id);

      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
    },
    // 发送手机验证码
    async handleSendCaptcha() {
      if (!this.contactPhone) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      if (this.contactPhone.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      const res = await this.$store.dispatch(
        "user/sendcaptcha",
        this.contactPhone
      );
      this.$message.success("当前的验证码为:" + res.data.code);
    },

    // 提交订单
    async handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        captcha: this.captCha,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      // 判断证件号码
      const result = this.users.map(v => {
        if (
          !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/.test(
            v.id
          )
        ) {
          this.$message.error("证件号码格式不正确");
          return "false";
        } else {
          return "true";
        }
      });
      if (result.indexOf("false") > -1) return;

      const res = await this.$axios({
        url: "/airorders",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userinfo.token}`
        },
        data,
        method: "post"
      });

      const { message } = res.data;

      if (message === "订单提交成功") {
        this.$router.push({
          path: "/air/pay",
          query: {
            id: res.data.data.id
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>