<template>
	<section class="media_dialog">
		<el-dialog :visible.sync="mediaDialogVisible" width="90%" :before-close="dialogClose">
			<el-tabs v-model="activeName">
				<el-tab-pane label="文件列表" name="list">
					<div class="file_list">
						<ul @click="fileEvent" class="list">
							<li class="file_item" v-for="(item,index) in fileList" :key="index" :fileIndex="index">
								<div class="pic">
									<img :src="item.url" alt />
								</div>
							</li>
						</ul>
					</div>
				</el-tab-pane>
				<el-tab-pane label="上传" name="upload">
					<div class="upload_container">
						<el-upload
							class="upload"
							drag
							action="/"
							:file-list="fileList"
							multiple
							:show-file-list="false"
							:before-upload="beforeAvatarUpload"
						>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">
								将文件拖到这里，或者
								<em>点击上传</em>
							</div>
							<div class="el-upload__tip" slot="tip">上传文件大小不能超过2MB</div>
						</el-upload>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</section>
</template>

<script>
export default {
	data() {
		return {
			activeName: "list",
			fileList: [
				{
					name: "food.jpeg",
					url: "http://via.placeholder.com/200x100"
				},
				{
					name: "food2.jpeg",
					url:
						"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
				}
			]
		};
	},
	props: ["mediaDialogVisible"],
	methods: {
		dialogClose(done) {
			this.$emit("visible", false);
		},
		fileEvent(e) {
			let ev = ev || window.event,
				target = ev.target || ev.srcElement,
				fileIndex;
			while (target.className != "list") {
				if (target.className == "file_item") {
					fileIndex = target.getAttribute("fileIndex");
					this.$emit("getUrl", this.fileList[fileIndex].url);
					break;
				}
				target = target.parentNode;
			}
		},
		beforeAvatarUpload() {
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
.media_dialog {
	.file_list {
		padding: 30px 0px;
		box-sizing: border-box;
		ul {
			display: flex;
			flex-wrap: wrap;
			margin-left: -20px;
		}
		li {
			position: relative;
			max-width: 180px;
			width: calc(10% - 20px);
			margin-left: 20px;
			margin-bottom: 20px;
			background: #fff;
			border: 2px dashed #e6e6e6;
			box-sizing: border-box;
			border-radius: 6px;
			overflow: hidden;
			cursor: pointer;
			&:hover {
				.shade {
					opacity: 1;
				}
			}
			&::before {
				content: "";
				display: block;
				padding-top: 100%;
			}
		}
		.pic {
			position: absolute;
			top: 0px;
			left: 0px;
			display: flex;
			align-items: center;
			height: 100%;
		}
		.shade {
			position: absolute;
			left: 0px;
			top: 0px;
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			background: rgba($color: #000000, $alpha: 0.5);
			transition: all 0.3s;
			opacity: 0;
			.file_icon {
				margin: 0 auto;
				font-size: 22px;
				color: #fff;
			}
			i {
				cursor: pointer;
				&:nth-of-type(2n-1) {
					margin-right: 10px;
				}
			}
		}
	}
	.upload_container {
		display: flex;
		padding: 0px 20px;
		background: #fff;
		box-sizing: border-box;
		transition: all 0.3s;
	}
	.upload {
		width: 100%;
		margin: 0 auto;
	}
	.el-upload {
		width: 100%;
	}
	.el-upload-dragger {
		max-width: 100%;
		margin: 0 auto;
		transition: all 0.3s;
	}
}
@media (max-width: 1600px) {
	.media_dialog {
		.file_list li {
			width: calc(12.5% - 20px);
		}
	}
}
@media (max-width: 1366px) {
	.media_dialog {
		.file_list li {
			width: calc(14.28% - 20px);
		}
	}
}
@media (max-width: 1200px) {
	.media_dialog {
		.file_list li {
			width: calc(16.66% - 20px);
		}
	}
}
@media (max-width: 768px) {
	.media_dialog {
		.file_list li {
			width: calc(25% - 20px);
		}
	}
}
@media (max-width: 540px) {
	.media_dialog {
		padding: 30px 10px;
		.file_list li {
			width: calc(33.33% - 20px);
		}
	}
}
@media (max-width: 320px) {
	.media_dialog {
		.file_list {
			ul {
				margin-left: -10px;
			}
			li {
				width: calc(50% - 10px);
				margin-left: 10px;
			}
		}
	}
}
</style>