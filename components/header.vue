<template>
	<header class="app_header is_fixed">
		<div class="page_header">
			<div class="logo"></div>
			<nav id="app_menu">
                <ul class="menu">
                    <li class="item">
                        <nuxt-link to="/"><span><i class="iconfont icon-1"></i>首页</span></nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/"><i class="el-icon-s-management"></i><span>归档</span></nuxt-link>
                        <ul class="sub_menu">
                            <li class="sub_item"><nuxt-link to="/"><span><i class="el-icon-document"></i>文章</span></nuxt-link></li>
                            <li class="sub_item"><nuxt-link to="/"><span><i class="iconfont icon-icon_category"></i>分类</span></nuxt-link></li>
                            <li class="sub_item"><nuxt-link to="/"><span><i class="iconfont icon-biaoqian1"></i>标签</span></nuxt-link></li>
                        </ul>
                    </li>
                    <li class="item">
                        <nuxt-link to="/"><i class="iconfont icon-about"></i>关于</nuxt-link>
                    </li>
                    <li class="item">
                        <nuxt-link to="/"><i class="el-icon-edit-outline"></i><span>留言板</span></nuxt-link>
                    </li>
                </ul>
            </nav>
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
	methods: {}
};
</script>

<style lang="scss">
.app_header {
	position: fixed;
	width: 100%;
	background: rgba($color: #fff, $alpha: 0.95);

	.page_header {
		display: flex;
		align-items: center;
		min-height: 76px;
		padding: 0px 30px;
		box-sizing: border-box;
	}
	.head_menu {
		// display: none;
		margin: 0 auto;
		.el-menu {
			border: none;
			transition: all 0.5s ease-out;
			animation: searchbox 1s;
		}
		@keyframes searchbox {
			0% {
				opacity: 0;
				transform: translateX(30px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}
	}
}
</style>