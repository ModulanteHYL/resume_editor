<template>
    <div class="project_exp">
        <h3 class="hr">项目经验<button class="delete_data" @click="deleteProData()">删除本项数据</button></h3>
        <div v-if="projectInfo">
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
        <ul :class="[hiddenAll? hiddenClass: '','row','dashed_border','edit_box']" v-if="isAdd">
            <h4><input class="list_box" type="text" placeholder="项目名称..." v-model="proName"></h4>
            <li>
                <span>项目描述：</span>
                <section><textarea class="content-style style_supply"  @input="proDescribe=$event.target.value"></textarea></section>
            </li>
            <li>
                <span>主要负责：</span>
                <section><textarea class="content-style style_supply"  @input="myDuty=$event.target.value"></textarea></section>
            </li>
            <li v-for="(item,index) in inputOther" :key="index">
                <span class="other_item">
                  <input class="list_box" type="text" v-model="item.title">:
                </span>
                <section><textarea class="content-style style_supply" @input="item.content=$event.target.value"></textarea></section>
            </li>
            <button class="add_item" @click="addDescribe()">添加其他项</button>
            <button class="add_project" @click="submitProject()">提交本条经验</button>
        </ul>
        <button :class="[hiddenAll? hiddenClass: '']" v-show="!isAdd" @click="addProject()">添加项目经验</button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isAdd: true,
      proName: '', // 项目名称
      proDescribe: '', // 项目描述
      myDuty: '', // 我的职责
      inputOther: [], // 其他描述
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
      hiddenAll: false,
      hiddenClass: 'hidden',
      subscribe: null
    }
  },
  methods: {
    deleteProData () {
      alert('只删除了页面的数据，如果希望同时删除浏览器缓存中的数据，请再点击‘保存页面数据’进行覆盖')
      this.projectInfo = []
    },
    // 添加其他描述项
    addDescribe () {
      this.inputOther.push({title: null, content: null})
    },
    // 提交内容
    submitProject () {
      let data = {
        proName: this.proName,
        proDescribe: this.proDescribe,
        myDuty: this.myDuty,
        other: Object.assign([], this.inputOther)
      }
      this.projectInfo.push(Object.assign({}, data))
      this.clearData()
      this.isAdd = false
    },
    // 清除表层输入框数据
    clearData () {
      this.proName = ''
      this.proDescribe = ''
      this.myDuty = ''
      this.inputOther = []
    },
    // 新增
    addProject () {
      this.isAdd = true
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      this.projectInfo = JSON.parse(resume)['project']
      this.isAdd = false
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {project: Object.assign([], this.projectInfo)})
    })
    PubSub.subscribe('hidden', () => {
      this.hiddenAll = true
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style lang="stylus">
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
    padding 0
    margin 10px
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
