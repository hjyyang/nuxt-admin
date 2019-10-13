<template>
	<header class="app_header is_fixed">
		<div class="page_header">
			<div class="logo">
				<nuxt-link to="/">
					<ruby>
						<span>風間の少年</span>
						<rp></rp>
						<rt>风间的少年</rt>
						<rp></rp>
					</ruby>
				</nuxt-link>
			</div>
			<nav id="app_menu">
				<ul class="menu">
					<li class="item current" index="/">
						<nuxt-link to="/" class="hover_scale">
							<span>
								<i class="iconfont icon-1"></i>首页
							</span>
						</nuxt-link>
					</li>
					<li class="item" index="/archive">
						<nuxt-link to="/archive" class="hover_rotate">
							<i class="el-icon-s-management"></i>
							<span>归档</span>
						</nuxt-link>
						<ul class="sub_menu">
							<li class="sub_item">
								<nuxt-link to="/" class="hover_rotate">
									<span>
										<i class="el-icon-document"></i>文章
									</span>
								</nuxt-link>
							</li>
							<li class="sub_item">
								<nuxt-link to="/" class="hover_rotate">
									<span>
										<i class="iconfont icon-icon_category"></i>分类
									</span>
								</nuxt-link>
							</li>
							<li class="sub_item">
								<nuxt-link to="/" class="hover_rotate">
									<span>
										<i class="iconfont icon-biaoqian1"></i>标签
									</span>
								</nuxt-link>
							</li>
						</ul>
					</li>
					<li class="item">
						<nuxt-link to="/" class="hover_translate">
							<i class="iconfont icon-about"></i>关于
						</nuxt-link>
					</li>
					<li class="item">
						<nuxt-link to="/" class="hover_translate_vertical">
							<i class="el-icon-edit-outline"></i>
							<span>留言板</span>
						</nuxt-link>
					</li>
					<li class="item">
						<nuxt-link to="/" class="hover_scale">
							<i class="iconfont icon-icon-test"></i>
							<span>吉他</span>
						</nuxt-link>
					</li>
				</ul>
			</nav>
			<div class="navigator">
				<el-dropdown @command="dropdownCommand">
					<div class="header_dropdown">
						<i class="iconfont icon-user1"></i>
					</div>
					<el-dropdown-menu slot="dropdown" class="app_dropdown">
						<el-dropdown-item command="/admin">后台管理</el-dropdown-item>
						<!-- <el-dropdown-item command="/user">我的主页</el-dropdown-item> -->
						<el-dropdown-item command="/login">注册</el-dropdown-item>
						<el-dropdown-item command="/login">登录</el-dropdown-item>
						<!-- <el-dropdown-item command="logout">注销</el-dropdown-item> -->
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="search">
				<i class="el-icon-search"></i>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			mobile: false
		};
	},
	asyncData() {},
	mounted() {},
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
	},
	watch: {
		$route() {
			console.log(this.$route)
		}
	}
};
</script>