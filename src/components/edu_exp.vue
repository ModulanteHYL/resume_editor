<template>
    <div class="edu_exp">
        <h3 class="hr">教育经历</h3>
        <div class="school">
            <input class="list_box" v-if="!schoolName" type="text" placeholder="毕业院校..." @blur="schoolName=$event.target.value" @keypress.enter="schoolName=$event.target.value">
            <span v-else @click="schoolName=''">{{schoolName}}</span>
            <input class="list_box" v-if="!courseInfo" type="text" placeholder="专业名称--本科/专科..." @blur="courseInfo=$event.target.value" @keypress.enter="courseInfo=$event.target.value">
            <span v-else @click="courseInfo=''">{{courseInfo}}</span>
            <input class="list_box" v-if="!studyTime" type="text" placeholder="起始年月-毕业年月..." @blur="studyTime=$event.target.value" @keypress.enter="studyTime=$event.target.value">
            <span v-else @click="studyTime=''">{{studyTime}}</span>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      schoolName: '', // 学校名称
      courseInfo: '', // 专业课程
      studyTime: '', // 入学时间及毕业时间
      subscribe: null
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    let list = ['schoolName', 'courseInfo', 'studyTime']
    if (resume) {
      let edu = JSON.parse(resume)['edu']
      list.map(item => {
        this[item] = edu[item]
      })
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      let edu = {
        schoolName: this.schoolName,
        courseInfo: this.courseInfo,
        studyTime: this.studyTime
      }
      PubSub.publish('submitData', {edu: Object.assign({}, edu)})
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style scoped lang="stylus">
div.edu_exp
  h3
    margin 0 5px
  .school
    display flex
    span,input
      width 33.3%
      &:nth-child(1)
        text-align left
      &:nth-child(2)
        text-align center
      &:nth-child(3)
        text-align right
</style>
