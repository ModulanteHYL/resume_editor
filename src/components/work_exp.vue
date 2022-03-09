<template>
    <div class="work_exp">
        <h3 class="hr">工作经历<button class="delete_data" @click="deleteWorkData()">删除已输入数据</button></h3>
        <div v-if="workInfo">
            <div class="work" v-for="(obj,index) in workInfo" :key="index">
                <div class="company_info clearfix">
                    <h4>{{obj.company}}</h4>
                    <span>{{obj.workYear}}</span>
                </div>
                <div class="company_info clearfix">
                    <span>岗位：{{obj.job}}</span>
                    <span>地点：{{obj.address}}</span>
                </div>
                <ul class="work_content">
                    <li v-for="(items,index) in obj.workContent" :key="index">
                        <p>{{items.list}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <WorkExpTemplate v-if="isAdd" @addOneExp="addOneExp"></WorkExpTemplate>
    </div>
</template>
<script>
import WorkExpTemplate from '@/reuse/work_exp_template.vue'

export default {
  data () {
    return {
      workInfo: [], // 工作经历的最终所有信息
      isAdd: true, // 控制输入框是否显示
      subscribe: null
    }
  },
  methods: {
    // 删除本项的数据
    deleteWorkData () {
      alert('只删除了页面的数据，如果希望同时删除浏览器缓存中的数据，请再点击‘保存页面数据’进行覆盖')
      this.workInfo = []
    },
    // 新增一条工作经验
    addOneExp (data) {
      this.workInfo.push(data)
      this.isAdd = false
    }
  },
  components: {
    WorkExpTemplate
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      this.workInfo = JSON.parse(resume)['work']
      if (this.workInfo.length === 0) {
        this.isAdd = true
      } else {
        this.isAdd = false
      }
    } else {
      this.isAdd = true
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {work: Object.assign([], this.workInfo)})
    })
    PubSub.subscribe('hidden', () => {
      this.isAdd = false
    })
    PubSub.subscribe('editing', (msg, data) => {
      if (this.workInfo.length === 0) {
        this.isAdd = true
      }
    })
    PubSub.subscribe('order_AddOneExp', () => {
      if (this.isAdd) {
        alert('存在没有提交的工作经验，不能新增!')
        return
      }
      this.isAdd = true
    })
  },
  // 销毁子组件的save订阅事件
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style lang="stylus" scoped>
.add_exp
  margin 3px 5px
div.work_exp
  .work
    margin-bottom 3px
    ul.work_content
      list-style disc
      .add_items
        visibility hidden
      &:hover .add_items
        visibility visible
    .company_info
      h4
        float left
        display inline-block
      span
        float right
        display inline-block
        margin 0
        &:nth-child(1)
          float left
</style>
