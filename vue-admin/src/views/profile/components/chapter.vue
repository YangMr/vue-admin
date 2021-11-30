<template>
  <div>
    <el-timeline>
      <el-timeline-item v-for="(item) in chapterArray" :key="item.id" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{item.content}}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "",
  props : {
      chapterArray : {
          type : Array,
          default : []
      }
  },
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped></style>
