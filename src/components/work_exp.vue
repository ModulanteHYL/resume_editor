<template>
    <div class="work_exp">
        <h3 class="hr">工作经历</h3>
        <div v-if="workInfo.length > 0">
            <div class="work" v-for="(obj,index) in workInfo" :key="index" v-border-tip="isDelete">
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
                <div v-if="isDelete" v-delete-btn @click="workInfo.splice(index,1)"></div>
            </div>
        </div>
        <WorkExpTemplate v-if="isAdd" @addOneWorkExp="addOneWorkExp"></WorkExpTemplate>
    </div>
</template>
<script>
import WorkExpTemplate from '@/reuse/work_exp_template.vue'
import mixins from '@/mixins/index'

export default {
  mixins: [mixins],
  data () {
    return {
      workInfo: [], // 工作经历的最终所有信息
      isAdd: true, // 控制输入框是否显示
      subscribe: null,
      isDelete: false
    }
  },
  methods: {
    // 新增一条工作经验
    addOneWorkExp (data) {
      this.workInfo.push(data)
      this.closeAddWorkExp()
    },
    // 打开添加功能
    openAddWorkExp () {
      this.isAdd = true
    },
    // 关闭添加功能
    closeAddWorkExp () {
      this.isAdd = false
    },
    openDeleteMode () {
      this.isDelete = true
      this.closeAddWorkExp()
    },
    closeDeleteMode () {
      this.isDelete = false
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
        this.openAddWorkExp()
      } else {
        this.closeAddWorkExp()
      }
    } else {
      this.openAddWorkExp()
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {work: Object.assign([], this.workInfo)})
    })
    PubSub.subscribe('hidden', () => {
      this.closeAddWorkExp()
      this.closeDeleteMode()
    })
    PubSub.subscribe('editing', (msg, data) => {
      if (this.workInfo.length === 0) {
        this.openAddWorkExp()
      }
    })
    PubSub.subscribe('order_AddOneWorkExp', () => {
      if (this.isAdd) {
        this.globalTip({
          type: 'notice',
          content: '存在没有提交的工作经验，不能新增！'
        })
        return
      }
      this.openAddWorkExp()
    })
    PubSub.subscribe('order_EnterDeleteMode', () => {
      this.openDeleteMode()
    })
    PubSub.subscribe('order_ExitDeleteMode', () => {
      this.closeDeleteMode()
      if (this.workInfo.length === 0) {
        this.openAddWorkExp()
      }
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
    position relative
    ul.work_content
      list-style disc
      margin-left 48px
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
