<template>
  <div class="dashed_border edu_wrap">
    <table width="100%">
      <thead>
        <tr>
          <th>毕业院校</th>
          <th>专业名称</th>
          <th>学习形式</th>
          <th>入学及毕业时间</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" v-model="schoolName">
          </td>
          <td>
            <input type="text" v-model="courseInfo">
          </td>
          <td>
            <input type="text" v-model="studyTime" placeholder="全日制/非全日制">
          </td>
          <td>
            <input type="text" v-model="eduForm">
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center;margin: 10px 0;">
      <button @click="addOneEduExp">提交</button>
    </div>
  </div>
</template>

<script>
const EduExpTemplateVue = {
  data () {
    return {
      schoolName: '', // 学校名称
      courseInfo: '', // 专业课程
      studyTime: '', // 入学时间及毕业时间
      eduForm: '' // 授课方式  全日制/非全日制
    }
  },
  methods: {
    addOneEduExp () {
      this.$emit('addOneEduExp', {
        schoolName: this.schoolName,
        courseInfo: this.courseInfo,
        studyTime: this.studyTime,
        eduForm: this.eduForm
      })
    }
  }
}
export default EduExpTemplateVue
</script>

<style lang="stylus" scoped>
.edu_wrap
  cursor pointer
  td
    padding 0 5px
    input
      width: 100%
      margin 0
      line-height 1.5rem
      height 1.5rem
</style>
