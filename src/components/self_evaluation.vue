<template>
    <div class="self_evaluation">
        <h3 class="hr">自我评价</h3>
        <div class="content" v-show="!isEditMode" @click="updataText">
            {{selfEvaluation}}
        </div>
        <div v-if="isEditMode">
            <div class="edit-box" contenteditable="true">{{selfEvaluation}}</div>
            <button class="submit-text" @click="submitText()">提交</button>
        </div>
    </div>
</template>
<script>
import mixins from '@/mixins/index'

export default {
  mixins: [mixins],
  data () {
    return {
      selfEvaluation: '', // 自我评价
      subscribe: null,
      isEditMode: true
    }
  },
  methods: {
    // 提交输入框内容到展示框
    submitText () {
      let text = document.querySelector('.edit-box').textContent
      if (text !== '') {
        this.selfEvaluation = text
        this.isEditMode = false
      } else {
        this.globalTip({
          type: 'warn',
          content: '请输入内容！'
        })
      }
    },
    // 重新编辑内容
    updataText () {
      this.isEditMode = true
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
    PubSub.subscribe('hidden', () => {
      this.isEditMode = false
    })
    PubSub.subscribe('editing', () => {
      if (!this.selfEvaluation) {
        this.isEditMode = true
      }
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style lang="stylus" scoped>
div.self_evaluation
  .content
    text-indent 2em
    cursor pointer
  .edit-box
    width 100%
    border 1px solid gray
    min-height 5vw
    outline none
    border-radius 3px
    margin 0
  .submit-text
    margin 5px 0
</style>
