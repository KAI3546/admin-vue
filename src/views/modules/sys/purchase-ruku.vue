<template>
  <el-dialog
    title="仓库确认收货"  
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
<<<<<<< HEAD
      <el-form-item label="供应商" prop="prviderName">
        <el-input v-model="dataForm.prviderName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货款帐期/天" prop="loanDate">
        <el-input v-model="dataForm.loanDate" :disabled="true" placeholder="货款帐期"></el-input>
      </el-form-item>
      <el-table v-if="orderDetail.length" :data="orderDetail" border style="width: 100%">
=======
      <el-form-item label="供应商" prop="loanDate">
        <el-input v-model="dataForm.loanDate" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货款帐期" prop="loanDate">
        <el-input v-model="dataForm.loanDate" :disabled="true" placeholder="货款帐期"></el-input>
      </el-form-item>
      <el-table v-if="shopInfo.length" :data="shopInfo" border style="width: 100%">
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
        <el-table-column fixed prop="productJancode" label="商品JAN CODE">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称">
        </el-table-column>
<<<<<<< HEAD
        <el-table-column prop="productPrice" label="商品金额">
        </el-table-column>
        <el-table-column prop="productQuantity" label="采购数量" width="80">
        </el-table-column>
      </el-table>
      <el-row :gutter="20">
        <el-col :span="4" :push="17"><div class="grid-content bg-purple"><span style="font-size:16px">总计金额:</span></div></el-col>
        <el-col :span="4" :push="17"><div class="grid-content bg-purple-light"><span style="font-size:18px;color:#F56C6C">{{OrderTotalAmount}}</span></div></el-col>
      </el-row>
      <span style="font-size:20px;color:#303133">实收商品</span>
      <el-table v-if="orderDetail.length" :data="orderDetail" border style="width: 100%">
=======
        <el-table-column prop="productQuantity" label="采购数量" width="80">
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="18"><div class="grid-content bg-purple"><span style="font-size:16px">总计金额:</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"><span style="font-size:18px;color:#F56C6C">111.11</span></div></el-col>
      </el-row>
      <span style="font-size:20px;color:#303133">实收商品</span>
      <el-table v-if="shopInfo.length" :data="orderDetail" border style="width: 100%">
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
        <el-table-column fixed prop="productJancode" label="商品JAN CODE">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称">
        </el-table-column>
<<<<<<< HEAD
        <el-table-column prop="productPrice" label="商品金额">
        </el-table-column>
        <el-table-column prop="productQuantity" label="入库数量" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.actualNum" size="mini" placeholder="请输入采购数量"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20">
        <el-col :span="4" :push="17"><div class="grid-content bg-purple"><span style="font-size:16px">总计金额:</span></div></el-col>
        <el-col :span="4" :push="17"><div class="grid-content bg-purple-light"><span style="font-size:18px;color:#F56C6C">{{isNaN(ActualTotalAmount) ? 0 : ActualTotalAmount}}</span></div></el-col>
=======
        <el-table-column prop="productQuantity" label="入库数量" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productQuantity" size="mini" placeholder="请输入采购数量"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="18"><div class="grid-content bg-purple"><span style="font-size:16px">实际应付:</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"><span style="font-size:18px;color:#F56C6C">111.11</span></div></el-col>
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitUpload()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
<<<<<<< HEAD
  // import qs from 'qs'
  export default {
    data () {
      return {
        dataForm: {},
=======
  import qs from 'qs'
  export default {
    data () {
      return {
        dataForm: [],
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
        visible: false,
        orderId: '',
        orderDetail: [],
        brand: {
          id: '',
          name: ''
        },
        shopInfo: [],
<<<<<<< HEAD
        dataRule: {}
      }
    },
    computed: {
      OrderTotalAmount () {
        let total = 0
        for (var i = 0; i < this.orderDetail.length; i++) {
          total = total + (this.orderDetail[i].productQuantity * this.orderDetail[i].productPrice)
        }
        return total
      },
      ActualTotalAmount () {
        let total = 0
        for (var i = 0; i < this.orderDetail.length; i++) {
          total = total + (this.orderDetail[i].productPrice * this.orderDetail[i].actualNum)
        }
        return total
=======
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
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
      }
    },
    methods: {
      init (data) {
<<<<<<< HEAD
        console.log(data)
=======
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
        this.visible = true
        this.orderId = data.orderId || 0
        if (this.orderId) {
          this.dataForm.orderId = data.orderId
<<<<<<< HEAD
          this.dataForm.loanDate = data.loanDate
          this.dataForm.prviderName = data.providerName
=======
          this.loanDate = data.loanDate
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
        }
        this.getOrderDetail()
      },
      submitUpload () {
<<<<<<< HEAD
        var shopInfo = []
        for (var i = 0; i < this.orderDetail.length; i++) {
          shopInfo[i].productId = this.orderDetail[i].productId
          shopInfo[i].productQuantity = this.orderDetail[i].actualNum
        }
        this.$http({
          url: this.$http.adornUrl('/purchase/order/confirmOrder'),
          method: 'POST',
          data: this.$http.adornData({
            'orderId': this.dataForm.orderId,
            'providerId': this.dataForm.providerId,
            'items': shopInfo
=======
        this.$http({
          url: 'http://jizhangyl.natapp1.cc/jizhangyl/purchase/order/confirmOrder',
          method: 'POST',
          data: qs.stringify({
            'orderId': this.dataForm.orderId,
            'providerId': this.dataForm.providerId,
            'items': this.shopInfo
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
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
<<<<<<< HEAD
        this.$http({
          url: this.$http.adornUrl('/purchase/order/detail'),
          method: 'get',
          params: this.$http.adornParams({
            'orderId': this.orderId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.orderDetail = data.data
            console.log('orderDetail=')
=======
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
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
            console.log(this.orderDetail)
          } else {
            this.$message.error(data.msg)
          }
        })
<<<<<<< HEAD
=======
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
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
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