<template>
  <div class="avatar-upload-root">
    <el-upload
      class="avatar-uploader flex-inline-center"
      action=""
      :show-file-list="false"
      :http-request="onUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar-uploader-icon">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    onUpload({ file }) {
      console.log('upload', file);
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
      this.$utils.upLoadFail(this, file, this.$store.state.userInfo.username, data => {
        console.log(data);
        this.imageUrl = 'https://' + data.Location
      }, data => {
        this.$message.error(this.$t('personal.avatarTip3'));
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.avatar-uploader {
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: $--main-color;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
