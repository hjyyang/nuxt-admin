<template>
    <div class="home">
        <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
        <el-tag>标签一</el-tag>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    asyncData() {}
};
</script>

<style>
</style>
