<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
<<<<<<< HEAD
  // import qs from 'qs'
=======
  import qs from 'qs'
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: '',
          name: ''
        },
        dataRule: {
          name: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
<<<<<<< HEAD
    created () {
      console.log('123123')
    },
=======
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
    methods: {
      init (data) {
        this.visible = true
        this.dataForm.id = data || 0
        if (this.dataForm.id) {
          this.dataForm.id = data.id
          this.dataForm.name = data.name
        } else {
          this.dataForm.name = ''
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
<<<<<<< HEAD
          let url = this.dataForm.id ? '/cate/update' : '/cate/save'
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'POST',
              data: this.$http.adornData({
=======
          let url = this.dataForm.id ? 'http://jizhangyl.natapp1.cc/jizhangyl/cate/update' : 'http://jizhangyl.natapp1.cc/jizhangyl/cate/save'
          if (valid) {
            this.$http({
              url: url,
              method: 'POST',
              data: qs.stringify({
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
                'id': this.dataForm.id,
                'name': this.dataForm.name
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
