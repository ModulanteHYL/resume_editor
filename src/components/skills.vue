<template>
    <div class="skills">
        <h3 class="hr">专业技能</h3>
        <ul class="skills_lists">
            <!-- 展示区 -->
            <li v-for="(obj,index) in skillInfo" :key='index'>
                <span style="white-space:nowrap">
                  <h4 v-show="obj.skillName" class="name m-pointer" @click="obj.skillName = undefined;inputEdit(null, `skillNameRef${index}`)">{{obj.skillName}}</h4>
                  <input
                    :ref="'skillNameRef'+index"
                    style="line-height: 16px;"
                    v-show="!obj.skillName"
                    type="text"
                    maxlength="20"
                    placeholder="技能名称..."
                    @blur="obj.skillName = $event.target.value"
                    @keypress.enter="obj.skillName = $event.target.value"
                    >
                  :
                </span>
                <span style="width: 72%">
                  <p v-show="obj.content" class="describe m-pointer" @click="obj.content = undefined;inputEdit(null, `skillDescRef${index}`)">{{obj.content}}
                    <input :id="index" type="button" value="删除" @click="deleteOne($event)">
                  </p>
                  <input
                    :ref="'skillDescRef'+index"
                    style="width: 100%; line-height:16px"
                    v-show="!obj.content"
                    type="text"
                    placeholder="技能使用情况描述.."
                    @blur="obj.content = $event.target.value"
                    @keypress.enter="obj.content = $event.target.value"
                    >
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
import mixins from '@/mixins/index'

export default {
  mixins: [mixins],
  data () {
    return {
      hiddenAll: false, // 控制按钮显示
      hiddenClass: 'hidden',
      skillName: '', // 技能名称
      content: '', // 技能描述
      skillInfo: [], // 所有技能信息
      subscribe: null
    }
  },
  methods: {
    // 添加新技能
    addOne () {
      if (this.skillInfo.length > 0) {
        const length = this.skillInfo.length
        if (!this.skillInfo[length - 1].skillName || !this.skillInfo[length - 1].content) {
          alert('存在没有编辑的技能项，请编辑完后再添加')
          return
        }
      }
      this.skillInfo.push(
        {
          skillName: '',
          content: ''
        }
      )
    },
    // 删除该条内容
    deleteOne (e) {
      if (confirm('确定要删除吗?')) {
        this.skillInfo.splice(e.target.id, 1)
      }
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      this.skillInfo = JSON.parse(resume)['skills']
    } else {
      this.skillInfo.push({
        skillName: '',
        content: ''
      })
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {skills: Object.assign([], this.skillInfo)})
    })
    PubSub.subscribe('hidden', (msg, data) => {
      this.hiddenAll = true
    })
    PubSub.subscribe('addOneSkill', (msg, data) => {
      this.addOne()
    })
    PubSub.subscribe('editing', (msg, data) => {
      this.hiddenAll = false
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
