<template>
  <div class="mod-schedule">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.beanName" placeholder="bean名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%;">
      <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50">
      </el-table-column>
      <el-table-column
              prop="companyName"
              header-align="center"
              align="center"
              width="350"
              label="公司日文名称">
      </el-table-column>
      <el-table-column
              prop="companyAbbr"
              header-align="center"
              align="center"
              label="公司名简称">
      </el-table-column>
      <el-table-column
              prop="companyAddress"
              header-align="center"
              align="center"
              width="250"
              label="公司地址">
      </el-table-column>
      <el-table-column
              prop="legalPerson"
              header-align="center"
              align="center"
              label="公司法人">
      </el-table-column>
      <el-table-column
              prop="registeredFund"
              header-align="center"
              align="center"
              label="公司注册资本">
      </el-table-column>
      <el-table-column
              prop="depositBank"
              header-align="center"
              align="center"
              label="公司开户银行">
      </el-table-column>
      <el-table-column
              prop="bankAccount"
              header-align="center"
              align="center"
              label="银行账户">
      </el-table-column>
      <el-table-column
              prop="purchaseContact"
              header-align="center"
              align="center"
              label="采购联系人">
      </el-table-column>
      <el-table-column
              prop="contactPhone"
              header-align="center"
              align="center"
              label="联系电话">
      </el-table-column>
      <el-table-column
              prop="loanDate"
              header-align="center"
              align="center"
              label="货款账期">
      </el-table-column>
      <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="70"
              label="商品库">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goShop(scope.row.providerId)">进入</el-button>
        </template>
      </el-table-column>
      <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="100"
              label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.providerId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="totalNum"
      layout="total, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 弹窗, 日志列表 -->
    <log v-if="logVisible" ref="log"></log>
  </div>
</template>

<script>
  import AddOrUpdate from './supplier-add-or-update'
  import Log from './schedule-log'
  export default {
    data () {
      return {
        dataForm: {
          beanName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        totalNum: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        logVisible: false
      }
    },
    components: {
      AddOrUpdate,
      Log
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
<<<<<<< HEAD
          url: this.$http.adornUrl('/product/provider/list'),
          method: 'GET',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'size': this.pageSize
          })
=======
          url: 'http://jizhangyl.natapp1.cc/jizhangyl/product/provider/list',
          method: 'GET',
          params: {
            'page': this.pageIndex,
            'size': this.pageSize
          }
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
        }).then(({data}) => {
          console.log(data)
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
        console.log(this.pageIndex)
        console.log(val)
        this.pageSize = val
        this.pageIndex = 1
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (data) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(data)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.jobId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(ids)
          this.$http({
<<<<<<< HEAD
            url: this.$http.adornUrl('/product/provider/delete'),
=======
            url: 'http://jizhangyl.natapp1.cc/jizhangyl/product/provider/delete',
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
            method: 'GET',
            params: this.$http.adornParams({
              'providerId': ids[0]
            })
          }).then(({data}) => {
            console.log(data)
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
      // 进入商品库
      goShop (id) {
        // this.logVisible = true
        // this.$nextTick(() => {
        //   this.$refs.log.init()
        // })
        this.$router.push({path: '/sys-shop', query: {providerId: id}})
      }
    }
  }
</script>
