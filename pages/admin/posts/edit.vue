<template>
	<section class="edit" @keyup="saveChane">
		<header>
			<nuxt-link to="/admin/posts" class="go_back">
				<i class="iconfont icon-fanhui"></i>
			</nuxt-link>
			<div class="postTitle">
				<input type="text" placeholder="输入文章标题..." v-model="postData.postTitle" />
			</div>
			<div class="status_text">
				{{saveStatus ? "保存中..." : "文章自动保存到"}}
				<nuxt-link to v-show="!saveStatus" title="最近保存于 2019/8/27 下午9:53:20">草稿</nuxt-link>
			</div>
			<div class="cover_img_btn">
				<el-popover
					placement="top"
					width="310"
					trigger="manual"
					popper-class="edit_cover_img"
					v-model="popoverVisible"
				>
					<h4>添加文章封面</h4>
					<div class="pic">
						<i class="el-icon-circle-close" v-if="postData.coverImg" @click="postData.coverImg = ''"></i>
						<img :src="postData.coverImg" alt />
						<button @click="mediaDialogShowEv('coverImg')" v-if="!postData.coverImg">点击这里添加图片</button>
					</div>
					<i class="el-icon-picture" slot="reference" @click="popoverVisible = !popoverVisible"></i>
				</el-popover>
			</div>
			<button class="drawer_btn" @click="drawerVisible = true">发布</button>
		</header>
		<main class="mavonEditor">
			<client-only>
				<mavon-editor
					ref="md"
					:ishljs="false"
					:toolbars="toolbarsOption"
					@change="postContentChange"
					:scrollStyle="true"
					fontSize="14px"
					:subfield="toolbarsOption.preview"
					:boxShadow="false"
					v-model="postData.editContent"
				/>
			</client-only>
		</main>
		<mediaDialog
			:mediaDialogVisible="mediaDialogVisible"
			v-on:visible="mediaDialogVisibleEv"
			v-on:getUrl="getUrl"
		/>
		<el-drawer :visible.sync="drawerVisible" direction="rtl" class="edit_drawer">
			<el-button
				type="primary"
				class="publish_btn"
				@click="publishEv"
			>{{postData.postStatus === 0 ? "确定并发布" : "修改"}}</el-button>
			<div class="category_wrap">
				<h4>分类</h4>
				<el-radio-group v-model="postData.currentCategory[0]" size="small" @change="categoryChage">
					<el-radio
						:label="item.cValue"
						v-for="(item,index) in postData.categoryList"
						:key="index"
					>{{item.cName}}</el-radio>
				</el-radio-group>
				<div class="new-wrap">
					<a class="new" v-if="!categoryInputVisible" @click="showCategoryTagInput">新增分类</a>
					<div class="new_input" v-else>
						<el-input
							v-model="postData.newCategoryValue"
							ref="saveCategoryInput"
							placeholder="新增分类名"
							@keyup.enter.native="categoryInputConfirm"
							@blur="categoryInputConfirm"
						></el-input>
						<el-button type="primary" icon="el-icon-check" @click="categoryInputConfirm"></el-button>
					</div>
				</div>
			</div>
			<div class="describe_wrap">
				<h4>描述</h4>
				<el-input
					type="textarea"
					:rows="4"
					placeholder="请输入内容"
					v-model="postData.postDescribe"
					@blur="saveChane"
				></el-input>
			</div>
			<div class="comment_status">
				<h4>评论</h4>
				<el-switch
					v-model="postData.commentStatus"
					@change="commentChage"
					active-icon-class="el-icon-check"
				></el-switch>&nbsp;开启评论
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
				//文章编辑数据
				postId: null,
				coverImg: "",
				categoryList: [],
				currentCategory: [0],
				beforeCaregory: null,
				newCategoryValue: "",
				postTitle: "", //文章标题
				editContent: "", //文章内容
				postDescribe: "", //文章描述
				postStatus: 0, //文章状态，0为草稿，1为发布
				commentStatus: false, //评论是否开启
				categoryUpdate: false //是否有更新分类
			},
			whoClick: "",
			drawerVisible: false,
			categoryInputVisible: false,
			toolbarsOption: {
				//富文本编辑器工具栏配置
				bold: true,
				italic: true,
				header: true,
				underline: true,
				strikethrough: true,
				mark: true,
				ol: true,
				ul: true,
				quote: true,
				link: true,
				code: true,
				fullscreen: true,
				htmlcode: true,
				preview: true,
				navigation: false,
				imagelink: true
			},
			delay: null,
			saveStatus: false
		};
	},
	mounted() {
		this.postData.postId = this.$route.query.id;
		//获取文章数据
		this.getCurrentPost();

		if (window) {
			if (window.outerWidth <= 768) {
				this.toolbarsOption.preview = false;
			}
		}
		this.$nextTick(() => {
			//使用mavonEditor实例
			if (this.$refs.md) {
				// console.log(this.$refs.md.d_render);
				document.getElementsByClassName(
					"fa-mavon-picture-o"
				)[0].onclick = () => {
					this.whoClick = "mavon";
					this.mediaDialogVisible = true;
				};
			} else {
				setTimeout(() => {
					document.getElementsByClassName(
						"fa-mavon-picture-o"
					)[0].onclick = () => {
						this.whoClick = "mavon";
						this.mediaDialogVisible = true;
					};
				}, 100);
			}
		});
	},
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
			} else {
				//编辑器插入图片
				this.$refs.md.insertText(this.$refs.md.getTextareaDom(), {
					prefix: `![](`,
					subfix: ")",
					str: u
				});
			}
			this.mediaDialogVisible = false;
		},
		//当前页面控制media组件显示隐藏
		mediaDialogShowEv(s) {
			this.whoClick = s;
			this.mediaDialogVisible = true;
		},
		//显示分类添加input框
		showCategoryTagInput() {
			this.categoryInputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveCategoryInput.$refs.input.focus();
			});
		},
		//新增分类确认事件
		categoryInputConfirm() {
			this.categoryInputVisible = false;
			this.$axios({
				method: "post",
				url: "/api/addCategory",
				data: {
					cName: this.postData.newCategoryValue
				}
			})
				.then(res => {
					if (res.data.data[1]) {
						this.postData.categoryList.push({
							cValue: res.data.data[0].id,
							cName: res.data.data[0].name
						});
					} else {
						this.$message({
							type: "warning",
							message: "该分类已存在!"
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		//分类选择事件
		categoryChage() {
			if (
				this.postData.currentCategory[0] !==
				this.postData.beforeCaregory
			) {
				this.postData.categoryUpdate = true;
			} else {
				this.postData.categoryUpdate = false;
			}
			this.saveChane();
		},
		//文章内容改变事件
		postContentChange(con) {
			//文章内容变化事件
			// console.log(this.$refs.md.d_render);
		},
		//评论状态改变
		commentChage() {
			this.saveChane();
		},
		//保存更新事件
		saveChane() {
			this.saveStatus = true;
			window.clearInterval(this.delay);
			this.delay = setTimeout(() => {
				this.updatePostData();
			}, 3000);
		},
		//修改更新当前文章数据
		async updatePostData() {
			return await this.$axios({
				method: "post",
				url: "/api/addAndUpdatePost",
				data: {
					id: this.postData.postId,
					author: this.$store.state.authUser.id,
					title: this.postData.postTitle,
					content: this.postData.editContent,
					describe: this.postData.postDescribe,
					category: this.postData.currentCategory,
					status: this.postData.postStatus,
					featureImage: this.postData.coverImg,
					commentStatus: this.postData.commentStatus
						? "open"
						: "close",
					categoryUpdate: this.postData.categoryUpdate
				}
			})
				.then(res => {
					if (res.data.id) {
						this.$router.push({
							query: {
								id: res.data.id
							}
						});
						this.postData.postId = res.data.id;
					}
					if (
						res.data.postTitle &&
						res.data.postTitle !== this.postData.title
					) {
						this.postData.postTitle = res.data.postTitle;
					}
					this.saveStatus = false;
					return true;
				})
				.catch(err => {});
		},
		//获取当前文章数据
		async getCurrentPost() {
			let res = await this.$axios({
				method: "post",
				url: "/api/findPost",
				data: {
					postId: this.postData.postId
				}
			});
			if (res.data.post) {
				this.postData.coverImg = res.data.post.coverImg;
				this.postData.postTitle = res.data.post.postTitle;
				this.postData.editContent =
					res.data.post.editContent === null
						? ""
						: res.data.post.editContent;
				this.postData.postDescribe = res.data.post.postDescribe;
				this.postData.commentStatus =
					res.data.post.commentStatus === "close" ? false : true;
				this.postData.postStatus = res.data.post.postStatus;
			}
			this.postData.currentCategory.length = 0;

			let interimObj = {}; //新增临时对象用于去重
			for (let i in res.data.category) {
				if (
					res.data.category[i].term_relationship !== null &&
					res.data.category[i].term_relationship.postId ===
						parseInt(this.postData.postId)
				) {
					this.postData.currentCategory.push(
						res.data.category[i].cValue
					);
					this.postData.beforeCaregory = res.data.category[i].cValue;
				}
				if (!interimObj[res.data.category[i].cValue]) {
					//如果对象中找不到当前数组元素的值则将改值存进临时对象与去重后的数组中
					interimObj[res.data.category[i].cValue] = 1;
					this.postData.categoryList.push(res.data.category[i]);
				}
			}
		},
		//发布文章
		async publishEv() {
			let postData = this.postData;
			if (postData.postTitle === "" && postData.editContent === "") {
				this.$message.error("缺少文章标题或内容!");
				return false;
			}
			if (this.postData.postStatus === 0) {
				this.postData.postStatus = 1;
				let updateRes = await this.updatePostData();
				if (updateRes) {
					this.$message({
						type: "success",
						message: "已发布!"
					});
				}
			} else {
				let updateRes = await this.updatePostData();
				if (updateRes) {
					this.$message({
						type: "success",
						message: "已修改!"
					});
				}
			}
		}
	}
};
</script>

<style lang="scss">
.edit {
	height: 100%;
	header {
		position: relative;
		display: flex;
		align-items: center;
		padding: 12px 20px 12px;
		background: #ffffff;
		border-bottom: 1px solid #e0e0e0;
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
		background: none;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	}
	.postTitle {
		max-width: 500px;
		width: 100%;
		padding-left: 40px;
		input {
			width: 100%;
			height: 30px;
			border: none;
			outline: none;
			font-size: 28px;
			font-weight: bold;
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
		> div {
			border-bottom: 1px solid #ebeef5;
			&:last-of-type {
				border-bottom: none;
			}
		}
	}
	.publish_btn {
		width: 100%;
		margin-bottom: 30px;
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
	.describe_wrap {
		padding-top: 30px;
		padding-bottom: 20px;
	}
	.comment_status {
		padding-top: 30px;
	}
}
.mavonEditor {
	max-width: 100%;
	max-height: 100%;
	height: calc(100% - 62px);
	padding: 15px;
	box-sizing: border-box;
	.markdown-body {
		height: 100%;
	}
	.op-image.popup-dropdown {
		display: none !important;
	}
}

@media (max-width: 768px) {
	.edit {
		.postTitle {
			max-width: 200px;
			input {
				font-size: 18px;
			}
		}
	}
	.edit_drawer {
		.el-drawer {
			width: 50% !important;
		}
	}
}
@media (max-width: 540px) {
	.edit {
		.status_text {
			display: none;
		}
		.postTitle {
			max-width: 180px;
			padding-left: 20px;
		}
	}
	.edit_drawer {
		.el-drawer {
			width: 70% !important;
		}
	}
}
@media (max-width: 375px) {
	.edit_drawer {
		.el-drawer {
			width: 90% !important;
		}
	}
}
</style>