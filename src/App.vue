<template>
  <div id="app" :class="{'app_pd-tp-bm': isEditMode}">
    <header class="personal_info clearfix">
        <div id="title" class="main-title">个人简历</div>
        <div class="info">
            <span class="my_name_label m-pointer" v-show="myName" @click="inputEdit('myName', 'myNameRef')">{{ myName }}</span>
            <input
              ref="myNameRef"
              class="list_box my_name_input"
              type="text"
              placeholder="姓名..."
              maxlength="10"
              v-show="!myName"
              @blur="myName=$event.target.value"
              @keypress.enter="myName=$event.target.value"
              >
            <div>
                <span>
                  <span class="m-pointer" v-show='age' @click="inputEdit('age', 'myAgeRef')">{{age}}</span>
                  <input
                    ref="myAgeRef"
                    class="list_box"
                    type="text"
                    placeholder="年龄..."
                    maxlength="3"
                    v-show="!age"
                    @blur="age=$event.target.value"
                    @keypress.enter="age=$event.target.value"
                    style="width:5vw"
                    >
                  岁
                </span>
                <span>|</span>
                <span>工作年限：
                  <span class="m-pointer" v-show="workYear" @click="inputEdit('workYear', 'myWorkYearRef')">{{workYear}}</span>
                  <input
                    ref="myWorkYearRef"
                    class="list_box"
                    v-show="!workYear"
                    type="text"
                    maxlength="3"
                    placeholder="年限..."
                    style="width:3vw"
                    @blur="workYear=$event.target.value"
                    @keypress.enter="workYear=$event.target.value"
                    >
                  年
                </span>
                <span>|</span>
                <span>现居：
                  <span class="m-pointer" v-show="myHome" @click="inputEdit('myHome', 'myAddressRef')">{{myHome}}</span>
                  <input
                    ref="myAddressRef"
                    class="list_box"
                    v-show="!myHome"
                    type="text"
                    maxlength="20"
                    placeholder="现居地...长度不超过20字符"
                    style="width:10vw"
                    @blur="myHome=$event.target.value"
                    @keypress.enter="myHome=$event.target.value"
                    >
                </span>
            </div>
            <div>
                <span>求职岗位:
                  <span class="m-pointer" v-show="jobPost" @click="inputEdit('jobPost', 'myJobWantedRef')">{{jobPost}}</span>
                  <input
                    ref="myJobWantedRef"
                    class="list_box"
                    type="text"
                    maxlength="20"
                    placeholder=" 应聘职位..."
                    v-show="!jobPost"
                    @blur="jobPost=$event.target.value"
                    @keypress.enter="jobPost=$event.target.value"
                    >
                </span>
                <br>
                <span>联系电话：
                  <span class="m-pointer" v-show="phoneNum" @click="inputEdit('phoneNum', 'myContactInfoRef')">{{phoneNum}}</span>
                  <input
                    ref="myContactInfoRef"
                    class="list_box"
                    type="text"
                    maxlength="20"
                    placeholder="联系电话..."
                    v-show="!phoneNum"
                    @blur="phoneNum=$event.target.value"
                    @keypress.enter="phoneNum=$event.target.value"
                    >
                </span>
                <br>
                <span>邮箱：
                  <span class="m-pointer" v-show="email" @click="inputEdit('email', 'myEmailRef')">{{email}}</span>
                  <input
                    ref="myEmailRef"
                    class="list_box"
                    type="text"
                    maxlength="50"
                    placeholder="邮箱...不超过50字符"
                    v-show='!email'
                    @blur="email=$event.target.value"
                    @keypress.enter="email=$event.target.value"
                    >
                </span>
            </div>
        </div>
        <div v-show="!isHideAvatar" :class="[imgSrc? '':'dashed_border', 'head_pic']" @click="imgSrc = ''">
            <img :src="imgSrc" alt="头像" v-show="imgSrc">
            <input type="file" @change="headPic" :accept="acceptSuffix">
        </div>
    </header>
    <main>
      <!-- 组件展示区域 -->
      <div :is="obj.component" v-for="(obj,index) in componentArr" :key="index" style="margin-top:20px"></div>
      <!-- 操作区域 -->
      <operationArea @saveData="saveData"></operationArea>
      <!-- <div :class="border1px" v-show="!isComplete" style="margin-bottom:20px">
        <select id="theme" @change="getOptionValue ($event)">
          <option value="" selected>未选择</option>
          <option value="edu_exp">教育经历</option>
          <option value="skills">专业技能</option>
          <option value="work_exp">工作经验</option>
          <option value="project_exp">项目经验</option>
          <option value="self_evaluation">自我评价</option>
        </select>
        <button @click="addOne">添加</button>
        <button @click="addAll">添加全部</button>
        <button @click="deleteOne">删除</button>
        <button @click="deleteAll">删除全部</button>
        <button @click="hiddenAll">隐藏全部按钮</button>
        <button @click="saveData">保存页面数据</button>
        <button @click="clearStorage">清除已存数据</button>
        <div class="tip"><span title="编辑完简历按下Ctrl+P">鼠标放在我上面，告诉你如何将网页另存为PDF简历？</span></div>
      </div> -->
    </main>
  </div>
