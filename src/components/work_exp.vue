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
        <div v-if="isAdd" :class="[hiddenAll? hiddenClass : '','dashed_border']">
            <div class="work">
                <div class="company_info clearfix">
                    <h4><input class="list_box" type="text" placeholder="公司名称..." v-model="company"></h4>
                    <span><input class="list_box" type="text" placeholder="入职时间-离职时间..." v-model="workYear"></span>
                </div>
                <div class="company_info clearfix">
                    <span>岗位：<input class="list_box" type="text" v-model="job"></span>
                    <span>地点：<input class="list_box" type="text" v-model="address"></span>
                </div>
                <ul class="work_content">
                    <li v-for="(obj,index) in lists" :key="index">
                        <p><input class="content_box" type="text" placeholder="职责..." v-model="obj.list"></p>
                    </li>
                    <button class="add_items" @click="addOneList()">添加一条职责</button>
                    <button style="margin-left:72%" @click="submitOne()">提交本条经历</button>
                </ul>
            </div>
        </div>
        <button v-show="!isAdd" :class="[hiddenAll? hiddenClass : '','add_exp']" @click="addOneExp()">添加一条经历</button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      company: '', // 公司名称
      workYear: '', // 工作年限
      job: '', // 岗位
      address: '', // 公司地点
      lists: [{list: ''}], // 输入框的职责描述
      workContent: [], // 展示框的职责描述
      workInfo: [], // 工作经历的最终所有信息
      isAdd: true, // 控制输入框是否显示
      hiddenAll: false, // 隐藏所有按钮和输入框
      hiddenClass: 'hidden', // 执行css的hidden类
      subscribe: null
    }
  },
  methods: {
    // 删除本项的数据
    deleteWorkData () {
      alert('只删除了页面的数据，如果希望同时删除浏览器缓存中的数据，请再点击‘保存页面数据’进行覆盖')
      this.workInfo = []
    },
    // 增加一条职责
    addOneList () {
      if (this.lists[this.lists.length - 1].list) {
        this.lists.push({list: ''})
      }
    },
    // 添加一条工作经历
    addOneExp () {
      this.isAdd = true
    },
    // 将输入框数据提交到展示框
    submitOne () {
      if(this.company && this.workYear && this.job && this.address && this.workContent){
        let data = {
        company: this.company,
        workYear: this.workYear,
        job: this.job,
        address: this.address,
        workContent: Object.assign(this.workContent, this.lists)
      }
      this.workInfo.push(Object.assign({}, data))
      this.clearData()
      this.isAdd = false
      }
      else{
        alert('请输入完整的内容再提交！')
      }
    },
    // 清除输入框数据
    clearData () {
      this.company = ''
      this.workYear = ''
      this.job = ''
      this.address = ''
      this.lists = [{list: ''}]
      this.workContent = []
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      this.workInfo = JSON.parse(resume)['work']
      this.isAdd = false
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {work: Object.assign([], this.workInfo)})
    })
    PubSub.subscribe('hidden', () => {
      this.hiddenAll = true
    })
  },
  // 销毁子组件的save订阅事件
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style lang="stylus">
.add_exp
  margin 3px 5px
div.work_exp
  .work
    margin-bottom 3px
    ul.work_content
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
