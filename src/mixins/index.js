export default {
  methods: {
    /**
     * 点击对应名称自动进入编辑模式并自动聚焦
     * @param {String} bindKey 双向绑定的key值
     * @param {String} refName 需要自动聚焦的ref
     */
    inputEdit (bindKey, refName) {
      if (bindKey) {
        this[bindKey] = undefined
      }
      setTimeout(() => {
        if (this.$refs[refName] instanceof Array) {
          this.$refs[refName][0].focus()
        } else {
          this.$refs[refName].focus()
        }
      })
    },
    globalTip (msg) {
      PubSub.publish('g-tip', msg)
    }
  }
}
