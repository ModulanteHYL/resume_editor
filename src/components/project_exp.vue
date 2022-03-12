<template>
    <div class="project_exp">
        <h3 class="hr">项目经验<button class="delete_data" @click="deleteProData()">删除全部已输入数据</button></h3>
        <div v-if="projectInfo.length > 0">
            <ul class="row" v-for="(obj,index) in projectInfo" :key="index">
                <h4>{{obj.proName}}</h4>
                <li>
                    <span class="pro_span">项目描述：</span><br>
                    <section class="pro_section">{{obj.proDescribe}}</section>
                </li>
                <li>
                    <span class="pro_span">主要负责：</span><br>
                    <section class="pro_section">{{obj.myDuty}}</section>
                </li>
                <li v-for="(item,index) in obj.other" :key="index">
                    <span class="pro_span">{{item.title}}</span><br>
                    <section class="pro_section">{{item.content}}</section>
                </li>
            </ul>
        </div>
        <ProjectExpTemplateVue v-if="isAdd" @addOneProjExp="addOneProjExp"></ProjectExpTemplateVue>
    </div>
</template>
<script>
import ProjectExpTemplateVue from '@/reuse/project_exp_template.vue'

export default {
  data () {
    return {
      isAdd: true,
      projectInfo: [
        // {
        //   proName: '',
        //   proDescribe: '',
        //   myDuty: '',
        //   other: [
        //     {
        //       title: '', // 其他描述的名称
        //       content: ''// 其他描述的内容
        //     }
        //   ]
        // }
      ],
      subscribe: null
    }
  },
  components: {
    ProjectExpTemplateVue
  },
  methods: {
    deleteProData () {
      alert('只删除了页面的数据，如果希望同时删除浏览器缓存中的数据，请再点击‘保存页面数据’进行覆盖')
      this.projectInfo = []
    },
    addOneProjExp (data) {
      this.projectInfo.push(data)
      this.closeAddProjExp()
    },
    // 清除表层输入框数据
    clearData () {
      this.proName = ''
      this.proDescribe = ''
      this.myDuty = ''
      this.inputOther = []
    },
    // 新增
    openAddProjExp () {
      this.isAdd = true
    },
    // 关闭添加窗口
    closeAddProjExp () {
      this.isAdd = false
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      this.projectInfo = JSON.parse(resume)['project']
      if (this.projectInfo.length === 0) {
        this.openAddProjExp()
      } else {
        this.closeAddProjExp()
      }
    } else {
      this.openAddProjExp()
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {project: Object.assign([], this.projectInfo)})
    })
    PubSub.subscribe('hidden', () => {
      this.closeAddProjExp()
    })
    PubSub.subscribe('editing', (msg, data) => {
      if (this.projectInfo.length === 0) {
        this.openAddProjExp()
      }
    })
    PubSub.subscribe('order_AddOneProjExp', () => {
      if (this.isAdd) {
        alert('存在没有编辑的项目经验，不能新增')
        return
      }
      this.openAddProjExp()
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style lang="stylus" scoped>
.edit_box
  li
    span
      float left
    .style_supply
      min-height 5rem
      max-width 98%
      white-space pre-wrap
      resize none
      background-color inherit
      font inherit
      overflow hidden
  .add_item
    visibility hidden
    margin-left 13%
    margin-bottom 2%
  &:hover .add_item
    visibility visible
  .add_project
    margin-left 61%
  .other_item
    display inline-block
    width 87px
    margin 0
    word-wrap none
    input[type=text]
      width 90%
div.project_exp
  .row
    h4
      margin-bottom 10px
    li
      list-style none
      margin-left 11px
      .pro_span
        float left
        font-weight bold
      .pro_section
        word-wrap break-word//字母换行
        white-space pre-wrap//中文换行
</style>
