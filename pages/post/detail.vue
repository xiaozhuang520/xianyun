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
          <span>攻略: {{detail.created_at}}</span>
          <i>阅读：{{detail.watch===null?0:detail.watch}}</i>
        </div>
        <div class="content" v-html="detail.content"></div>
        <el-row class="operation" type="flex" justify="center">
          <div class="comment">
            <i class="iconfont iconpinglun"></i>
            <p>评论({{total}})</p>
          </div>
          <div class="collect" @click="handleCollect">
            <i class="iconfont iconklmshoucang"></i>
            <p>收藏</p>
          </div>
          <div class="share">
            <i class="iconfont iconfenxiang-1"></i>
            <p>分享</p>
          </div>
          <div class="like" @click="handleLike">
            <i class="iconfont iconlike"></i>
            <p>点赞({{detail.like===null?0:detail.like}})</p>
          </div>
        </el-row>

        <div class="comment">
          <h3>评论</h3>
          <div class="box" v-show="isShow">
            <div class="reply" ref="reply">你发的能放得开</div>
            <i @click="handleDelete">×</i>
          </div>
          <textarea ref="textarea" style="resize:none;" name id rows="3" placeholder="说点什么吧..." v-model="form.content"></textarea>
          <el-row class="addimg_submint" type="flex" justify="space-between">
            <el-upload
              :action="`${$axios.defaults.baseURL}/upload/`"
              list-type="picture-card"
              :on-remove="handleRemove"
              name="files"
              ref="upload"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePictureCardPreview"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <span @click="handleSubmit">提交</span>
          </el-row>
          <!-- 评论列表 -->
          <div class="comment_list" v-for="(item,index) in postComments" :key="index">
            <el-row class="user" type="flex" justify="space-between">
              <div class="user_info">
                <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
                <span>{{item.account.nickname}}</span>
                <i>{{item.created_at}}</i>
              </div>
              <em>{{index+1}}</em>
            </el-row>
            <div class="content">
              <Item :data="item.parent" v-if="item.parent"  @handlehuifu="handleHuiFu"/>
              <div class="mian">
                <p>{{item.content}}</p>
                <el-row type="flex" justify="start">
                  <div class="content_img" v-for="(data,index) in item.pics" v-if="item.pics">
                    <img :src="$axios.defaults.baseURL+data.url" alt />
                  </div>
                </el-row>
                <span @click="handleReply(item)">回复</span>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <el-row type="flex" justify="center" v-if="postComments.length !==0">
            <el-pagination
              class="paging"
              style="margin-top:20px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[2, 5, 10, 15]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
          <div class="reminder" v-if="postComments.length===0">暂无评论！</div>
        </div>
      </div>
      <div class="right">
        <h4>相关攻略</h4>
        <CommentItem
          v-for="(item,index) in recommend"
          :key="index"
          :data="item"
          @handledetail="handleDetail"
        />
      </div>
    </el-row>
  </div>
</template>

