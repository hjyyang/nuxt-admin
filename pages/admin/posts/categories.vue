<template>
	<section class="admin_categories">
		<div class="categories_main">
			<div class="operation">
				<el-button type="primary" size="small">批量删除</el-button>
				<el-button type="primary" size="small">新增分类</el-button>
			</div>
			<div class="categories_list">
				<el-table
					ref="multipleTable"
					:data="categoriesData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="selectionChange"
					@cell-click="editEv"
				>
					<el-table-column type="selection" width="55" fixed></el-table-column>
					<el-table-column label="名字" width="120" fixed prop="name" class-name="cName"></el-table-column>
					<el-table-column prop="describe" label="描述" min-width="140"></el-table-column>
					<el-table-column prop="count" label="总数" width="110"></el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<i class="el-icon-edit edit"></i>
						<i class="el-icon-delete delete"></i>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			categoriesData: [
				{
					cId: "",
					name: "未分类",
					describe: "",
					count: 3
				},
				{
					cId: "",
					name: "未分类",
					describe: "",
					count: 4
				}
			],
			multipleSelection: []
		};
	},
	methods: {
		selectionChange(val) {
			//多选事件
			this.multipleSelection = val;
		},
		editEv(row, column, cell, event) {
			// console.log(row, cell);
			if (cell.className.indexOf("cName") !== -1) {
				console.log(231);
			} else if (cell.className.indexOf("edit") !== -1) {
				console.log(2);
			}
		}
	}
};
</script>

<style lang="scss">
.admin_categories {
	width: 100%;
	padding: 30px;
	box-sizing: border-box;
}
.categories_main {
	padding: 30px;
	box-sizing: border-box;
	background: #ffffff;
	.categories_list {
		padding-top: 30px;
		.cName {
			cursor: pointer;
		}
		i {
			cursor: pointer;
		}
	}
}
</style>