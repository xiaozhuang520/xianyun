<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="left">
        <div class="crumbs">
          <span>旅游攻略</span>
          <i>攻略详情</i>
        </div>
        <h2>{{detail.title}}</h2>
        <div class="detail_strategy">
          <span>攻略: {{detail.city.created_at}}</span>
          <i>阅读：{{detail.watch}}</i>
        </div>
        <div class="content" v-html="detail.content"></div>
        <el-row class="operation" type="flex" justify="center">
          <div class="comment">
            <i class="iconfont iconpinglun"></i>
            <p>评论(100)</p>
          </div>
          <div class="collect">
            <i class="iconfont iconklmshoucang"></i>
            <p>收藏</p>
          </div>
          <div class="share">
            <i class="iconfont iconfenxiang-1"></i>
            <p>分享</p>
          </div>
          <div class="like">
            <i class="iconfont iconlike"></i>
            <p>点赞(100)</p>
          </div>
        </el-row>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
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
        </el-row>
        <div class="comment">
          <h3>评论</h3>
          <textarea name id rows="3" style="Width:100%;" placeholder="说点什么吧..."></textarea>
          <el-row class="addimg_submint" type="flex" justify="space-between">
            <el-upload
              :action="`${$axios.defaults.baseURL}/upload/`"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              name="files"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <span>提交</span>
          </el-row>
        </div>
      </div>
      <div class="right">
        <h4>相关攻略</h4>
        <CommentItem v-for="(item,index) in recommend" :key="index" :data="item" />
      </div>
    </el-row>
  </div>
</template>

<script>
import CommentItem from "@/components/post/commentItem";
export default {
  data() {
    return {
         dialogImageUrl: '',
        dialogVisible: false,
      // 文章详情
      detail: {
        city: {}
      },
      //   推荐文章列表
      recommend: [],
      pageSize: 2,
      pageIndex: 1,
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      //   this.pageSize = val;
      //   this.getPostCity();
    },
    handleCurrentChange(val) {
      //   if (val === 1) {
      //     this.start = 0;
      //   } else if (val === 2) {
      //     this.start = 3;
      //   } else {
      //     this.start = (val - 1) * 3;
      //   }
      //   this.getPostCity();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      const { data } = res.data;
      this.detail = data[0];
      console.log(this.detail);
    });
    this.$axios({
      url: "/posts/recommend"
    }).then(res => {
      const { data } = res.data;
      this.recommend = data;
    });
  },
  components: {
    CommentItem
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
    width: 700px;
    h2 {
      padding: 20px 0;
      border-bottom: 1px solid #dddddd;
      font-size: 32px;
    }
    .detail_strategy {
      width: 100%;
      text-align: right;
      margin: 20px 0;
      color: #a69999;
    }
    /deep/.content {
      img {
        max-width: 700px !important;
      }
    }
    .operation {
      margin: 50px 0;
      .comment,
      .collect,
      .share,
      .like {
        margin: 0 20px;
        width: 60px;
        text-align: center;
      }
      i {
        font-size: 40px;
        color: #ffa500;
      }
      p {
        font-size: 14px;
        color: #999999;
      }
    }
    .comment {
      margin-bottom: 20px;
      h3 {
        margin-bottom: 20px;
        font-weight: normal;
      }
      textarea {
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #c0c4cc;
        color: #c0c4cc;
      }
      .addimg_submint {
        margin-top: 10px;
        span {
          display: inline-block;
          width: 50px;
          height: 20px;
          line-height: 20px;
          background: #409eff;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
  .right {
    width: 280px;
    h4 {
      margin-top: 10px;
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: normal;
      border-bottom: 1px solid #dddddd;
    }
  }
}
/deep/.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
}
</style>