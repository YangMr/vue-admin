<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods : {
      toggleClick(){
        this.$store.commit("app/triggerSidebarOpened")
      }
  },
  computed : {
      icon(){
        return this.$store.getters.sidebarOpened ? "hamburger-opened" : "hamburger-closed";
      }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.hamburger-container{
    padding: 0 16px;
    .hamburger{
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
    }
}
</style>
