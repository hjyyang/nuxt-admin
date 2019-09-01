<template>
	<section class="edit">
		<header>
			<div class="container">
				<nuxt-link to="/admin/posts" class="go_back">
					<i class="iconfont icon-fanhui"></i>
				</nuxt-link>
				<div class="status_text">
					Articles are automatically saved to
					<nuxt-link to title="最近保存于 2019/8/27 下午9:53:20">drafts</nuxt-link>
				</div>
				<div class="cover_img_btn">
					<el-popover
						placement="top"
						width="310"
						trigger="manual"
						popper-class="edit_cover_img"
						v-model="popoverVisible"
					>
						<h4>Add a larger image of the cover</h4>
						<div class="pic">
							<i class="el-icon-circle-close" v-if="postData.coverImg" @click="postData.coverImg = ''"></i>
							<img :src="postData.coverImg" alt />
							<button
								@click="mediaDialogShowEv('coverImg')"
								v-if="!postData.coverImg"
							>Click here to add an image</button>
						</div>
						<i class="el-icon-picture" slot="reference" @click="popoverVisible = !popoverVisible"></i>
					</el-popover>
				</div>
				<button class="drawer_btn" @click="drawerVisible = true">Publish</button>
			</div>
		</header>
		<mediaDialog
			:mediaDialogVisible="mediaDialogVisible"
			v-on:visible="mediaDialogVisibleEv"
			v-on:getUrl="getUrl"
		/>
		<el-drawer :visible.sync="drawerVisible" direction="rtl" class="edit_drawer">
			<el-button type="primary" class="publish_btn">Identify and publish</el-button>
			<div class="category_wrap">
				<h4>Category</h4>
				<el-radio-group v-model="postData.currentCategory" size="small">
					<el-radio
						:label="item.cValue"
						v-for="(item,index) in postData.categoryList"
						:key="index"
					>{{item.cName}}</el-radio>
				</el-radio-group>
				<div class="new-wrap">
					<a class="new" v-if="!categoryInputVisible" @click="showCategoryTagInput">New Category</a>
					<div class="new_input" v-else>
						<el-input
							v-model="postData.newCategoryValue"
							ref="saveCategoryInput"
							placeholder="New category name"
							@keyup.enter.native="categoryInputConfirm"
							@blur="categoryInputConfirm"
						></el-input>
						<el-button type="primary" icon="el-icon-check" @click="categoryInputConfirm"></el-button>
					</div>
				</div>
			</div>
			<div class="tag_wrap">
				<h4>Tag</h4>
				<div class="tag_main">
					<el-tag
						:key="index"
						:type="tag.selected ? 'success' : ''"
						v-for="(tag,index) in postData.postTags"
						:disable-transitions="false"
						@click="selectTagEv(index)"
					>{{tag.tagName}}</el-tag>
					<el-button
						v-if="!tagInputVisible"
						class="button_new_tag"
						size="small"
						@click="showNewTagInput"
					>+ New Tag</el-button>
					<el-input
						class="input_new_tag"
						v-else
						v-model="postData.NewTagValue"
						ref="saveTagInput"
						size="small"
						@keyup.enter.native="tagInputConfirm"
						@blur="tagInputConfirm"
					></el-input>
				</div>
			</div>
		</el-drawer>
	</section>
</template>

