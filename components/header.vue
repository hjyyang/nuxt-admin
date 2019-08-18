<template>
	<header class="app_header is_fixed">
		<div class="page_header">
			<div class="container">
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
	</header>
</template>

<script>
export default {
	data() {
		return {};
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
	}
};
</script>

<style lang="scss">
.app_header {
	min-height: 52px;
	&.is_fixed {
		.page_header {
			position: fixed;
			z-index: 100;
			display: flex;
			align-items: center;
			width: 100%;
			min-height: 52px;
			background-color: #ffffff;
			background-clip: content-box;
		}
	}
	.container {
		width: 100%;
	}
	.navigator {
		display: flex;
		height: 100%;
	}
	.el-dropdown {
		margin-left: auto;
		border-radius: 50%;
		overflow: hidden;
	}
}
.default_layout {
	.app_header {
		&.is_fixed {
			.page_header {
				box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
			}
		}
	}
}
.admin_layout {
	.app_header {
		&.is_fixed {
			.page_header {
				border-bottom: solid 1px #e6e6e6;
			}
		}
	}
}
</style>