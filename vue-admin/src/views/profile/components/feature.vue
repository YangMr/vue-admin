<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item) in featureArray" :key="item.id" :title="item.title" :name="item.id">
        <div v-html="item.content">
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "",
  props : {
      featureArray : {
          type : Array,
          default : []
      }
  },
  data() {
    return {
        activeName : 1
    };
  },
  components: {},
};
</script>

<style scoped></style>
