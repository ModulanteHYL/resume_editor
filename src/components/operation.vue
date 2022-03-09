<template>
  <div :class="{'operation-area':true, 'hide-menu':!isEditMode}">
      <header class="menu-title">
        操作菜单
      </header>
      <main>
        <div class="menu-area">
          <ul>
            <li>
              <button @click="addEduExp" disabled>增加一条教育经历</button>
            </li>
            <li>
              <button @click="addSkill">增加一条专业技能</button>
            </li>
            <li>
              <button @click="addWorkExp">增加一条工作经历</button>
            </li>
            <li>
              <button @click="addProjectExp" disabled>增加一条项目经验</button>
            </li>
            <li>
              <button @click="saveData">保存数据到浏览器</button>
            </li>
            <li>
              <button @click="hideAvatar">{{isHideAvatar?'显示':'隐藏'}}头像框</button>
            </li>
            <li>
              <span>Ctrl+Q进入编辑模式</span>
            </li>
            <li>
              <span>Ctrl+P保存简历为PDF</span>
            </li>
          </ul>
        </div>
      </main>
      <footer>
        <div style="text-align: center">
        </div>
      </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEditMode: true,
      isHideAvatar: false
    }
  },
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'p') { // ctrl+p
        this.isEditMode = false
        PubSub.publish('hidden')
      }
      if (e.ctrlKey && e.key === 'q') { // ctrl+q
        this.isEditMode = true
        PubSub.publish('editing')
      }
    })
  },
  methods: {
    addEduExp () {

    },
    addSkill () {
      PubSub.publish('addOneSkill')
    },
    addWorkExp () {
      PubSub.publish('order_AddOneExp')
    },
    addProjectExp () {

    },
    saveData () {
      this.$emit('saveData')
    },
    saveResumeAsPDF () {
      this.isEditMode = false
    },
    hideAvatar () {
      this.isHideAvatar = !this.isHideAvatar
      PubSub.publish('hideAvatar', this.isHideAvatar)
    }
  }
}
</script>

<style lang="stylus" scoped>
ul
  list-style none
  padding-left 20px
  padding-right 20px
  li
    margin-bottom 10px
    &:nth-child(1)
      margin-top 10px
    button
      width 100%
      margin 0
.menu-title
  text-align: center
  font-weight bold
.operation-area
  position fixed
  left 0
  top 15%
  width 225px
  height 600px
  border 1px solid #ccc
  border-radius 5px
.menu-area
  width: 100%
  height: 500px
  border: 1px solid #ddd
  margin 0
  margin-bottom 20px
.hide-menu
  left -250px
</style>
