<template>
    <div class="project_exp">
        <h3 class="hr">项目经验</h3>
        <div v-if="projectInfo">
            <ul class="row" v-for="(obj,index) in projectInfo" :key="index">
                <h4>{{obj.proName}}</h4>
                <li>
                    <span>项目描述：</span><br>
                    <section>{{obj.proDescribe}}</section>
                </li>
                <li>
                    <span>主要负责：</span><br>
                    <section>{{obj.myDuty}}</section>
                </li>
                <li v-for="(item,index) in obj.other" :key="index">
                    <span>{{item.title}}</span><br>
                    <section>{{item.content}}</section>
                </li>
            </ul>
        </div>
        <ul :class="[hiddenAll? hiddenClass: '','row','dashed_border','edit_box']" v-if="isAdd">
            <h4><input class="list_box" type="text" placeholder="项目名称..." v-model="proName"></h4>
            <li>
                <span>项目描述：</span>
                <section><div class="content-style style_supply" contenteditable="true" @input="proDescribe=$event.target.textContent"></div></section>
            </li>
            <li>
                <span>主要负责：</span>
                <section><div class="content-style style_supply" contenteditable="true" @input="myDuty=$event.target.textContent"></div></section>
            </li>
            <li v-for="(item,index) in inputOther" :key="index">
                <span><input class="list_box" style="width:43%;margin:0;padding:0;line-height:1.5rem" type="text" v-model="item.title">:</span>
                <section><div class="content-style style_supply" contenteditable="true" @input="item.content=$event.target.textContent"></div></section>
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
    // 添加其他描述项
    addDescribe () {
      this.inputOther.push({title: '', content: ''})
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
  .add_item
    visibility hidden
    margin-left 13%
    margin-bottom 2%
  &:hover .add_item
    visibility visible
  .add_project
    margin-left 61%
.style_supply
  min-height 5rem
  margin-left 11%
  width 88%
div.project_exp
  .row
    padding 0
    margin 10px
    h4
      margin-bottom 10px
    li
      list-style none
      margin-left 11px
      span
        float left
        font-weight bold
</style>
