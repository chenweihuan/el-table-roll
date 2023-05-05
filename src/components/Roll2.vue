<template>
  <div style="width: 600px;margin-left: 20px;">
    <el-button @click="changeData">修改数据吧</el-button>
    <el-table :data="tableData" stripe style="width: 100%" @mouseenter.native="mouseenter"
      @mouseleave.native="mouseleave">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Roll from './../roll'

export default {
  data () {
    return {
      tableData: [],
      sourceData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄1'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄2'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄3'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄4'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄5'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄6'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄7'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄8'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄9'
      }]
    }
  },
  mounted () {
    this.tableData = this.sourceData
    this.roll = new Roll()
    this.roll.componentWrapperEl = this.$el
    this.roll.setData(this.tableData)
  },
  beforeDestroy(){
    this.roll && this.roll.dispose()
  },
  methods: {
    mouseenter () {
      this.roll && this.roll.pause()
    },
    mouseleave () {
      this.roll && this.roll.goOn()
    },
    changeData () {
      let num = Math.ceil(Math.random() * this.sourceData.length)
      console.log(`数据总条数: ${num}`)
      this.tableData = this.sourceData.slice(0, num)
      this.roll.setData(this.tableData)
    }
  }
}
</script>
