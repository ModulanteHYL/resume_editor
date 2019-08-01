<template>
    <div class="skills">
        <h3 class="hr">专业技能</h3>
        <ul class="skills_lists">
            <!-- 展示区 -->
            <li v-for="(obj,index) in skillInfo" :key='index'>
                <h4 class="name">{{obj.skillName}}:</h4>
                <p class="describe">{{obj.content}} <input :id="index" type="button" value="删除" @click="deleteOne($event)"></p>
            </li>
            <!-- 输入区 -->
            <li v-if="newAdd" :class="[hiddenAll? hiddenClass:'']">
                <input class="title-style" placeholder="技能名称..." v-model="skillName">:
                <div class="content-style" contenteditable="plaintext-only" autocomplete="off"></div>
                <button class="submit-content" @click="contentDetection()">提交</button>
            </li>
        </ul>
        <div class="add" v-show="!newAdd" :class="[hiddenAll? hiddenClass:'']">
            <div @click="addOne">添加新技能</div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      hiddenAll: false, // 控制按钮显示
      hiddenClass: 'hidden',
      newAdd: true, // 控制输入框是否显示
      skillName: '', // 技能名称
      content: '', // 技能描述
      skillInfo: [], // 所有技能信息
      subscribe: null
    }
  },
  methods: {
    // 添加新技能
    addOne () {
      if (this.newAdd) {
        alert('已存在未编辑的输入框，不能添加！')
      } else {
        this.newAdd = true
      }
    },
    // 输入框内容提交检测和提交处理
    contentDetection (event) {
      let content = document.querySelector('.content-style').textContent
      this.content = content
      if (this.skillName === '' || this.content === '') {
        alert('请输入完整的技能名称和内容后再提交！')
        return
      }
      this.skillInfo.push({skillName: this.skillName, content: this.content})
      this.newAdd = false
    },
    // 删除该条内容
    deleteOne (e) {
      this.skillInfo.splice(e.target.id, 1)
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      this.skillInfo = JSON.parse(resume)['skills']
      this.newAdd = false
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {skills: Object.assign([], this.skillInfo)})
    })
    PubSub.subscribe('hidden', (msg, data) => {
      this.hiddenAll = true
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style scoped lang="stylus">
div.skills
  .add
    height 1.8rem
    border 2px dashed gray
    text-align center
    div
      margin 0
      cursor pointer
      user-select none /* Chrome/Safari/Opera */
      &:hover
        height 100%
        background gray
        color white
      &:active
        background rgb(150,150,150)
  .skills_lists
      padding-left 20px
      .submit-content
        height 1.8rem
      li
        display flex
        line-height 1.5em
        h4.name
          display inline-block
        p.describe
          max-width 100%
          word-break break-all
          &:hover input[type='button']
            display inline-block
          input[type='button']
            width 5vw
            outline none
            display none
</style>
