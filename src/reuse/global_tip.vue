<template>
  <div v-if="message.length > 0 && message[0].type && message[0].content" class="tip-wrap">
    <div v-for="(obj, index) in message" :key="index" class="tip-item tip-anim">
      <header :class="[`${obj.type}-tip`]">
      <div style="height:100%;font-weight:bold">
        {{titleMap[obj.type]}}
      </div>
      </header>
      <main style="font-size:14px;text-indent: 2em">
        {{obj.content}}
      </main>
    </div>
  </div>
</template>

<script>
const GlobalTip = {
  data () {
    return {
      message: [],
      titleMap: {
        notice: 'Notice',
        warn: 'Warn',
        success: 'Success',
        error: 'Error'
      },
      timer: undefined
    }
  },
  created () {
    PubSub.subscribe('g-tip', (msg, data) => {
      if (this.message.length > 0) {
        this.message = []
        clearTimeout(this.timer)
        this.timer = undefined
        setTimeout(() => {
          this.message.push(data)
          this.timer = setTimeout(() => {
            this.message.shift()
            clearTimeout(this.timer)
          }, 10000)
        })
      } else {
        this.message.push(data)
        this.timer = setTimeout(() => {
          this.message.shift()
          clearTimeout(this.timer)
        }, 10000)
      }
    })
  }
}
export default GlobalTip
</script>

<style lang="stylus" scoped>
.tip-wrap
  position: fixed;
  border-radius 5px
  top: 14px;
  right: 10px;
  width: 300px;
  header
    height: 25%
    padding: 0px 10px
    border-radius: 10px 10px 0 0;
  main
    height:75%
    padding: 10px 20px 0
    border-left: 1px solid #ccc
    border-right: 1px solid #ccc
    border-bottom: 1px solid #ccc
    border-radius: 0 0 10px 10px;
.notice-tip
  background-color #8aabf5
.success-tip
  background-color #7be17e
.warn-tip
  background-color #ffe000
.error-tip
  background-color #ff0000
.tip-item
  height: 100px;
  margin-bottom: 10px;
  position: absolute;
  width: 300px;
  right: -310px
  background-color: white
@keyframes tipEnter {
  0% {right: -310px}
  10% {right: 10px}
  100% {right: 10px}
}
.tip-anim
  animation-name tipEnter
  animation-duration 3s
  animation-iteration-count 2
  animation-direction alternate
</style>
