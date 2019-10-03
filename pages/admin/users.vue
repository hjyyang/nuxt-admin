<template>
	<section class="users">
		<div class="user_main">
			<div class="item">
				<div class="user_head">
					<div class="head">
						<img src="http://via.placeholder.com/32x32" alt />
					</div>
					<span>jon</span>
				</div>
				<p>
					<span>ID:</span>
					<em title="点击复制">123466</em>
				</p>
				<p>
					<span>邮箱地址:</span>
					<em title="点击复制">12345789@163.com</em>
				</p>
				<div class="item_meta">
					<el-tag size="small">普通用户</el-tag>
					<el-tag type="info" size="small" effect="plain" class="handle">
						<i class="iconfont icon-liebiao_o"></i>操作
					</el-tag>
				</div>
				<div class="item_action">
					<ul>
						<li>
							<el-tag size="small">普通用户</el-tag>
						</li>
						<li>
							<el-tag size="small" class="admin">管理员</el-tag>
						</li>
						<li>
							<el-tag size="small" type="danger">
								<i class="el-icon-delete"></i>删除
							</el-tag>
						</li>
					</ul>
				</div>
			</div>
			<div class="item">
				<div class="user_head">
					<div class="head">
						<img src="http://via.placeholder.com/32x32" alt />
					</div>
					<span>jon</span>
				</div>
				<p>
					<span>ID:</span>
					<em title="点击复制">123466</em>
				</p>
				<p>
					<span>邮箱地址:</span>
					<em title="点击复制">12345789@163.com</em>
				</p>
				<div class="item_meta">
					<el-tag size="small" class="admin">管理员</el-tag>
					<el-tag type="info" size="small" effect="plain" class="handle">
						<i class="iconfont icon-liebiao_o"></i>操作
					</el-tag>
				</div>
				<div class="item_action">
					<ul>
						<li>
							<el-tag size="small">普通用户</el-tag>
						</li>
						<li>
							<el-tag size="small" class="admin">管理员</el-tag>
						</li>
						<li>
							<el-tag size="small" type="danger">
								<i class="el-icon-delete"></i>删除
							</el-tag>
						</li>
					</ul>
				</div>
			</div>
			<div class="paged">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="10"
					layout="total, prev, pager, next, jumper"
					:total="100"
				></el-pagination>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			currentPage: 1
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	}
};
</script>

<style lang="scss">
.users {
	padding: 30px;
	box-sizing: border-box;
	transition: all 0.5s;
}
.user_main {
	padding: 0px 20px;
	background: #ffffff;
	.item {
		padding: 16px 0px;
		margin-bottom: 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #e8eaec;
		color: #515a6e;
		p {
			margin-bottom: 4px;
			span {
				margin-right: 4px;
			}
		}
		em {
			font-style: normal;
			cursor: pointer;
		}

		.item_meta,
		.item_action {
			display: flex;
			padding-top: 6px;
			span {
				display: flex;
				align-items: center;
				margin-right: 10px;
				&.handle {
					cursor: pointer;
				}
				i {
					margin-right: 4px;
				}
				&.admin {
					border-color: #d3adf7;
					background: #f9f0ff;
					color: #722ed1;
				}
			}
		}
		.item_action {
			padding-top: 20px;
			ul {
				display: flex;
			}
			li {
				position: relative;
				padding: 0px 20px;
				&::after {
					content: "";
					position: absolute;
					right: 0px;
					top: 50%;
					transform: translate(0%, -50%);
					width: 1px;
					height: calc(100% - 6px);
					background: #e8eaec;
				}
				&:nth-of-type(1) {
					padding-left: 0px;
				}
				&:last-of-type {
					&::after {
						display: none;
					}
				}
			}
			span {
				position: relative;
				margin: 0px;
				cursor: pointer;
			}
		}
	}
	.user_head {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		span {
			font-weight: bold;
			font-size: 16px;
		}
	}
	.head {
		border-radius: 50%;
		margin-right: 10px;
		overflow: hidden;
	}

	.paged {
		display: flex;
		padding: 10px 0px 30px;
		box-sizing: border-box;
		.el-pagination {
			margin: 0 auto;
		}
	}
}
@media (max-width: 540px) {
}
</style>
