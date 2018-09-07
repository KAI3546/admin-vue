<<<<<<< HEAD
<template>
  <div class="block">
   	<div class="div-border clearfix">
   		<el-date-picker
      v-model="date1"
      type="daterange"
      align="right"
      unlink-panels
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
	    </el-date-picker>
	    <el-row>
			  <el-button type="primary" @click="CustomsExportOrder()">海关备案导出订单</el-button>
			</el-row>
   	</div>
   	<div class="div-border clearfix">
   		<el-date-picker
      v-model="date2"
      type="daterange"
      align="right"
      value-format="yyyy-MM-dd HH:mm:ss"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
	    </el-date-picker>
	    <el-row>
			  <el-button type="primary" @click="WarehouseExportOrder()">仓库打包导出订单</el-button>
			</el-row>
   	</div>
    <div>
      <el-row>
        <el-button type="primary" @click="handleDownloadBuyer()">代购订单导入模板下载</el-button>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-button type="primary" @click="handleDownloadDelivery()">仓库发货模板下载</el-button>
      </el-row>
    </div>
    <div class="div-border clearfix">
      <el-select v-model="date3" placeholder="请选择">
        <el-option
          v-for="item in dateList"
          :value="item">
        </el-option>
      </el-select>
      <el-row>
        <el-button type="primary" @click="handleShoper()">导出至商家</el-button>
      </el-row>
    </div>
    <div class="div-border clearfix">
      <el-upload
        class="upload-demo"
        drag
        :http-request="ShopfileUpload"
        action="https://www.jizhangyl.com/jizhangyl/order/report/importFromBusiness">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">商家导入订单</div>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <div class="div-border clearfix">
      <el-upload
        class="upload-demo"
        drag
        :http-request="UserfileUpload"
        action="https://www.jizhangyl.com/jizhangyl/template/uploadBuyer">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">代购订单导入</div>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <div class="div-border clearfix">
      <el-upload
        class="upload-demo"
        drag
        :http-request="CangkufileUpload"
        action="https://www.jizhangyl.com/jizhangyl/template/uploadDelivery">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">仓库发货模板导入</div>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        date1: '',
        date2: '',
        date3: '',
        dateList: {}
      }
    },
    created () {
      this.$http({
        url: this.$http.adornUrl('/order/report/findDateList'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 0) {
          this.dateList = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    methods: {
      CustomsExportOrder () {
        window.open('https://www.jizhangyl.com/jizhangyl/order/report/exportForCustoms?startTime=' + this.date1[0] + '&endTime=' + this.date1[1])
      },
      WarehouseExportOrder () {
        window.open('https://www.jizhangyl.com/jizhangyl/order/report/exportForRepository?startTime=' + this.date2[0] + '&endTime=' + this.date2[1])
      },
      ShopfileUpload (data) {
        this.$http({
          url: this.$http.adornUrl('/product/provider/findByProviderId'),
          method: 'get',
          data: data.file
        }).then(({data}) => {
          if (data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      handleDownloadBuyer () {
        this.$http({
          url: this.$http.adornUrl('/template/downloadBuyer'),
          method: 'get'
        }).then(({data}) => {
          if (data.code === 0) {
            window.open(data.data)
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      handleDownloadDelivery () {
        this.$http({
          url: this.$http.adornUrl('/template/downloadDelivery'),
          method: 'get'
        }).then(({data}) => {
          if (data.code === 0) {
            window.open(data.data)
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      UserfileUpload (data) {
        this.$http({
          url: this.$http.adornUrl('/template/uploadBuyer'),
          method: 'POST',
          data: data.file
        }).then(({data}) => {
          if (data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      CangkufileUpload (data) {
        this.$http({
          url: this.$http.adornUrl('/template/uploadDelivery'),
          method: 'POST',
          data: data.file
        }).then(({data}) => {
          if (data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      handleShoper () {
        window.open('https://www.jizhangyl.com/jizhangyl//order/report/exportForBusiness?date' + this.date3)
      }
    }
  }
</script>
<style type="text/css">
	.div-border{
		margin-bottom: 2em;
	}
	.el-date-editor .el-range-separator {
    width: 8%;
}
  .el-range-editor--medium.el-input__inner {
    float: left;
	}
	.el-row{
		float: left;
    margin-left: 20px;
	}
	.div-border:nth-of-type(2) .el-button--primary {
    color: #fff;
    background-color: #17b354d4;
    border-color: #17b354;
=======
<template>
  <div class="block">
   	<div class="div-border clearfix">
   		<el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
	    </el-date-picker>
	    <el-row>
			  <el-button type="primary" @click="CustomsExportOrder()">海关备案导出订单</el-button>
			</el-row>
   	</div>
   	<div class="div-border clearfix">
   		<el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
	    </el-date-picker>
	    <el-row>
			  <el-button type="primary" @click="WarehouseExportOrder()">仓库打包导出订单</el-button>
			</el-row>
   	</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value6: '',
        value7: ''
      }
    },
    methods:{
    	CustomsExportOrder () {
        window.open('http://jizhangyl.natapp1.cc/jizhangyl/shop/export')
     },
     WarehouseExportOrder () {
        window.open('http://jizhangyl.natapp1.cc/jizhangyl/shop/export')
     }
    }
  }
</script>
<style type="text/css">
	.div-border{
		margin-bottom: 2em;
	}
	.el-date-editor .el-range-separator {
    width: 8%;
}
  .el-range-editor--medium.el-input__inner {
    float: left;
	}
	.el-row{
		float: left;
    margin-left: 20px;
	}
	.div-border:nth-of-type(2) .el-button--primary {
    color: #fff;
    background-color: #17b354d4;
    border-color: #17b354;
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
	}
</style>