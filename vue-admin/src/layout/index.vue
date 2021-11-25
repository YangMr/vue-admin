<template>
  <div class="app-wrapper " :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
      <sidebar></sidebar>  
      <div class="main-container">
          <div class="fixed-header">
              <navbar></navbar>
          </div>
          <app-main></app-main>
      </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar"
import AppMain from "./components/AppMain.vue"
import Navbar from "./components/Navbar.vue"
export default {
  name: "",
  data() {
    return {};
  },
  components: {
      Sidebar,
      AppMain,
      Navbar
  },
};
</script>

<style scoped lang="scss"> 
@import "../style/variables.scss";
@import "../style/mixin.scss";

.app-wrapper{
  @include clearfix;
  @include relative;
}

.fixed-header{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  background: yellow;
  width:calc(100% - #{$sideBarWidth});
}
.hideSidebar{

  .fixed-header{
    width:calc(100% - 54px);
  }
}
</style>
