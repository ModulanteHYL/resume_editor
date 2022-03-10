<template>
  <div>
    <ul :class="['row','dashed_border','edit_box']">
      <h4><input class="list_box" type="text" placeholder="项目名称..." v-model="proName"></h4>
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
      <button class="add_item" @click="addDescribe()">添加自定义项</button>
      <button class="add_project" @click="submitProject()">提交本条经验</button>
    </ul>
  </div>
</template>

<script>
export default {
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
</script>

<style lang="stylus" scoped>
.edit_box
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
  .add_item
    visibility hidden
    margin-left 20px
    margin-bottom 2%
  &:hover .add_item
    visibility visible
  .add_project
    margin-left 61%
  .other_item
    display inline-block
    width 150px
    margin 0
    word-wrap none
    input[type=text]
      width 90%
.row
  padding 0
  margin 10px
  li
    list-style none
    margin-left 11px
</style>
