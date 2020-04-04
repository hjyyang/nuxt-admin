<template>
	<section class="settings">
		<div class="setting_main">
			<el-tabs>
				<el-tab-pane label="配置">
					<el-form label-position="right" label-width="140px" :model="formData">
						<el-form-item label="网站标题">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
						<el-form-item label="Slogan">
							<el-input v-model="formData.region"></el-input>
						</el-form-item>
						<el-form-item label="Logo">
							<el-input v-model="formData.logo" clearable></el-input>
							<div class="pic" @click="mediaDialogVisible = true">
								<i class="el-icon-plus"></i>
								<div class="pic_wrap">
									<img :src="formData.logo" alt />
								</div>
							</div>
						</el-form-item>
						<el-form-item label="版权(copyright)">
							<el-input v-model="formData.copyright"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="分享">
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
			<div class="save_btn">
				<el-button type="primary" size="small">保存</el-button>
			</div>
		</div>
		<mediaDialog
			:mediaDialogVisible="mediaDialogVisible"
			v-on:visible="mediaDialogVisibleEv"
			v-on:getUrl="getUrl"
		/>
	</section>
</template>

<script>
import mediaDialog from "~/components/mediaDialog.vue";
export default {
	layout: "admin",
	components: {
		mediaDialog
	},
	data() {
		return {
			formData: {
				name: "",
				region: "",
				type: "",
				logo: "",
				Copyright: ""
			},
			mediaDialogVisible: false
		};
	},
	methods: {
		mediaDialogVisibleEv(e) {
			//media组件显示隐藏
			this.mediaDialogVisible = e;
		},
		getUrl(u) {
			//获取media组件选择的文件地址
			this.formData.logo = u;
			this.mediaDialogVisible = false;
		}
	}
};
</script>

<style lang="scss">
.settings {
	width: 100%;
	padding: 30px;
	box-sizing: border-box;
}
.setting_main {
	padding: 30px 30px;
	background: #ffffff;
	.el-form-item {
		max-width: 600px;
		&:last-of-type {
			margin-bottom: 0px;
		}
	}
	.el-tabs__content {
		padding: 30px 15px;
	}
	.save_btn {
		display: flex;
		button {
			margin-top: 60px;
			margin-left: auto;
		}
	}
	.pic {
		position: relative;
		margin-top: 20px;
		max-width: 120px;
		width: 100%;
		border: 1px dashed #e6e6e6;
		cursor: pointer;
		i {
			position: absolute;
			left: 0px;
			right: 0px;
			top: 0px;
			bottom: 0px;
			margin: auto;
			width: 30px;
			height: 30px;
			font-size: 30px;
            transition: all .3s;
		}
        &:hover{
            i{
                transform: rotate(180deg);
            }
        }
		&::before {
			content: "";
			display: block;
			padding-top: 100%;
		}
		.pic_wrap {
			position: absolute;
			top: 0px;
			left: 0px;
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
		}
	}
}
@media (max-width: 540px) {
	.settings {
		padding:  30px 10px;
	}
	.setting_main {
		padding: 0px 0px 20px 0px;
		.save_btn button {
			margin-top: 40px;
			margin-right: 20px;
		}
		.el-form-item__label {
			width: auto !important;
		}
		.el-form-item__content {
			margin-left: 0px !important;
		}
	}
}
</style>
