<template>
  <div>
    <ul :class="['row','dashed_border','edit_box']">
      <div>
        <label for="projectName">项目名称:</label>
        <input name="projectName" class="list_box" type="text" placeholder="项目名称..." v-model="proName">
      </div>
      <li>
        <span>项目描述：</span>
        <section><textarea class="content-style style_supply"  @input="proDescribe=$event.target.value"></textarea></section>
      </li>
      <li>
        <span>主要负责：</span>
        <section><textarea class="content-style style_supply"  @input="myDuty=$event.target.value"></textarea></section>
      </li>
      <li v-for="(item,index) in other" :key="index">
        <span class="other_item">
          <input class="list_box" type="text" v-model="item.title" placeholder="自定义标题...">:
        </span>
        <section><textarea class="content-style style_supply" @input="item.content=$event.target.value"></textarea></section>
      </li>
      <div class="add_costom_item" @click="addDescribe()" v-text-center v-coms-pointer>添加自定义项</div>
      <div v-text-center style="margin-bottom:10px">
        <button @click="submitProject()">提交本条经验</button>
      </div>
    </ul>
  </div>
</template>

<script>
const ProjectExpTemplateVue = {
  data () {
    return {
      proName: '',
      proDescribe: '',
      myDuty: '',
      other: []
    }
  },
  methods: {
    addDescribe () {
      this.other.push({
        title: '',
        content: ''
      })
    },
    submitProject () {
      this.$emit('addOneProjExp', {
        proName: this.proName,
        proDescribe: this.proDescribe,
        myDuty: this.myDuty,
        other: this.other
      })
    }
  }
}
export default ProjectExpTemplateVue
</script>

<style lang="stylus" scoped>
.edit_box
  padding 5px 0 0 10px
  li
    span
      float left
    .style_supply
      min-height 5rem
      max-width 98%
      white-space pre-wrap
      resize none
      background-color inherit
      font inherit
      overflow hidden
  .other_item
    display inline-block
    width 150px
    margin 0
    word-wrap none
    input[type=text]
      width 90%
      margin: 0 0 5px
.row
  li
    list-style none
    margin-left 11px
.add_costom_item
  border 1px dashed #ccc
  padding 2px 0
  margin 0 17px 10px 12px
  &:hover
    background-color #ccc
    color white
</style>
