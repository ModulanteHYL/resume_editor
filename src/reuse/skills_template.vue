<template>
  <div class="dashed_border skill_wrap">
      <section style="margin-bottom: 10px">
        <label for="skillName">技能名称:</label>
        <input name="skillName" type="text" v-model="skillName">
      </section>
      <section style="margin-bottom: 10px">
        <label for="skillDesc">使用情况描述:</label>
        <input name="skillDesc" type="text" v-model="content" style="width: 87%;">
      </section>
      <section v-text-center >
        <button @click="addOneSkill">提交</button>
      </section>
  </div>
</template>

<script>
const SkillsTemplateVue = {
  data () {
    return {
      skillName: '', // 技能名称
      content: '' // 技能描述
    }
  },
  methods: {
    addOneSkill () {
      this.$emit('addOneSkill', {
        skillName: this.skillName,
        content: this.content
      })
    }
  }
}
export default SkillsTemplateVue
</script>

<style lang="stylus" scoped>
.skill_wrap
  padding 5px 10px;
</style>
