const INTIT = Symbol('init')
const ROLL = Symbol('roll')

const wait = time => new Promise(resolve => setTimeout(resolve, time))

class Rolll {
  // 内部使用的变量
  _translateY = 0 // 总滚动距离
  _rowHeight = 0 // 单滚动距离
  _index = 1 // 滚动至哪一项
  _data = [] // 传进来的数据
  _pause = false // 是否停止定时器

  // 默认配置
  interval = 2000 // 滚动间隔
  duration = 1000 // 滚动时长
  delay = 0 // 动画执行延迟时间
  bodyClass = '.el-table__body'
  rowClass = '.el-table__row'
  tableWrapperClass = '.el-table__body-wrapper'
  maxRow = 5 // table显示最多行数
  // 因为使用 querySelector+class 获取 DOM，如果 document 中有多个同名列表，
  // 就会获取到不正确的 DOM，因此可以传入当前组件的根节点 el 限定范围。
  // 因此一个组件只能用一个el-table，如果需要用到多个el-table，需写在不同的组件上
  componentWrapperEl = window.document // 限定范围dom节点

  constructor (rollOption = {}) {
    this[INTIT](rollOption)
  }
  [INTIT] ({ ...args }) {
    Object.keys(args).forEach(key => {
      // 过滤无用的配置项，防止污染
      if (this[key] !== undefined) {
        this[key] = args[key]
      }
    })
    // 滚动时间大于滚动间隔，滚动时间重定义为滚动间隔小10ms
    if (this.duration >= this.interval) {
      console.error('duration must less than interval:', {
        duration: this.duration,
        interval: this.interval
      })
      this.duration = this.interval - 10
    }
  }
  [ROLL] () {
    const rowBodyEl = this.componentWrapperEl.querySelector(this.bodyClass)
    if (this._data.length - this.maxRow < this._index) {
      this._translateY = 0
      this._index = 1
    } else {
      this._translateY = this._index * this._rowHeight
      this._index++
    }
    rowBodyEl.style.transform = `translate3d(0, ${-this._translateY}px, 0)`
  }
  // 更新每行的高度、添加对应style
  _updateTableCss () {
    const rowDom = this.componentWrapperEl.querySelector(this.rowClass)
    if (!rowDom) return // 传进来的数据为空，rowDom就为null，不往下执行
    this._rowHeight = rowDom.offsetHeight

    const rowBodyEl = this.componentWrapperEl.querySelector(this.bodyClass)
    rowBodyEl.style.transition = `transform ${this.duration / 1000}s ease-in-out`

    const tableWrapperEl = this.componentWrapperEl.querySelector(this.tableWrapperClass)
    tableWrapperEl.style.maxHeight = `${this.maxRow * this._rowHeight}px`

    // 防止抖动的方法，给父级加防止抖动样式
    // TODO:找出抖动和文字模糊的效果
    this.componentWrapperEl.style.backfaceVisibility = 'hidden';
    this.componentWrapperEl.style.perspective = '1000px';
    this.componentWrapperEl.style.transform = 'translateZ(0)';
  }
  async _start () {
    // TODO: 处理动画延迟时间较长且数据频繁更新的情况
    await wait(this.delay)
    this._updateTableCss()
    this._play()
  }
  _play () {
    // 数据长度小于table显示的最多行数，不需要滚动
    if (this._data.length <= this.maxRow) return
    if (this._pause) return
    this.timer = setTimeout(() => {
      console.log(1)
      this[ROLL]()
      this._play()
    }, this.interval)
  }
  // 重置内部变量
  _resetVar () {
    this._resetCss()
    this._data = []
    this._index = 1
    this._translateY = 0
    this._pause = false
    this._rowHeight = 0
  }
  // 重置样式
  _resetCss () {
    const rowBodyEl = this.componentWrapperEl.querySelector(this.bodyClass)
    rowBodyEl.style.transition = `none`
    rowBodyEl.style.transform = `translate3d(0, 0, 0)`
  }
  // 暂停定时器
  pause () {
    if (this.timer) {
      this._pause = true
      clearTimeout(this.timer)
      this.timer = null
    }
  }
  // 继续定时器
  goOn () {
    this._pause = false
    this._play()
  }

  // 销毁
  dispose () {
    this.pause()
  }
  // 设置数据
  setData (data) {
    if (Array.isArray(data)) {
      // 传入的componentWrapperEl必须是dom节点
      if (!(this.componentWrapperEl instanceof Element)) {
        console.error('componentWrapperEl must be Element:', {
          componentWrapperEl: this.componentWrapperEl
        })
        return
      }
      // 重置数据，重新开始滚动
      this.pause()
      this._resetVar()
      this._data = data
      this._start()
    } else {
      console.error('data type must be array:' + data)
    }
  }
}

export default Rolll