<script>
import CommentItem from "@/components/post/commentItem";
import Item from "@/components/post/Item";
import moment from 'moment'
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 文章详情
      detail: {
        city: {}
      },
      // 推荐文章列表
      recommend: [],
      //文章评论列表
      postComments: [],
      // 文章总数量
      total: 0,
      pageIndex: 1,
      pageSize: 2,
      start: 0,
      //评论数据
      form: {
        content: "",
        pics: []
      },
      isShow: false,
      replyData: ""
    };
  },
  methods: {
    //点击子项回复按钮
    handleHuiFu(item){
      this.isShow = true;
      this.$refs.reply.innerHTML = `回复 @${item.account.nickname}`;
      this.replyData=item;
      this.$refs.textarea.focus()
    },
    //提交评论
    addComment() {
      this.form.post = this.$route.query.id;
      if (this.replyData) {
        this.form.follow = this.replyData.id;
      }
      this.$axios({
        url: "/comments",
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${this.$store.state.user.userinfo.token}`
        },
        method: "post",
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$message.success(message);
        this.form.content = "";
        this.form.pics=[];
        this.isShow = false;
        this.start=0;
        this.getpostComments();
      });
    },
    //移除回复按钮
    handleDelete() {
      this.isShow = false;
      this.replyData='';
    },
    //点击回复按钮
    handleReply(data) {
      this.isShow = true;
      this.$refs.reply.innerHTML = `回复 @${data.account.nickname}`;
      this.replyData=data;
      this.$refs.textarea.focus()
    },
    //发表评论
    handleSubmit() {
    
      if(!this.form.content){
        this.$message.error('请输入评论内容');
        return;
      }
      this.addComment();
      this.$refs.upload.clearFiles()
     
    },
    //点赞
    handleLike() {
      this.$axios({
        url: "/posts/like",
        params: {
          id: this.$route.query.id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userinfo.token}`
        }
      }).then(res => {
        const { message } = res.data;
        this.$message.success(message);
        this.getDetail();
      });
    },
    // 收藏
    handleCollect() {
      this.$axios({
        url: "/posts/star",
        params: {
          id: this.$route.query.id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userinfo.token}`
        }
      }).then(res => {
        const { message } = res.data;
        this.$message.success(message);
      });
    },
    // 切换评论条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getpostComments();
    },
    // 切换评论到第几条
    handleCurrentChange(val) {
      if (val === 1) {
        this.start = 0;
      } else if (val === 2) {
        this.start = 3;
      } else {
        this.start = (val - 1) * 3;
      }
      this.getpostComments();
    },
    // 删除图片
    handleRemove(file, fileList) {
      const id = file.response[0].id;
      const { pics } = this.form;
      const arr = [];
      pics.forEach(e => {
        if (e.id !== id) {
          arr.push(e);
        }
      });
      this.form.pics = arr;
    },
    // 上传图片成功
    handleAvatarSuccess(res, file) {
      this.form.pics.push(res[0]);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 文章详情
    getDetail() {
      this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        const { data } = res.data;
        this.detail = data[0];
        this.detail.created_at=moment(this.detail.created_at).format('YYYY-MM-DD HH:mm:ss')
      });
    },
    // 点击右侧文章加载文章详情
    handleDetail() {
      this.getpostComments();
      this.getDetail();
    },
    // 获取文章评论
    getpostComments() {
      this.$axios({
        url: `/posts/comments`,
        params: {
          post: this.$route.query.id,
          _limit: this.pageSize,
          _start: this.start
        }
      }).then(res => {
        const { data, total } = res.data;
        
        const arr=data.map(v=>{
          v.created_at=moment(v.created_at).format('YYYY-MM-DD HH:mm:ss')
          return v
        })
        this.postComments = data;
        this.total = total;
      });
    }
  },
  mounted() {
    // 获取文章详情
    this.getDetail();
    // 获取相关攻略列表
    this.$axios({
      url: "/posts/recommend"
    }).then(res => {
      const { data } = res.data;
      this.recommend = data;
    });
    // 获取文章评论数据
    this.getpostComments();
  },
  components: {
    CommentItem,
    Item
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
    .reminder{
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;
      font-size: 25px;
    }
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
        font-size: 35px;
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
      .box {
        position: relative;
        width: 130px;
        margin-bottom: 10px;
        padding: 10px;
        height: 10px;
        line-height: 10px;
        font-size: 12px;
        color: #909399;
        background: #f4f4f5;
        border: 1px solid #e0e0e3;
        border-radius: 5px;

        i {
          position: absolute;
          right: 5px;
          bottom: 8px;
          width: 15px;
          height: 15px;
          font-size: 18px;
          &:hover {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            text-align: center;
            background: #909399;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      textarea {
        width: 670px;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #c0c4cc;
      }
      .addimg_submint {
        margin-top: 10px;
        span {
          display: inline-block;
          width: 50px;
          height: 30px;
          line-height: 30px;
          background: #409eff;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    .comment_list {
      margin-top: 10px;
      padding: 20px;
      border: 1px solid #dddddd;
      border-bottom: 1px dashed #dddddd;
      .user {
        margin-bottom: 10px;
        font-size: 13px;
        img {
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          color: #666666;
        }
        i {
          color: #999;
        }
      }

      .content {
        position: relative;
        padding: 0 20px;
        p {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .content_img {
          padding: 5px;
          width: 80px;
          height: 80px;
          border: 1px dashed #dddddd;
          border-radius: 5px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .mian {
          &:hover span {
            display: block;
            color: #ffa500;
            cursor: pointer;
          }
          span {
            position: absolute;
            right: 10px;
            bottom: 10px;
            font-size: 14px;
            display: none;
            &:hover {
              display: block;
              color: #ffa500;
              cursor: pointer;
            }
          }
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

/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
</style>