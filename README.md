# el-table-roll
基于element的table滚动效果

## 使用方法
1. 实例化Roll
```js
this.roll = new Roll()
```

2. 限定el-table的外层节点，注意，暂时每个组件只能使用一个el-table
```js
this.roll.componentWrapperEl = this.$el
```

3. 传入数据
```js
this.roll.setData(this.tableData)
```

4. 离开页面时销毁
```js
beforeDestroy(){
  this.roll && this.roll.dispose()
}
```