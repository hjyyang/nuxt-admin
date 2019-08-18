<template>
	<div class="admin_layout">
		<Header />
		<main class="admin">
			<el-menu class="admin_menu" :collapse="isCollapse">
				<el-menu-item index="1">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
				<el-menu-item index="2">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
				<el-menu-item index="3">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
			</el-menu>
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
			isCollapse: true
		};
	},
	methods: {}
};
</script>>

<style lang="scss">
.admin {
    display: flex;
	.admin_menu {
		padding-bottom: 3000px;
		margin-bottom: -3000px;
        overflow: hidden;
	}
}
</style>