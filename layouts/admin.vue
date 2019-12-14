<template>
	<div class="admin_layout">
		<header class="admin_header is_fixed">
			<div class="page_header">
				<div class="container">
					<div class="ment_show" @click="menuShow = !menuShow" v-if="mobile">
						<i class="iconfont icon-caidan"></i>
					</div>
					<div class="logo">
						<nuxt-link to="/">
							<img src="~/assets/image/logo.png" alt />
						</nuxt-link>
					</div>
					<nav class="navigator">
						<el-dropdown @command="dropdownCommand">
							<div class="header_dropdown">
								<img src="http://via.placeholder.com/32x32" alt />
							</div>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="/admin">后台管理</el-dropdown-item>
								<!-- <el-dropdown-item command="/user">我的主页</el-dropdown-item> -->
								<el-dropdown-item command="/login" divided>注册</el-dropdown-item>
								<el-dropdown-item command="/login">登录</el-dropdown-item>
								<el-dropdown-item command="logout">注销</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</nav>
				</div>
			</div>
			<div class="admin_menu" v-show="menuShow">
				<div class="container">
					<el-menu
						:router="true"
						:mode="mobile ? 'vertical' : 'horizontal'"
						:default-active="this.$route.fullPath"
					>
						<el-menu-item index="/admin" class="hover_scale">
							<i class="el-icon-s-data"></i>
							<span slot="title">数据</span>
						</el-menu-item>
						<el-menu-item index="/admin/settings" class="hover_scale">
							<i class="el-icon-setting"></i>
							<span slot="title">配置</span>
						</el-menu-item>
						<el-menu-item index="/admin/media" class="hover_rotate">
							<i class="el-icon-picture"></i>
							<span slot="title">媒体</span>
						</el-menu-item>
						<el-submenu index="/admin/posts" class="hover_translate_vertical">
							<template slot="title">
								<i class="el-icon-document"></i>
								<span slot="title">文章</span>
							</template>
							<el-menu-item index="/admin/posts">
								<i class="el-icon-document"></i>
								<span slot="title">所有</span>
							</el-menu-item>
							<el-menu-item index="/admin/posts/edit">
								<i class="el-icon-circle-plus"></i>
								<span slot="title">新增</span>
							</el-menu-item>
							<el-menu-item index="/admin/posts/categories">
								<i class="el-icon-menu"></i>
								<span slot="title">分类</span>
							</el-menu-item>
							<el-menu-item index="/admin/posts/tag">
								<i class="el-icon-price-tag"></i>
								<span slot="title">标签</span>
							</el-menu-item>
						</el-submenu>
						<el-menu-item index="/admin/users" class="hover_translate">
							<i class="el-icon-s-custom"></i>
							<span slot="title">用户</span>
						</el-menu-item>
						<el-menu-item index="/admin/document" class="hover_rotate">
							<i class="iconfont icon-wendang"></i>
							<span slot="title">文档</span>
						</el-menu-item>
						<el-menu-item index="/admin/comment" class="hover_scale">
							<i class="iconfont icon-pinglun"></i>
							<span slot="title">评论</span>
						</el-menu-item>
					</el-menu>
				</div>
			</div>
		</header>
		<main class="admin">
			<nuxt />
		</main>
	</div>
</template>

<script>
import Header from "~/components/header.vue";
export default {
	components: {
		Header
	},
	data() {
		return {
			mobile: false,
			menuShow: true
		};
	},
	mounted() {
		document.getElementsByTagName("body")[0].classList.add("admin");
		if (window) {
			if (window.outerWidth <= 540) {
				this.mobile = true;
				this.menuShow = false;
			}
		}
    },
    beforeDestroy: function() {
		document.getElementsByTagName("body")[0].classList.remove("admin");
	},
	methods: {
		dropdownCommand(command) {
			if (command == "logout") {
				this.$confirm("是否确定注销用户?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						console.log(123);
					})
					.catch(() => {});
			} else {
				if (this.$route.fullPath !== command) {
					this.$router.push(command);
				}
			}
		}
	}
};
</script>

<style lang="scss">
.admin_header {
	min-height: 113px;
	&.is_fixed {
		.page_header {
			position: fixed;
			z-index: 100;
			display: flex;
			align-items: center;
			width: 100%;
			min-height: 52px;
			background-color: #1976d2;
			background-clip: content-box;
		}
	}
	.container {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.ment_show {
		display: flex;
		align-items: center;
		width: 32px;
		text-align: center;
		i {
			margin: 0 auto;
			font-size: 20px;
			color: #ffffff;
			cursor: pointer;
		}
	}
	.logo {
		margin: 0 auto;
	}
	.navigator {
		display: flex;
		height: 100%;
		// margin-left: auto;
	}
	.el-dropdown {
		border-radius: 50%;
		overflow: hidden;
	}
}
.admin_menu {
	position: fixed;
	top: 52px;
	z-index: 9;
	width: 100%;
	background: #ffffff;
	box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
	.el-menu.el-menu--horizontal {
		border-bottom: none;
	}
}
.admin {
}

@media (max-width: 540px) {
	.admin_header {
		min-height: 52px;
	}
	.admin_menu {
		.el-menu {
			width: 100%;
			border-right: none;
		}
		li {
			outline: none;
		}
	}
}
</style>