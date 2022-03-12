<template>
    <div class="edu_exp">
        <h3 class="hr">教育经历</h3>
        <div v-if="eduExpList.length > 0">
          <div v-for="(obj, index) in eduExpList" :key="index" class="school" v-border-tip="isDelete">
              <span>
                <span v-coms-pointer v-show="obj.schoolName" @click="obj.schoolName = undefined;inputEdit(null,'mySchoolNameRef')">{{obj.schoolName}}</span>
                <input
                  ref="mySchoolNameRef"
                  class="list_box"
                  v-show="!obj.schoolName"
                  type="text"
                  maxlength="15"
                  placeholder="毕业院校..."
                  style="width: 70%"
                  @blur="obj.schoolName=$event.target.value"
                  @keypress.enter="obj.schoolName=$event.target.value"
                  >
              </span>
              <span>
                <span v-coms-pointer v-show="obj.courseInfo" @click="obj.courseInfo = undefined;inputEdit(null,'myCourseInfoRef')">{{obj.courseInfo}}</span>
                <input
                  ref="myCourseInfoRef"
                  class="list_box"
                  v-show="!obj.courseInfo"
                  type="text"
                  maxlength="20"
                  style="width: 70%"
                  placeholder="专业名称"
                  @blur="obj.courseInfo=$event.target.value"
                  @keypress.enter="obj.courseInfo=$event.target.value"
                  >
              </span>
              <span style="text-align: center">
                <span v-coms-pointer v-show="obj.eduForm" @click="obj.eduForm = undefined;inputEdit(null,'myEduFormRef')">{{obj.eduForm}}</span>
                <input
                  ref="myEduFormRef"
                  v-show="!obj.eduForm"
                  type="text"
                  placeholder="全日制/非全日制.."
                  class="list_box"
                  style="width: 90%;"
                  @blur="obj.eduForm=$event.target.value"
                  @keypress.enter="obj.eduForm=$event.target.value"
                  >
              </span>
              <span style="text-align: right">
                <span v-coms-pointer v-show="obj.studyTime" @click="obj.studyTime = undefined;inputEdit(null, 'myStudyTime')">{{obj.studyTime}}</span>
                <input
                  ref="myStudyTime"
                  class="list_box"
                  v-show="!obj.studyTime"
                  type="text"
                  maxlength="30"
                  style="width: 100%"
                  placeholder="起始年月-毕业年月..."
                  @blur="obj.studyTime=$event.target.value"
                  @keypress.enter="obj.studyTime=$event.target.value"
                  >
              </span>
              <div v-if="isDelete" v-delete-btn @click="eduExpList.splice(index,1)"></div>
          </div>
        </div>
        <div v-if="isAdd" style="margin-top:10px">
          <EduExpTemplateVue @addOneEduExp="addOneEduExp"></EduExpTemplateVue>
        </div>
    </div>
</template>
<script>
import mixins from '@/mixins/index'
import EduExpTemplateVue from '@/reuse/edu_exp_template.vue'

export default {
  mixins: [mixins],
  data () {
    return {
      eduExpList: [
        // {
        //   schoolName: '', // 学校名称
        //   courseInfo: '', // 专业课程
        //   studyTime: '', // 入学时间及毕业时间
        //   eduForm: '' // 授课方式  全日制/非全日制
        // }
      ],
      subscribe: null,
      isAdd: false,
      isDelete: false
    }
  },
  components: {
    EduExpTemplateVue
  },
  created () {
    let resume = window.localStorage.getItem('resume')
    if (resume) {
      if (resume.length > 0) {
        let edu = JSON.parse(resume)['edu']
        this.eduExpList = Object.assign([], edu)
        this.closeAddEduExp()
      } else {
        this.openAddEduExp()
      }
    } else {
      this.openAddEduExp()
    }
  },
  mounted () {
    this.subscribe = PubSub.subscribe('save', (msg, data) => {
      PubSub.publish('submitData', {edu: Object.assign([], this.eduExpList)})
    })
    PubSub.subscribe('order_AddOneEduExp', () => {
      if (this.isAdd) {
        alert('存在没有编写完成的教育经历，不能再添加')
        return
      }
      this.openAddEduExp()
    })
    PubSub.subscribe('hidden', (msg, data) => {
      this.closeAddEduExp()
      this.closeDeleteMode()
    })
    PubSub.subscribe('editing', (msg, data) => {
      if (this.eduExpList.length === 0) {
        this.openAddEduExp()
      }
    })
    PubSub.subscribe('order_EnterDeleteMode', () => {
      this.openDeleteMode()
    })
    PubSub.subscribe('order_ExitDeleteMode', () => {
      this.closeDeleteMode()
      if (this.eduExpList.length === 0) {
        this.openAddEduExp()
      }
    })
  },
  methods: {
    openAddEduExp () {
      this.isAdd = true
    },
    closeAddEduExp () {
      this.isAdd = false
    },
    openDeleteMode () {
      this.isDelete = true
      this.closeAddEduExp()
    },
    closeDeleteMode () {
      this.isDelete = false
    },
    addOneEduExp (data) {
      this.eduExpList.push(data)
      this.closeAddEduExp()
    }
  },
  beforeDestroy () {
    PubSub.unsubscribe(this.subscribe)
  }
}
</script>
<style scoped lang="stylus">
div.edu_exp
  .school
    display flex
    span
      width 25%
      max-width: 25%
      line-height: 27px
</style>
