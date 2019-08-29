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
								@click="mediaDialogShowEvent('coverImg')"
								v-if="!postData.coverImg"
							>Click here to add an image</button>
						</div>
						<i class="el-icon-picture" slot="reference" @click="popoverVisible = !popoverVisible"></i>
					</el-popover>
				</div>
				<button class="publish_btn" @click="drawerVisible = true">Publish</button>
			</div>
		</header>
		<mediaDialog
			:mediaDialogVisible="mediaDialogVisible"
			v-on:visible="mediaDialogVisibleEvent"
			v-on:getUrl="getUrl"
		/>
		<el-drawer title="Published articles" :visible.sync="drawerVisible" direction="rtl" class="edit_drawer">
			<el-select v-model="postData.currentCategory" placeholder="Please select category">
				<el-option
					v-for="(item,index) in postData.categoryList"
					:key="index"
					:label="item.cName"
					:value="item.cValue"
				></el-option>
			</el-select>
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
						cName: "js",
						cValue: 1
					}
				],
				currentCategory: ""
			},
			whoClick: "",
            drawerVisible: false,
		};
    },
    mounted(){
    },
	methods: {
		mediaDialogVisibleEvent(e) {
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
		mediaDialogShowEvent(s) {
			//当前页面控制media组件显示隐藏
			this.whoClick = s;
			this.mediaDialogVisible = true;
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
	.publish_btn {
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
	}
}
.edit_drawer{

}
</style>