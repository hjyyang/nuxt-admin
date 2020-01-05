<template>
	<section class="users">
		<div class="user_main">
			<div class="item" v-for="(item,index) in usersdata.users" :key="index">
				<div class="user_head">
					<div class="head">
						<img src="http://via.placeholder.com/32x32" alt />
					</div>
					<span>{{item.name}}</span>
				</div>
				<p>
					<span>ID:</span>
					<em title="点击复制">{{item.id}}</em>
				</p>
				<p>
					<span>邮箱地址:</span>
					<em title="点击复制">{{item.email}}</em>
				</p>
				<p>
					<span>微信:</span>
					<em title="点击复制">{{item.WeChat}}</em>
				</p>
				<div class="item_meta">
					<el-tag size="small" v-if="item.role===1">普通用户</el-tag>
					<el-tag size="small" v-if="item.role===2" class="admin">管理员</el-tag>
					<el-tag
						type="info"
						size="small"
						effect="plain"
						class="handle"
						@click="handleEv"
						:data-index="index"
					>
						<i class="iconfont icon-liebiao_o"></i>操作
					</el-tag>
				</div>
				<div class="item_action" v-show="item.show">
					<ul @click="userHandle">
						<li>
							<el-tag size="small" :data-index="index">普通用户</el-tag>
						</li>
						<li>
							<el-tag size="small" class="admin" :data-index="index">管理员</el-tag>
						</li>
						<li>
							<el-tag size="small" type="danger" class="detele" :data-index="index">
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
					:total="usersdata.count"
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
			currentPage: 1,
			usersdata: {}
		};
	},
	mounted() {
		this.getUsers(1);
	},
	methods: {
		getUsers(page) {
			this.$axios({
				method: "post",
				url: "/api/findAllUser",
				data: {
					page: page
				}
			})
				.then(res => {
					res.data.users.forEach(item => {
						item.show = false;
					});
					this.usersdata = {
						count: res.data.count,
						users: res.data.users
					};
				})
		},
		handleCurrentChange(val) {
			this.getUsers(val);
		},
		handleEv(e) {
			let index = e.target.getAttribute("data-index"),
				currentItem = this.usersdata.users[index].show;
			this.usersdata.users[index].show = !currentItem;
		},
		userHandle(e) {
			let ev = ev || window.event,
				target = ev.target || ev.srcElement,
				userIndex;

			while (target.tagName !== "UL") {
				if (target.tagName === "SPAN") {
					userIndex = target.getAttribute("data-index");
					if (target.classList.contains("admin")) {
						console.log(this.usersdata.users[userIndex]);
					} else if (target.classList.contains("detele")) {
						console.log(this.usersdata.users[userIndex]);
					} else {
						console.log(this.usersdata.users[userIndex]);
					}
					break;
				}
				target = target.parentNode;
			}
		},
		userUpdate(id, role) {
			this.$axios({
				method: "post",
				url: "/api/updateUser",
				data: {
					user_id: id,
					role: role
				}
			}).then(res => {
				console.log(res.data);
			});
		},
		deteleUser(id) {
			this.$axios({
				method: "post",
				url: "/api/deteleUser",
				data: {
					user_id: id
				}
			}).then(res => {
				console.log(res.data);
			});
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
				transition: all 0.3s;
				&.handle {
					cursor: pointer;
					&:hover {
						opacity: 0.8;
					}
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
