<template>
	<div :class="['admin_layout',isCollapse ? '':'open_menu']">
		<Header />
		<main class="admin">
			<aside>
				<el-menu
					:class="['admin_menu',menuHide ? 'hide' : '']"
					:collapse="isCollapse"
					:router="true"
					:default-active="this.$route.fullPath"
				>
					<el-menu-item @click="menuCollapse" class="center">
						<i :class="isCollapse === true ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
					</el-menu-item>
					<el-menu-item index="/admin/settings">
						<i class="el-icon-setting"></i>
						<span slot="title">配置</span>
					</el-menu-item>
					<el-menu-item index="/admin/media">
						<i class="el-icon-picture"></i>
						<span slot="title">媒体</span>
					</el-menu-item>
					<el-submenu index="/admin/posts">
						<template slot="title">
							<i class="el-icon-document"></i>
							<span slot="title">文章</span>
						</template>
						<el-menu-item index="/admin/posts">所有</el-menu-item>
						<el-menu-item index="/admin/posts/edit">新增</el-menu-item>
						<el-menu-item index="/admin/posts/categories">分类</el-menu-item>
						<el-menu-item index="/admin/posts/tag">标签</el-menu-item>
					</el-submenu>
					<el-menu-item index="/admin/users">
						<i class="el-icon-s-custom"></i>
						<span slot="title">用户</span>
					</el-menu-item>
					<el-menu-item index="/admin/document">
						<i class="iconfont icon-wendang"></i>
						<span slot="title">文档</span>
					</el-menu-item>
					<el-menu-item index="/admin/comment">
						<i class="iconfont icon-pinglun"></i>
						<span slot="title">评论</span>
					</el-menu-item>
				</el-menu>
				<div class="menu_btn_fixed" @click="menuHideEvent">
					<i class="el-icon-menu"></i>
				</div>
			</aside>
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
			isCollapse: true,
            menuHide: false,
		};
	},
	mounted() {
		if (window.outerWidth <= 540) {
			this.menuHide = true;
		}
	},
	methods: {
		menuHideEvent() {
			this.menuHide = !this.menuHide;
		},
		menuCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
};
</script>>

<style lang="scss">
.admin {
	display: flex;
	.admin_menu {
		padding-bottom: 3000px;
		margin-bottom: -3000px;
		overflow: hidden;
		transition: all 0.3s;
		&.hide {
			margin-left: -65px;
		}
	}
	.el-menu-item {
		&.center {
			text-align: center;
			&:hover {
				i {
					color: #409eff;
				}
			}
		}
		i {
			display: inline-block;
			min-width: 24px;
			margin-right: 5px;
			font-size: 18px;
			text-align: center;
		}
		span {
			min-width: 100px;
		}
	}
	.menu_btn_fixed {
		position: fixed;
		z-index: 9;
		left: 20px;
		bottom: 60px;
		display: none;
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 50%;
		cursor: pointer;
		transition: 0.3s;
		background: #fff;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
		color: #409eff;
		font-size: 20px;
	}
}

@media (max-width: 540px) {
	.admin {
		.menu_btn_fixed {
			display: block;
		}
	}
}
</style>