<template>
	<div class="mod-demo-echarts">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="searchKeyword" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchPurchase()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="orderId"
        header-align="center"
        align="center"
        label="商品Jan Code">
      </el-table-column>
      <el-table-column
        prop="orderAmount"
        header-align="center"
        width="85"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="realAmount"
        header-align="center"
        align="center"
        width="85"
        label="当前库存">
      </el-table-column>
      <el-table-column
        prop="loanDate"
        header-align="center"
        align="center"
        width="80"
        label="在途库存">
      </el-table-column>
      <el-table-column
        prop="payDate"
        header-align="center"
        align="center"
        label="昨日出库数">
      </el-table-column>
      <el-table-column
        prop="providerName"
        header-align="center"
        align="center"
        width="150"
        label="过去7天平均日出库数">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="出库记录">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.orderStatus != 4 " round size="mini" @click="rukuHandle(scope.row)">点击进入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="totalNum"
      layout="total, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <ruku v-if="rukuVisible" ref="ruku" @refreshDataList="getDataList"></ruku>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          userName: ''
        },
        searchKeyword: '',
        query: {
          orderId: '',
          keyword: ''
        },
        totalNum: 0,
        value3: true,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        rukuVisible: false
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: '',
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'size': this.pageSize || 10
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data.data
            this.totalPage = data.data.totalPage
            this.totalNum = data.data.totalPage * this.pageSize
          } else {
            this.dataList = []
            this.totalPage = 0
            this.totalNum = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      rukuHandle (id) {
        this.rukuVisible = true
        this.$nextTick(() => {
          this.$refs.ruku.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: 'http://jizhangyl.natapp1.cc/jizhangyl/purchase/order/cancel',
            method: 'get',
            params: {
              'orderId': userIds[0]
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
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
      searchPurchase () {
        this.dataListLoading = true
        if (this.searchKeyword.length > 0) {
          if (this.searchKeyword.length === 19 && this.isNumber(this.searchKeyword)) {
            this.query.orderId = this.searchKeyword
            this.query.keyword = ''
            this.pageIndex = 1
          } else {
            this.query.orderId = ''
            this.query.keyword = this.searchKeyword
            this.pageIndex = 1
          }
          this.$http({
            url: 'http://jizhangyl.natapp1.cc/jizhangyl/purchase/order/findByOrderIdOrProviderName',
            method: 'get',
            params: this.$http.adornParams({
              'orderId': this.query.orderId,
              'providerName': this.query.keyword,
              'page': this.pageIndex,
              'size': this.pageSize || 10
            })
          }).then(({data}) => {
            console.log(data)
            this.dataList = []
            if (data && data.code === 0) {
              this.isNumber(this.searchKeyword) ? this.dataList.push(data.data.data) : this.dataList = data.data.data
              this.totalPage = data.data.totalPage
              this.totalNum = data.data.totalPage * this.pageSize
            } else {
              this.dataList = []
              this.totalPage = 0
              this.totalNum = 0
            }
            console.log(this.dataList)
            this.dataListLoading = false
          })
        } else {
          console.log('进入getData')
          this.getDataList()
        }
      }
    }
  }
</script>  

<style>
</style>