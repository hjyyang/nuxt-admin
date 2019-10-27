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
					<li
						:class="['item', $route.fullPath=== item.path ? 'active' : '']"
						v-for="(item,index) in menuData"
						:key="index"
					>
						<nuxt-link
							:to="item.path"
							:class="hoverDynamic[Math.ceil(Math.random()*hoverDynamic.length)-1]"
						>
							<i :class="item.icon"></i>
							<span>{{item.name}}</span>
						</nuxt-link>
						<ul class="sub_menu" v-if="item.subMenu.length > 0">
							<li
								:class="['sub_item', $route.fullPath === sub.path ? 'active' : '']"
								v-for="(sub,sIndex) in item.subMenu"
								:key="sIndex"
							>
								<nuxt-link
									:to="sub.path"
									:class="hoverDynamic[Math.ceil(Math.random()*hoverDynamic.length)-1]"
								>
									<span>
										<i :class="sub.icon"></i>
										{{sub.name}}
									</span>
								</nuxt-link>
							</li>
						</ul>
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
						<el-dropdown-item command="/login">Log In</el-dropdown-item>
						<!-- <el-dropdown-item command="logout">注销</el-dropdown-item> -->
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="search">
				<i class="el-icon-search"></i>
			</div>
			<!-- <div class="github">
				
			</div> -->
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			mobile: false,
			menuData: [
				{
					name: "首页",
					icon: "iconfont icon-1",
					path: "/",
					subMenu: []
				},
				{
					name: "归档",
					icon: "el-icon-s-management",
					path: "/archive",
					subMenu: [
						{
							name: "文章",
							icon: "el-icon-document",
							path: "/article"
						},
						{
							name: "分类",
							icon: "iconfont icon-icon_category",
							path: "/classify"
						},
						{
							name: "标签",
							icon: "iconfont icon-biaoqian1",
							path: "/tag"
                        },
                        {
							name: "书单",
							icon: "iconfont icon-book",
							path: "/bookList"
						}
					]
				},
				{
					name: "关于",
					icon: "iconfont icon-about",
					path: "/about",
					subMenu: []
				},
				{
					name: "留言板",
					icon: "el-icon-edit-outline",
					path: "/comments",
					subMenu: []
				},

				{
					name: "吉他",
					icon: "iconfont icon-icon-test",
					path: "/guitar",
					subMenu: []
				}
			],
			hoverDynamic: [
				"hover_scale",
				"hover_rotate",
				"hover_translate",
				"hover_translate_vertical"
			]
		};
	},
	async asyncData(app) {},
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
	}
};
</script>