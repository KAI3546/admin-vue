<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="商品名称" prop="paramKey" v-if="dataForm.id">
        <el-input v-model="dataForm.productName" disabled="" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品JAN CODE" prop="paramValue" v-if="dataForm.id">
        <el-input v-model="dataForm.productJancode" disabled="" placeholder="商品JAN CODE"></el-input>
      </el-form-item>
      <el-form-item label="一箱数量" prop="remark" v-if="dataForm.id">
        <el-input v-model="dataForm.boxQuantity" disabled="" placeholder="一箱数量"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" v-if="!dataForm.id">
        <el-select v-model="cate.id" placeholder="请选择" @change="getShopByCateId(cate.id)">
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品列表" v-if="!dataForm.id">
        <el-select v-model="shop.id" placeholder="请选择">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.shop_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购价" prop="cronExpression">
        <el-input v-model="dataForm.purchasePrice"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="cronExpression">
        <el-input v-model="dataForm.productStock"></el-input>
      </el-form-item>
      <el-form-item label="报价最后更新时间" prop="remark" v-if="dataForm.id">
        <el-input v-model="dataForm.updateTime" disabled=""></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import qs from 'qs'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: '',
          productName: '',
          productId: '',
          providerId: '',
          productStock: '',
          productJancode: '',
          boxQuantity: '',
          purchasePrice: '',
          updateTime: ''
        },
        cate: {
          id: '',
          name: ''
        },
        shop: {
          id: '',
          name: ''
        },
        cateList: [],
        shopList: [],
        dataRule: {
//          paramKey: [
//            { required: true, message: '参数名不能为空', trigger: 'blur' }
//          ],
//          paramValue: [
//            { required: true, message: '参数值不能为空', trigger: 'blur' }
//          ]
        }
      }
    },
    methods: {
      init (data) {
        this.dataForm.id = data || 0
        this.visible = true
        if (this.dataForm.id) {
          this.dataForm.id = data.id
          this.dataForm.productName = data.productName
          this.dataForm.productId = data.productId
          this.dataForm.providerId = data.providerId
          this.dataForm.productStock = data.productStock
          this.dataForm.productJancode = data.productJancode
          this.dataForm.boxQuantity = data.boxQuantity
          this.dataForm.purchasePrice = data.purchasePrice
          this.dataForm.updateTime = data.updateTime
        } else {
          this.dataForm.providerId = this.$route.query.providerId
          this.$http({
            url: 'http://jizhangyl.natapp1.cc/jizhangyl/cate/list',
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.cateList = data.data
            } else {
              this.$message.error(data.msg)
            }
          })
        }

//        this.$nextTick(() => {
//          if (this.dataForm.id) {
//            this.$http({
//              url: this.$http.adornUrl(`/sys/config/info/${this.dataForm.id}`),
//              method: 'get',
//              params: this.$http.adornParams()
//            }).then(({data}) => {
//              if (data && data.code === 0) {
//                this.dataForm.paramKey = data.config.paramKey
//                this.dataForm.paramValue = data.config.paramValue
//                this.dataForm.remark = data.config.remark
//              }
//            })
//          }
//        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.id) {
              this.$http({
                url: 'http://jizhangyl.natapp1.cc/jizhangyl/product/provider/repoUpdate',
                method: 'post',
                data: qs.stringify({
                  'id': this.dataForm.id,
                  'providerId': this.dataForm.providerId,
                  'productId': this.dataForm.productId,
                  'purchasePrice': this.dataForm.purchasePrice,
                  'productStock': this.dataForm.productStock
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
            } else {
              this.$http({
                url: 'http://jizhangyl.natapp1.cc/jizhangyl/product/provider/repoAdd',
                method: 'post',
                data: qs.stringify({
                  'providerId': this.dataForm.providerId,
                  'productId': this.shop.id,
                  'purchasePrice': this.dataForm.purchasePrice,
                  'productStock': this.dataForm.productStock
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
          }
        })
      },
      getShopByCateId (id) {
        console.log(this.cate.id)
        if (id) {
          this.$http({
            url: 'http://jizhangyl.natapp1.cc/jizhangyl/shop/findByCateId',
            method: 'get',
            params: {
              'id': id,
              'page': 1,
              'size': 500
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.shopList = data.data.shopList
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      }
    }
  }
</script>
