<template>
    <div class="self_evaluation">
        <h3 class="hr">自我评价</h3>
        <section class="content" v-show="selfEvaluation" @click="updataText">
            {{selfEvaluation}}
        </section>
        <div v-if="!selfEvaluation">
            <div class="edit-box" contenteditable="true"></div>
            <button class="submit-text" @click="submitText()">提交</button>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selfEvaluation: '', // 自我评价
      subscribe: null
    }
  },
  methods: {
    // 提交输入框内容到展示框
    submitText () {
      let text = document.querySelector('.edit-box').textContent
      if(text!=''){
        this.selfEvaluation = text
      }
      else{
        alert('请输入内容！')
      }
    },
    // 重新编辑内容
    updataText () {
      this.selfEvaluation = ''
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    let list = ['selfEvaluation']
    if (resume) {
      let self = JSON.parse(resume)['self']
      list.map(item => {
        this[item] = self[item]
      })
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      let self = {
        selfEvaluation: this.selfEvaluation
      }
      PubSub.publish('submitData', {self: Object.assign({}, self)})
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style lang="stylus">
div.self_evaluation
  .content
    text-indent 2em
    cursor pointer
  .edit-box
    width 100%
    border 1px solid gray
    min-height 10vw
    outline none
    border-radius 3px
    margin 0
  .submit-text
    margin 5px 0
</style>
