<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="left">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-input placeholder="请输入标题" v-model="form.title"></el-input>
        <div id="app">
          <VueEditor :config="config" ref="vueEditor" class="editor" />
        </div>
        <div class="select_city" type="flex" justify="space-between">
          <span>选择城市：</span>
          <el-autocomplete
            :fetch-suggestions="queryDepartSearch"
            placeholder="请搜索游玩城市"
            @select="handleDepartSelect"
            class="el-autocomplete"
            v-model="form.city"
            @blur="handleSelectCity('depart')"
          ></el-autocomplete>
        </div>
        <div class="post">
          <span @click="handlePost">发布</span> 或者
          <i @click="handleSave">保存到草稿</i>
        </div>
      </div>
      <div class="right">
        <Draft @handleeditdraft="handleEditDraft" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Draft from "@/components/post/draft";
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
import moment from "moment";

export default {
  components: {
    VueEditor,
    Draft
  },
  methods: {
    //编辑草稿
    handleEditDraft(data) {
      this.form.title = data.title;
      this.form.city = data.city;
      var quill = this.$refs.vueEditor.editor;
      quill.clipboard.dangerouslyPasteHTML(0, `${data.content}`);
    },
    //保存到草稿
    handleSave() {
      var postTime = new Date();
      var newPostTime = moment(postTime).format("YYYY-MM-DD HH:mm:ss");
      this.form.postTime = newPostTime;
      var quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;
      this.$store.commit("postdraft/setpostDraft", this.form);
    },
    // 发布攻略
    handlePost() {
        var quill = this.$refs.vueEditor.editor;
        this.form.content = quill.root.innerHTML;
        const {postTime,...props}=this.form;
        this.$axios({
          url: "/posts",
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userinfo.token}`
          },
          method: "post",
          data: props
        }).then(res => {
          const { message } = res.data;
          this.$message.success(message);
          if (message === "新增成功") {
            this.form = {};
            var quill = this.$refs.vueEditor.editor;
            quill.root.innerHTML = "";
          }
        });
    },
    handleSelectCity(type) {
      if (this.Cities.length === 0) return false;
      this.form.city = this.Cities[0].value;
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
    }
  },
  data() {
    return {
      Cities: [],
      form: {
        title: "",
        content: "",
        city: ""
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        }
      }
    };
  },

  mounted() {}
};
</script>

<style scoped lang="less">
.container {
  margin-top: 20px;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .left {
    width: 750px;
    h2 {
      font-weight: normal;
    }
    p {
      margin: 10px 0;
      font-size: 12px;
      color: #999999;
    }
    .editor {
      margin: 20px 0;
      height: 400px;
    }
    .select_city {
      margin-top: 60px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #666;
      span {
        display: inline-block;
        width: 80px;
        line-height: 35px;
      }
      input {
        width: 200px;
        height: 35px;
        text-indent: 20px;
        border: #dcdfe6 1px solid;
        border-radius: 5px;
      }
    }
    .post {
      span {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background: #409eff;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
      }
      i {
        color: #ffad00;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>