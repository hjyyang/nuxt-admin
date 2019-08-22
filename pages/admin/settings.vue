<template>
	<section class="settings">
		<div class="setting_main">
			<el-tabs type="border-card">
				<el-tab-pane label="常规设置">
					<el-form label-position="right" label-width="140px" :model="formData">
						<el-form-item label="网站标题">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
						<el-form-item label="标语">
							<el-input v-model="formData.region"></el-input>
						</el-form-item>
						<el-form-item label="logo">
							<el-input v-model="formData.type"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="联系方式">
					<el-form label-position="right" label-width="140px" :model="formData">
						<el-form-item label="Github">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
						<el-form-item label="新浪微博">
							<el-input v-model="formData.region"></el-input>
						</el-form-item>
						<el-form-item label="思否">
							<el-input v-model="formData.type"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
            <el-button type="primary" size="small">保存</el-button>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			formData: {
				name: "",
				region: "",
				type: ""
			}
		};
	},
	asyncData() {}
};
</script>

<style lang="scss">
.settings {
	width: 100%;
	padding: 30px;
	box-sizing: border-box;
}
.setting_main {
	padding: 60px 30px;
	background: #ffffff;
	.el-form-item {
		max-width: 800px;
		&:last-of-type {
			margin-bottom: 0px;
		}
	}
	.el-tabs__content {
		padding: 30px 15px;
	}
    button{
        margin-top: 60px;
    }
}
</style>
