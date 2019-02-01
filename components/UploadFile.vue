<template>
  <div class="avatar-upload-root">
    <el-upload
      v-loading="loading"
      drag
      action=""
      :show-file-list="false"
      :http-request="onUpload">
      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar-uploader-icon">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      loading: false
    };
  },
  methods: {
    onUpload({ file }) {
      const type = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!type) {
        this.$message.error(this.$t('personal.avatarTip1'));
        return
      }
      if (!isLt2M) {
        this.$message.error(this.$t('personal.avatarTip2'));
        return
      }
      this.loading = true
      this.$utils.upLoadFile(this, file, this.$store.state.userInfo.username, data => {
        console.log(data);
        this.imageUrl = 'https://' + data.Location;
        this.$axios.post('/api/v1/user/update', { avatar: 'https://' + data.Location }).then( res => {
          console.log('更新头像数据', res.data);
          if (res.data.code == 200) {
            this.$utils.deleteFile(this, this.$store.state.userInfo.avatar.split('.myqcloud.com/')[1], data => {
              this.$utils.getUserInfo(this, () => {
                this.$message.success(this.$t('personal.avatarTip4'));
                this.loading = false
              }, '/personal')
            }, () => {})
          }
          this.loading = false
          this.$utils.apiErr(this, res.data)
        })
      }, data => {
        this.$message.error(this.$t('personal.avatarTip3'));
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 20px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: $--main-color;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}
.el-upload__tip {
  margin-top: -10px;
}
</style>
