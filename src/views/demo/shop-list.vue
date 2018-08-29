<template>
  <div class="mod-demo-echarts">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" @click="daochuShop()">导出商品</el-button>
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
        prop="shop_image"
        header-align="center"
        align="center"
        label="商品图片">
        <template slot-scope="scope">
          <img v-bind:src="scope.row.shop_image" style="height:50px;width:50px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="shop_name"
        header-align="center"
        align="center"
        width="350"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="cate_name"
        header-align="center"
        align="center"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="brand_name"
        header-align="center"
        align="center"
        label="品牌方">
      </el-table-column>
      <el-table-column
        prop="shop_gprice"
        header-align="center"
        align="center"
          label="供货价">
      </el-table-column>
      <el-table-column
        prop="bc_cprice"
        header-align="center"
        align="center"
        label="报关税金">
      </el-table-column>
      <el-table-column
        prop="shop_status"
        header-align="center"
        align="center"
        width="150"
        label="商品状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shop_status? false : true" active-text="上架" inactive-text="下架" @change="handleSwitch(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
  import AddOrUpdate from './shop-list-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          userName: ''
        },
        totalNum: 0,
        value3: true,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: 'http://jizhangyl.natapp1.cc/jizhangyl/shop/list',
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'size': this.pageSize || 10
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data.goodList
            this.totalPage = data.data.totalpage
            this.totalNum = data.data.totalpage * this.pageSize
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
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
            url: 'http://jizhangyl.natapp1.cc/jizhangyl/shop/delete',
            method: 'get',
            params: {
              'id': userIds[0]
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
      handleSwitch (data) {
        console.log(data.shop_status)
        let address = data.shop_status ? 'http://jizhangyl.natapp1.cc/jizhangyl/shop/up' : 'http://jizhangyl.natapp1.cc/jizhangyl/shop/down'
        console.log(address)
        this.dataListLoading = true
        this.$http({
          url: address,
          method: 'get',
          params: {
            'productId': data.id
          }
        }).then(({data}) => {
          this.getDataList()
          this.dataListLoading = false
        })
      },
      daochuShop () {
        window.open('http://jizhangyl.natapp1.cc/jizhangyl/shop/export')
      }
    }
  }
</script>

<style lang="scss">
  .mod-demo-echarts {
    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }
</style>
<style>
  img{
    width:100%;
  }
</style>
