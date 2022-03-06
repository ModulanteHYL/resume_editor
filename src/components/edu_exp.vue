<template>
    <div class="edu_exp">
        <h3 class="hr">教育经历</h3>
        <div class="school">
            <span>学校：
              <span class="m-pointer" v-show="schoolName" @click="inputEdit('schoolName','mySchoolNameRef')">{{schoolName}}</span>
              <input
                ref="mySchoolNameRef"
                class="list_box"
                v-show="!schoolName"
                type="text"
                maxlength="15"
                placeholder="毕业院校..."
                style="width: 70%"
                @blur="schoolName=$event.target.value"
                @keypress.enter="schoolName=$event.target.value"
                >
            </span>
            <span>专业：
              <span class="m-pointer" v-show="courseInfo" @click="inputEdit('courseInfo','myCourseInfoRef')">{{courseInfo}}</span>
              <input
                ref="myCourseInfoRef"
                class="list_box"
                v-show="!courseInfo"
                type="text"
                maxlength="20"
                style="width: 70%"
                placeholder="专业名称--本科/专科..."
                @blur="courseInfo=$event.target.value"
                @keypress.enter="courseInfo=$event.target.value"
                >
            </span>
            <span style="text-align: center">
              <span class="m-pointer" v-show="eduForm" @click="inputEdit('eduForm','myEduFormRef')">{{eduForm}}</span>
              <input
                ref="myEduFormRef"
                v-show="!eduForm"
                type="text"
                placeholder="全日制/非全日制.."
                class="list_box"
                style="width: 90%;"
                @blur="eduForm=$event.target.value"
                @keypress.enter="eduForm=$event.target.value"
                >
            </span>
            <span style="text-align: right">
              <span class="m-pointer" v-show="studyTime" @click="inputEdit('studyTime', 'myStudyTime')">{{studyTime}}</span>
              <input
                ref="myStudyTime"
                class="list_box"
                v-show="!studyTime"
                type="text"
                maxlength="30"
                style="width: 100%"
                placeholder="起始年月-毕业年月..."
                @blur="studyTime=$event.target.value"
                @keypress.enter="studyTime=$event.target.value"
                >
            </span>
        </div>
    </div>
</template>
<script>
import mixins from '@/mixins/index'

export default {
  mixins: [mixins],
  data () {
    return {
      schoolName: '', // 学校名称
      courseInfo: '', // 专业课程
      studyTime: '', // 入学时间及毕业时间
      subscribe: null,
      eduForm: '' // 授课方式  全日制/非全日制
    }
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    let list = ['schoolName', 'courseInfo', 'studyTime', 'eduForm']
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
        studyTime: this.studyTime,
        eduForm: this.eduForm
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
    span
      width 25%
      max-width: 25%
      line-height: 27px
</style>
