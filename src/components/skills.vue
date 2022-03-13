<template>
    <div class="skills">
        <h3 class="hr">专业技能</h3>
        <ul class="skills_lists">
            <li v-for="(obj,index) in skillInfo" :key='index' v-border-tip="isDelete">
                <span style="white-space:nowrap">
                  <h4 v-show="obj.skillName" v-coms-pointer class="name" @click="obj.skillName = undefined;inputEdit(null, `skillNameRef${index}`)">{{obj.skillName}}</h4>
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
                <span style="width: 90%">
                  <p v-show="obj.content" v-coms-pointer class="describe" @click="obj.content = undefined;inputEdit(null, `skillDescRef${index}`)">{{obj.content}}</p>
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
                <div v-if="isDelete" v-delete-btn @click="skillInfo.splice(index,1)"></div>
            </li>
        </ul>
        <div>
          <SkillsTemplateVue v-if="isAdd" @addOneSkill="addOneSkill"></SkillsTemplateVue>
        </div>
    </div>
</template>
<script>
import mixins from '@/mixins/index'
import SkillsTemplateVue from '@/reuse/skills_template.vue'

export default {
  mixins: [mixins],
  data () {
    return {
      hiddenAll: false, // 控制按钮显示
      hiddenClass: 'hidden',
      skillInfo: [
        // {
        //   skillName: '', // 技能名称
        //   content: '', // 技能描述
        // }
      ], // 所有技能信息
      subscribe: null,
      isAdd: false,
      isDelete: false
    }
  },
  components: {
    SkillsTemplateVue
  },
  methods: {
    addOneSkill (data) {
      this.skillInfo.push(data)
      this.closeAddOneSkill()
    },
    openAddOneSkill () {
      this.isAdd = true
    },
    closeAddOneSkill () {
      this.isAdd = false
    },
    openDeleteMode () {
      this.isDelete = true
      this.closeAddOneSkill()
    },
    closeDeleteMode () {
      this.isDelete = false
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      const skillList = JSON.parse(resume)['skills']
      if (skillList.length > 0) {
        this.skillInfo = Object.assign([], skillList)
        this.closeAddOneSkill()
      } else {
        this.openAddOneSkill()
      }
    } else {
      this.openAddOneSkill()
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {skills: Object.assign([], this.skillInfo)})
    })
    PubSub.subscribe('hidden', (msg, data) => {
      this.closeAddOneSkill()
      this.closeDeleteMode()
    })
    PubSub.subscribe('order_AddOneSkill', (msg, data) => {
      if (this.isAdd) {
        this.globalTip({
          type: 'notice',
          content: '存在未完成编辑的专业技能，不能新增！'
        })
        return
      }
      this.openAddOneSkill()
    })
    PubSub.subscribe('editing', (msg, data) => {
      if (this.skillInfo.length === 0) {
        this.openAddOneSkill()
      }
    })
    PubSub.subscribe('order_EnterDeleteMode', () => {
      this.openDeleteMode()
    })
    PubSub.subscribe('order_ExitDeleteMode', () => {
      this.closeDeleteMode()
      if (this.skillInfo.length === 0) {
        this.openAddOneSkill()
      }
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
