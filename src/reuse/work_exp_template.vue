<template>
  <div :class="['dashed_border']">
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
        <li v-for="(obj,index) in workContent" :key="index">
          <p><input class="content_box" type="text" placeholder="职责..." v-model="obj.list"></p>
        </li>
        <div @click="addOneList()" class="add_one_duty" v-text-center v-coms-pointer>添加一条职责</div>
      </ul>
      <div v-text-center style="margin-bottom: 10px">
        <button @click="submitOne()">提交本条经历</button>
      </div>
    </div>
  </div>
</template>

<script>
const WorkExpTemplate = {
  data () {
    return {
      company: '', // 公司
      workYear: '', // 工作年限
      job: '', // 任职岗位
      address: '', // 工作地点
      workContent: [{list: ''}] // 工作职责
    }
  },
  methods: {
    addOneList () {
      this.workContent.push({list: ''})
    },
    submitOne () {
      this.$emit('addOneWorkExp', {
        company: this.company,
        workYear: this.workYear,
        job: this.job,
        address: this.address,
        workContent: this.workContent
      })
    }
  }
}
export default WorkExpTemplate
</script>

<style lang="stylus" scoped>
.work
  margin-bottom 3px
  padding: 5px 5px 0 5px;
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
.add_one_duty
  padding 2px 0
  margin 0 6px 10px 0
  border 1px dashed #ccc
  &:hover
    background-color: #ccc
    color white
</style>
