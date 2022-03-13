<template>
  <div :class="{'operation-area':true, 'hide-menu':!isEditMode}">
      <header class="menu-title">
        操作菜单
      </header>
      <main>
        <div class="menu-area">
          <ul>
            <li>
              <button @click="addEduExp" :disabled="isDeleteMode">增加一条教育经历</button>
            </li>
            <li>
              <button @click="addSkill" :disabled="isDeleteMode">增加一条专业技能</button>
            </li>
            <li>
              <button @click="addWorkExp" :disabled="isDeleteMode">增加一条工作经历</button>
            </li>
            <li>
              <button @click="addProjectExp" :disabled="isDeleteMode">增加一条项目经验</button>
            </li>
            <li>
              <button @click="saveData">保存数据到浏览器</button>
            </li>
            <li>
              <button @click="deleteStorage">删除保存的数据</button>
            </li>
            <li>
              <button @click="hideAvatar">{{isHideAvatar?'显示':'隐藏'}}头像框</button>
            </li>
            <li style="border-top:1px solid">
              <span>菜单隐藏后按Ctrl+Q进入编辑模式</span>
            </li>
            <li style="border-bottom:1px solid">
              <span>Ctrl+P保存简历为PDF</span>
            </li>
            <li>
              <span>更改字体样式:</span>
              <select style="width: 38%" @change="fontFamilyChange">
                <option value="auto">默认</option>
                <option value="cursive">cursive</option>
                <option value="fangsong">仿宋</option>
                <option value="monospace">monospace</option>
                <option value="serif">serif</option>
              </select>
            </li>
            <li>
              <label for="autoSave">自动保存:</label>
              <input type="checkbox" name="autoSave" id="autoSave" style="width: 16px;vertical-align: top;" v-model="autoSave">
            </li>
            <li>
              <button @click="openDeleteFn">进入删除模式</button>
            </li>
            <li>
              <button @click="closeDeleteFn">退出删除模式</button>
            </li>
            <li>
              <button @click="editComplete">完成编辑</button>
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
import mixins from '@/mixins/index'

export default {
  mixins: [mixins],
  data () {
    return {
      isEditMode: true,
      isHideAvatar: false,
      isDeleteMode: false,
      autoSave: false,
      autoSaveTimer: undefined
    }
  },
  watch: {
    autoSave: function (newVal, oldVal) {
      if (newVal) {
        this.autoSaveTimer = setInterval(() => {
          PubSub.publish('autoSave')
        }, 3000)
      } else {
        clearInterval(this.autoSaveTimer)
        this.autoSaveTimer = undefined
      }
    }
  },
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'p') { // ctrl+p
        this.isEditMode = false
        PubSub.publish('hidden')
        PubSub.publish('hidden-border')
        this.globalTip({})
      }
      if (e.ctrlKey && e.key === 'q') { // ctrl+q
        this.isEditMode = true
        PubSub.publish('editing')
      }
    })
  },
  methods: {
    addEduExp () {
      PubSub.publish('order_AddOneEduExp')
    },
    addSkill () {
      PubSub.publish('order_AddOneSkill')
    },
    addWorkExp () {
      PubSub.publish('order_AddOneWorkExp')
    },
    addProjectExp () {
      PubSub.publish('order_AddOneProjExp')
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
    },
    editComplete () {
      PubSub.publish('hidden')
      this.isDeleteMode = false
      this.globalTip({
        type: 'success',
        content: '温馨提示: 编辑完成请记得保存数据,避免刷新页面后数据丢失'
      })
    },
    deleteStorage () {
      PubSub.publish('deleteStorage')
    },
    fontFamilyChange (event) {
      const styleData = event.target.value
      document.getElementById('app').style.setProperty('--font-theme', styleData)
    },
    openDeleteFn () {
      PubSub.publish('order_EnterDeleteMode')
      this.isDeleteMode = true
    },
    closeDeleteFn () {
      PubSub.publish('order_ExitDeleteMode')
      this.isDeleteMode = false
    }
  }
}
</script>

<style lang="stylus" scoped>
main
  padding 0 10px
ul
  list-style none
  padding-left 10px
  padding-right 10px
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
