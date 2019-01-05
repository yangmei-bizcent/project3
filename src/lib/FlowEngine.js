const assert = require('assert')
const CONFIG_ERR = '流程配置错误，请联系管理员解决该问题'

export default class FlowEngine {

  static instance(flow) {
    if (!this._instace) {
      this._instace = new this()
    }
    this._instace.init(flow)
    return this._instace
  }

  isValidArray(arr) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(arr) && arr.length > 0
    } else {
      return Object.prototype.toString.call(arr) === "[object Array]" && arr.length > 0
    }
  }

  init(flow) {
    this.flow = flow
    this.currentState = null
    this.historyState = []
  }

  start(cb) {
    assert(cb && typeof cb === 'function')

    if (!this.flow || !this.isValidArray(this.flow)) {
      cb(CONFIG_ERR)
      return
    }
    this.historyState = []
    this.currentState = this.flow.find(value => value.startNode)
    this.historyState.push(this.currentState)
    cb(null, this.currentState)
  }

  nextState(onTransitionID, cb) {
    assert(cb && typeof cb === 'function')

    if (!onTransitionID || !this.currentState && !this.isValidArray(this.currentState.connectors)) {
      console.log(this.currentState, onTransitionID)
      cb(CONFIG_ERR)
      return
    }

    let transition = this.currentState.connectors.find(value => value.on == onTransitionID)
    let state = this.flow.find(value => value.id == transition.idOfTo)
    if (!state || state === this.currentState) {
      console.log(this.currentState, state)
      cb(CONFIG_ERR)
      return
    }

    this.historyState.push(state)
    this.currentState = state
    return cb(null, this.currentState)
  }

  preState(cb) {
    assert(cb && typeof cb === 'function')

    if (this.historyState.length < 1) {
      cb(null, null)
      return
    }
    this.historyState.pop()
    this.currentState = this.historyState[this.historyState.length - 1]
    cb(null, this.currentState)
  }

  end() {
    this.historyState = []
    this.currentState = null
  }
}