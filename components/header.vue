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
			<nav id="app_menu" v-if="!mobile">
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
			<div class="navigator" v-if="!mobile">
				<el-dropdown @command="dropdownCommand">
					<div class="header_dropdown">
						<i class="iconfont icon-user1"></i>
					</div>
					<el-dropdown-menu slot="dropdown" class="app_dropdown">
						<el-dropdown-item
							command="/admin"
							v-if="($store.state.authUser && $store.state.authUser.role === 2)"
						>后台管理</el-dropdown-item>
						<template v-if="$store.state.authUser">
							<el-dropdown-item command="/aboutMe">我的主页</el-dropdown-item>
							<el-dropdown-item command="logout">注销</el-dropdown-item>
						</template>
						<el-dropdown-item command="/login" v-else>登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="search" v-if="!mobile" @click="searchEv">
				<i class="el-icon-search"></i>
			</div>
			<div class="responsive_menu_toggle" v-if="mobile" @click="openSliderMenu">
				<i class="iconfont icon-caidan"></i>
			</div>
		</div>
		<el-drawer :visible.sync="drawerVisible" direction="rtl" class="menu_drawer">
			<div class="menu_wrpa">
				<div class="item">
					<div class="search" @click="searchEv">
						<i class="el-icon-search"></i>
					</div>
				</div>
				<div class="item" v-for="(item,index) in menuData" :key="index">
					<div class="item_main">
						<nuxt-link :to="item.path">
							<span>{{item.name}}</span>
						</nuxt-link>
						<div class="down" v-if="item.subMenu.length > 0">
							<i class="el-icon-arrow-down" @click.self="slideToggle(index)"></i>
						</div>
					</div>
					<ul class="sub_menu" v-if="item.subMenu.length > 0" v-show="item.show">
						<li
							:class="['sub_item', $route.fullPath === sub.path ? 'active' : '']"
							v-for="(sub,sIndex) in item.subMenu"
							:key="sIndex"
						>
							<nuxt-link :to="sub.path">
								<span>{{sub.name}}</span>
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</el-drawer>
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
					subMenu: [],
					show: false
				},
				{
					name: "归档",
					icon: "el-icon-s-management",
					path: "/archive",
					subMenu: [
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
							path: "/book-list"
						}
					],
					show: false
				},
				{
					name: "关于",
					icon: "iconfont icon-about",
					path: "/about",
					subMenu: [],
					show: false
				},
				{
					name: "留言板",
					icon: "el-icon-edit-outline",
					path: "/comments",
					subMenu: [],
					show: false
				},

				{
					name: "音乐",
					icon: "iconfont icon-icon-test",
					path: "/music",
					subMenu: [],
					show: false
				}
			],
			hoverDynamic: [
				"hover_scale",
				"hover_rotate",
				"hover_translate",
				"hover_translate_vertical"
			],
			mobile: this.isMobile,
			drawerVisible: false
		};
	},
	props: {
		isMobile: {
			type: Boolean
		}
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
						this.$store.dispatch("logout");
					})
					.catch(() => {});
			} else {
				if (this.$route.fullPath !== command) {
					this.$router.push(command);
				}
			}
		},
		searchEv() {
			console.log(this);
		},
		openSliderMenu() {
			this.drawerVisible = true;
		},
		slideToggle(index) {
			this.menuData[index].show = !this.menuData[index].show;
		}
	},
	watch: {
		isMobile: function(val, oldVal) {
			this.mobile = val;
			if (!val) {
				this.drawerVisible = false;
			}
		},
		$route(to, from) {
			this.drawerVisible = false;
		}
	}
};
</script>