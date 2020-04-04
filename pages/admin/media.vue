<template>
	<section class="media">
		<div class="media_main">
			<div class="upload_container">
				<el-upload
					class="upload"
					drag
					action="/file/upload"
					:headers="uploadHeaders"
					:file-list="fileList"
					list-type="picture"
					multiple
					:before-upload="beforeAvatarUpload"
					:on-remove="deleteFile"
					:before-remove="beforeRemove"
				>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">
						将文件拖到这里，或者
						<em>点击上传</em>
					</div>
					<div class="el-upload__tip" slot="tip">上传文件大小不能超过2MB</div>
				</el-upload>
			</div>
			<el-dialog :visible.sync="fileDialogVisible">
				<img width="100%" :src="'/upload/2019/10/tiankongzhichneg.jpeg'" alt />
			</el-dialog>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			fileList: [],
			//element的file-list属性是只读读，如果改变它读值，在同时上传多个文件时会报错
			showFileList: [],
			fileDialogVisible: false,
			filedialogImageUrl: {},
			uploadHeaders: {}
		};
	},
	async asyncData(app) {
		return await app
			.$axios({
				method: "get",
				url: "/file/get"
			})
			.then(res => {
				return {
					fileList: res.data.files,
					showFileList: res.data.files
				};
			});
	},
	mounted() {
		this.uploadHeaders.authorization =
			"Bearer " + this.$store.state.authUser.token;
	},
	methods: {
		async beforeRemove() {
			await this.$confirm("确定删除文件?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			});
		},
		deleteFile(file, fileList) {
			this.$axios({
				method: "post",
				url: "/file/delete",
				data: {
					filePath: file.url
				}
			}).then(res => {
				if (res.data.result) {
					this.$message({
						type: "success",
						message: "删除成功!"
					});
				}
			});
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error("上传文件大小不能超过 2MB!");
			}
			return isLt2M;
		}
	}
};
</script>

<style lang="scss">
.media {
	width: 100%;
	padding: 30px;
	box-sizing: border-box;
	.media_main {
		// background: #ffffff;
	}
	.el-upload-dragger {
		max-width: 100%;
	}
	.el-upload {
		width: 100%;
		padding: 40px 20px;
		box-sizing: border-box;
		border: 1px dashed #e6e6e6;
		background: #ffffff;
		transition: all 0.3s;
		&:hover {
			border-color: #409eff;
		}
		.el-upload-dragger {
			margin: 0 auto;
		}
	}
	.el-upload-list {
		display: flex;
		flex-wrap: wrap;
		padding-top: 10px;
		margin-left: -20px;
		li {
			position: relative;
			width: calc(12.5% - 20px);
			height: auto;
			margin-left: 20px;
			margin-top: 20px;
			padding: 0px;
			cursor: pointer;
			&::before {
				content: "";
				display: block;
				padding-top: 100%;
			}
			&:hover {
				a.el-upload-list__item-name {
					opacity: 1;
					color: #ffffff;
				}
				i {
					color: #ffffff;
				}
			}
		}
		a.el-upload-list__item-name {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 2;
			top: 0px;
			left: 0px;
			margin: 0px;
			padding: 10px;
			box-sizing: border-box;
			background-color: rgba($color: #000000, $alpha: 0.5);
			text-align: center;
			// color: #ffffff;
			opacity: 0;
		}
		img {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			float: none;
			width: auto;
			height: auto;
			margin: auto;
		}
		label,
		i {
			z-index: 3;
		}
	}
	@media (max-width: 1024px) {
		.el-upload-list {
			li {
				width: calc(20% - 20px);
			}
		}
	}
	@media (max-width: 540px) {
		padding: 30px 10px;
		.el-upload-list {
			margin-left: -10px;
			li {
				width: calc(25% - 10px);
				margin-left: 10px;
				margin-top: 10px;
			}
		}
	}
}
</style>