<script>
import mediaDialog from "~/components/mediaDialog.vue";
export default {
	layout: "edit",
	components: {
		mediaDialog
	},
	data() {
		return {
			popoverVisible: false,
			mediaDialogVisible: false,
			postData: {
				coverImg: "",
				categoryList: [
					{
						cName: "unclassified",
						cValue: 0
					},
					{
						cName: "javascript",
						cValue: 1
					},
					{
						cName: "plugin",
						cValue: 2
					}
				],
				currentCategory: 0,
				newCategoryValue: "",
				postTags: [
					{
						tagName: "js",
						tagIndex: 0,
						selected: true
					},
					{
						tagName: "css",
						tagIndex: 3,
						selected: false
					},
					{
						tagName: "mml",
						tagIndex: 2,
						selected: false
					}
				],
				NewTagValue: ""
			},
			whoClick: "",
			drawerVisible: false,
			categoryInputVisible: false,
			tagInputVisible: false
		};
	},
	mounted() {},
	methods: {
		mediaDialogVisibleEv(e) {
			//media组件控制显示隐藏
			this.mediaDialogVisible = e;
		},
		getUrl(u) {
			//获取media组件选择的文件地址
			if (this.whoClick === "coverImg") {
				//判断是哪个按钮触发media组件
				this.postData.coverImg = u;
			}
			this.mediaDialogVisible = false;
		},
		mediaDialogShowEv(s) {
			//当前页面控制media组件显示隐藏
			this.whoClick = s;
			this.mediaDialogVisible = true;
		},
		selectTagEv(e) {
			//标签选择
			this.postData.postTags[e].selected = !this.postData.postTags[e]
				.selected;
		},
		showNewTagInput() {
			//显示tag添加input
			this.tagInputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},
		tagInputConfirm() {
			//新增tag确认事件
			this.tagInputVisible = false;
			this.postData.NewTagValue = "";
		},
		showCategoryTagInput() {
			//显示catgory添加input
			this.categoryInputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveCategoryInput.$refs.input.focus();
			});
		},
		categoryInputConfirm() {
			//新增category确认事件
			this.categoryInputVisible = false;
			this.postData.newCategoryValue = "";
		}
	}
};
</script>

<style lang="scss">
.edit {
	height: 100%;
	background: #ffffff;
	header {
		padding-top: 10px;
		.container {
			display: flex;
			align-items: center;
		}
	}
	.go_back {
		display: block;
		&:hover {
			opacity: 0.8;
			i {
				color: #409eff;
			}
		}
		i {
			font-size: 30px;
			color: #ddd;
			transition: all 0.3s;
		}
	}

	.status_text {
		padding: 0px 14px;
		margin-left: auto;
		font-size: 16px;
		color: #ddd;
		a {
			color: #ddd;
			text-decoration: underline !important;
			&:hover {
				color: #409eff;
			}
		}
	}
	.cover_img_btn {
		padding: 0px 14px;
		font-size: 28px;
		color: #ddd;
		i {
			cursor: pointer;
			outline: none;
		}
	}
	.drawer_btn {
		border: none;
		outline: none;
		font-size: 16px;
		color: #007fff;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}
}

.edit_cover_img {
	padding: 20px;
	box-sizing: border-box;
	text-align: center;
	.pic {
		position: relative;
		i {
			position: absolute;
			top: 10px;
			right: 10px;
			font-size: 24px;
			cursor: pointer;
		}
	}
	h4 {
		margin-bottom: 10px;
		font-size: 18px;
		color: hsla(218, 9%, 51%, 0.8);
	}
	button {
		width: 100%;
		height: 96px;
		border: none;
		color: rgba(51, 51, 51, 0.4);
		background-color: hsla(0, 0%, 87%, 0.6);
		outline: none;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			opacity: 0.8;
		}
	}
}
.edit_drawer {
	.el-drawer {
		width: 24% !important;
	}
	header {
		// font-size: 18px;
		margin-bottom: 10px;
	}
	.el-drawer__body {
		padding: 0px 20px;
	}
	.publish_btn {
		width: 100%;
		margin-bottom: 30px;
	}
	.category_wrap {
		border-bottom: 1px solid #ebeef5;
	}
	h4 {
		margin-bottom: 20px;
		font-size: 16px;
		color: #909090;
	}
	.el-radio {
		margin-bottom: 12px;
	}
	.new-wrap {
		margin: 10px 0px 30px;
	}
	a.new {
		font-size: 14px;
		color: #007fff;
		text-decoration: underline !important;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}
	.new_input {
		display: flex;
		input {
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
			border-right: 0px;
		}
		button {
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
	.tag_wrap {
		padding-top: 30px;
		.tag_main {
			line-height: 32px;
		}
		.el-tag {
			cursor: pointer;
			& + .el-tag {
				margin: 0px 0px 16px 12px;
			}
		}
		.button_new_tag {
			margin-left: 10px;
		}
		.input_new_tag {
			max-width: 93px;
			margin-left: 10px;
		}
	}
}
</style>