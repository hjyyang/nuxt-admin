<template>
	<section class="users">
		<div class="user_main">
			<el-table :data="userData" style="width: 100%">
				<el-table-column prop="id" fixed label="Id" width="120"></el-table-column>
				<el-table-column prop="name" label="用户名" width="180"></el-table-column>
				<el-table-column prop="registrationTime" label="注册时间" width="180"></el-table-column>
				<el-table-column prop="email" min-width="200" label="邮箱"></el-table-column>
				<el-table-column fixed="right" label="操作" width="120" class-name="delete">
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleteRow(scope.$index, userData)" type="text">
							<i class="el-icon-delete"></i>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			userData: [
				{
					id: "1",
					name: "王小虎",
					email: "135********@163.com",
					registrationTime: "2016-05-03"
				},
				{
					id: "2",
					name: "王小虎",
					email: "135********@163.com",
					registrationTime: "2016-05-03"
				},
				{
					id: "3",
					name: "王小虎",
					email: "135********@163.com",
					registrationTime: "2016-05-03"
				},
				{
					id: "4",
					name: "王小虎",
					email: "135********@163.com",
					registrationTime: "2016-05-03"
				}
			]
		};
	},
	methods: {
		deleteRow(index, rows) {
			//用户删除事件
			this.$confirm(
				"您确定要删除此用户吗?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}
			)
				.then(() => {})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss">

.users {
	padding: 30px;
	box-sizing: border-box;
    transition: all .5s;
}
.user_main {
	padding: 30px;
	box-sizing: border-box;
	background: #ffffff;
	.delete {
		text-align: center;
		i {
			color: #f56c6c;
		}
	}
}
@media (max-width: 540px) {
    .users{
        padding: 30px 10px;
    }
}
</style>