</template>

<script>
import edu from './components/edu_exp'
import work from './components/work_exp'
import project from './components/project_exp'
import skills from './components/skills'
import selfEvaluation from './components/self_evaluation'
import mixins from './mixins/index'
import operationArea from './components/operation.vue'

export default {
  mixins: [mixins],
  data () {
    return {
      myName: '', // 名字
      age: null, // 年龄
      workYear: NaN, // 工作年限
      jobPost: '', // 应聘岗位
      phoneNum: NaN, // 联系电话
      email: '', // 邮箱
      myHome: '', // 居住地
      imgSrc: '', // require('./img/mypic.png')引入图片需要用到require
      hasIt: false, // 是否存在相同组件
      componentName: null, // 组件名称
      componentIndex: null, // 组件对应的options的id
      componentArr: [], // 存储组件对象的数组
      isComplete: false, // 是否隐藏页面全部按钮
      border1px: 'border1px',
      resume: {},
      isEditMode: true, // 是否是编辑模式
      acceptSuffix: ['.jpg', '.jpeg', '.png', '.bmp'].join(','), // 头像接受的图片格式
      isHideAvatar: false
    }
  },
  methods: {
    /**
     * readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，
     * 并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
     */
    headPic (e) {
      if (!e.target.files.length > 0) {
        return
      }
      if (/\.(jpg|png|jpeg)$/.test(e.target.files[0].name)) {
        let fr = new FileReader()
        fr.readAsDataURL(e.target.files[0])
        fr.onload = () => {
          this.imgSrc = fr.result
        }
      } else {
        alert('请选择图片文件')
      }
    },
    // 隐藏全部按钮及输入框
    hiddenAll () {
      if (confirm('请确认简历所有内容已输入完毕，确认后按钮将不可用。隐藏完所有按钮后，按下Ctrl+P可将简历另存为PDF')) {
        PubSub.publish('hidden')
        this.isComplete = true
      }
    },
    // 清除页面数据缓存
    clearStorage () {
      if (window.localStorage.getItem('resume')) {
        window.localStorage.removeItem('resume')
        alert('数据已清除')
      } else {
        alert('没有找到要清除的数据')
      }
    },
    // 缓存数据到本地
    saveData () {
      let base = {
        myName: this.myName,
        age: this.age,
        workYear: this.workYear,
        jobPost: this.jobPost,
        phoneNum: this.phoneNum,
        email: this.email,
        myHome: this.myHome,
        imgSrc: this.imgSrc
      }
      this.resume = {}
      this.resume = {base: Object.assign({}, base)}
      this.setLocal()
      PubSub.publish('save')
      console.log(this.resume)
    },
    // 执行缓存
    setLocal () {
      window.localStorage.setItem('resume', JSON.stringify(Object.assign({}, this.resume)))
    },
    // 从select中获取value和index值
    getOptionValue (e) {
      const select = e.target
      const index = e.target.selectedIndex// select获取option的index的方法
      const value = select[index].value// 获取组件名称
      this.componentName = value
      this.componentIndex = index
    },
    // 一次性添加所有子组件
    addAll () {
      let arr = [edu, skills, work, project, selfEvaluation] // 顺序固定，并且要与页面的option的index一一对应
      let index = []
      if (this.componentArr.length > 0) { // 如果原数组已经存有组件，则遍历它的id
        this.componentArr.map(item => {
          index.push(item.id)
        })
      }
      for (let i = 1; i <= arr.length; i++) { // 根据原数组长度判断需要添加的组件数
        if (index.indexOf(i) >= 0) { // index存在该id则不添加组件
          continue
        } else {
          this.componentArr.push({
            id: i,
            component: arr[i - 1]
          })
        }
      }
    },
    // 添加一个新组件到页面
    addOne () {
      if (!this.componentName) { // 判断是否选择了组件
        alert('请在下拉框选择要添加的条目！')
        return
      }
      for (let obj of this.componentArr) {
        if (obj.id === this.componentIndex) { // 通过id与index对比判断是否已存在组件
          this.hasIt = true
          break
        }
        this.hasIt = false
      }
      this.hasIt ? alert('已有该条目！不能再添加') : this.chooseComponent(this.componentName, this.componentIndex)
    },
    // 删除全部组件
    deleteAll () {
      this.componentArr = []
    },
    // 删除一个组件
    deleteOne () {
      if (this.componentIndex) {
        const newArr = this.componentArr.filter(obj => obj.id !== this.componentIndex)
        this.componentArr = newArr
      } else {
        alert('请在左边下拉框选择要删除的条目')
      }
    },
    // 组件分类
    chooseComponent (cn, id) {
      let cid = id
      let cname = null
      switch (cn) {
        case 'edu_exp':
          cname = edu
          break
        case 'skills':
          cname = skills
          break
        case 'work_exp':
          cname = work
          break
        case 'project_exp':
          cname = project
          break
        case 'self_evaluation':
          cname = selfEvaluation
          break
      }
      // 选中的子组件展示到页面
      this.componentArr.push({
        id: cid,
        component: cname
      })
    }
  },
  // 各子组件注册
  components: {
    edu,
    skills,
    work,
    project,
    selfEvaluation,
    operationArea
  },
  // 检测并获取localstorage
  created () {
    let resume = window.localStorage.getItem('resume')
    let list = ['myName', 'age', 'workYear', 'jobPost', 'phoneNum', 'email', 'myHome', 'imgSrc']
    if (resume) {
      let base = JSON.parse(resume)['base']
      list.map(item => {
        this[item] = base[item]
      })
    }
    this.addAll()
  },
  // 订阅子组件submitData事件，获得子组件数据
  mounted () {
    PubSub.subscribe('submitData', (msg, data) => {
      Object.assign(this.resume, data)
      this.setLocal()
    })
    PubSub.subscribe('hideAvatar', (msg, data) => {
      this.isHideAvatar = data
    })
    PubSub.subscribe('hidden', (msg, data) => {
      this.isEditMode = false
    })
    PubSub.subscribe('editing', (msg, data) => {
      this.isEditMode = true
    })
  }
}
</script>

<style lang="stylus">
@import '../static/css/main.styl';
.border1px
  box-sizing border-box
  padding 10px 0
  margin 10px 0
  border 1px solid gray
  opacity 0.7
  border-radius 5px
  .tip
    cursor pointer
    &:hover
      color blue
#app
  width 100%
  padding-left 40px
  padding-right 40px
  margin auto
.personal_info
  .info
    float left
    h1
      margin 0 5px 10px
  .head_pic
    float right
    width 100px
    height 140px
    position relative
    &::after
      display block
      content ''
      border 1px solid #808080
      border-radius 50%
      position absolute
      width 50px
      height 50px
      left 24px
      top 44px
    input[type=file]
      position absolute
      width 100%
      height 100%
      opacity 0
      z-index 2
      margin 0
      padding 0
      cursor pointer
    img
      position absolute
      height 100%
      width 100%
      margin 0
      z-index 3
      cursor pointer
.app_pd-tp-bm
  padding-top 40px
  padding-bottom 40px
  border 1px solid #ccc
.main-title
  font-size 2em
  text-align center
.my_name_label
  font-size 2em
  font-weight bold
.my_name_input
  line-height 34px
  width 150px
  font-size 2em
</style>
