<template>
  <el-dialog
    title="仓库确认收货"  
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="供应商" prop="loanDate">
        <el-input v-model="dataForm.loanDate" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货款帐期" prop="loanDate">
        <el-input v-model="dataForm.loanDate" :disabled="true" placeholder="货款帐期"></el-input>
      </el-form-item>
      <el-table v-if="shopInfo.length" :data="shopInfo" border style="width: 100%">
        <el-table-column fixed prop="productJancode" label="商品JAN CODE">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称">
        </el-table-column>
        <el-table-column prop="productQuantity" label="采购数量" width="80">
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="18"><div class="grid-content bg-purple"><span style="font-size:16px">总计金额:</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"><span style="font-size:18px;color:#F56C6C">111.11</span></div></el-col>
      </el-row>
      <span style="font-size:20px;color:#303133">实收商品</span>
      <el-table v-if="shopInfo.length" :data="orderDetail" border style="width: 100%">
        <el-table-column fixed prop="productJancode" label="商品JAN CODE">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称">
        </el-table-column>
        <el-table-column prop="productQuantity" label="入库数量" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productQuantity" size="mini" placeholder="请输入采购数量"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="18"><div class="grid-content bg-purple"><span style="font-size:16px">实际应付:</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"><span style="font-size:18px;color:#F56C6C">111.11</span></div></el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitUpload()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import qs from 'qs'
  export default {
    data () {
      return {
        dataForm: [],
        visible: false,
        orderId: '',
        orderDetail: [],
        brand: {
          id: '',
          name: ''
        },
        shopInfo: [],
        dataRule: {
          shopName: [
            { required: true, message: '商品名不能为空', trigger: 'blur' }
          ],
          shopCount: [
            { required: true, message: '商品库存不能为空', trigger: 'blur' }
          ],
          shopJan: [
            { required: true, message: '商品JAN CODE不能为空', trigger: 'blur' }
          ],
          shopJweight: [
            { required: true, message: '商品净重量不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (data) {
        this.visible = true
        this.orderId = data.orderId || 0
        if (this.orderId) {
          this.dataForm.orderId = data.orderId
          this.loanDate = data.loanDate
        }
        this.getOrderDetail()
      },
      submitUpload () {
        this.$http({
          url: 'http://jizhangyl.natapp1.cc/jizhangyl/purchase/order/confirmOrder',
          method: 'POST',
          data: qs.stringify({
            'orderId': this.dataForm.orderId,
            'providerId': this.dataForm.providerId,
            'items': this.shopInfo
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
      },
      getOrderDetail () {
        console.log('getCatelist')
        this.$http({
          url: 'http://jizhangyl.natapp1.cc/jizhangyl/purchase/order/detail',
          method: 'get',
          params: {
            'orderId': this.orderId
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.orderDetail = data.data
            console.log(this.orderDetail)
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      supplierChange (data) {
        console.log(data)
      },
      isNumber (val) {
        var regPos = /^\d+(\.\d+)?$/
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
        if (regPos.test(val) || regNeg.test(val)) {
          return true
        } else {
          return false
        }
      },
      deleteShop (data) {
        console.log(this.shopInfo)
        for (var i = 0; i < this.shopInfo.length; i++) {
          if (this.shopInfo[i].productId === data.productId) {
            this.shopInfo.splice(i, 1)
          }
        }
        console.log(this.shopInfo)
      },
      querySearch (queryString, cb) {
        console.log('querySearch run ')
        if (!this.supplier.providerId) {
          this.$message.error('请先选择供应商')
          return
        }
        this.$http({
          url: 'http://jizhangyl.natapp1.cc/jizhangyl/purchase/order/findByNameOrJan',
          method: 'get',
          params: {
            'param': queryString,
            'providerId': this.supplier.providerId
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.suggestList = data.data
            cb(data.data)
          }
        })
      },
      handleSelect (item) {
        console.log('进入select事件')
        this.shopName = item.productName
        let shop = {'productId': item.productId, 'productName': item.productName, 'productJancode': item.productJancode, 'productQuantity': ''}
        this.shopInfo.push(shop)
        console.log(this.shopInfo)
      }
    }
  }
</script>
<style>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>