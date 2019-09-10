<template>
	<section class="document">
		<div class="document_main">
			<el-tabs v-model="tabActiveName">
				<el-tab-pane label="接口文档" name="interface">
					<el-collapse v-model="collapseActiveNames">
						<el-collapse-item title="登录接口" name="login">
							<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
							<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			</el-tabs>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			tabActiveName: "interface",
            collapseActiveNames: []
		};
	}
};
</script>

<style lang="scss">
.document {
	width: 100%;
	padding: 30px;
}
.document_main {
	padding: 30px;
	box-sizing: border-box;
    background: #ffffff;
    .el-tab-pane{
        padding-top: 20px;
    }
}
</style>
