<template>
	<section class="admin_categories">
		<div class="categories_main">
			<div class="operation">
				<el-button
					type="primary"
					size="small"
					@click="multipleSelectionDelete"
					:disabled="multipleSelection.length===0"
				>批量删除</el-button>
				<el-button type="primary" size="small" @click="editCategoriesEv(false)">新增分类</el-button>
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
						<template slot-scope="scope">
							<i class="el-icon-edit edit" @click="editCategoriesEv(scope.row.cId)"></i>
							<i class="el-icon-delete delete" @click="deleteCategoriesEv(scope.row.cId)"></i>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog :title="edit_or_new ? '编辑分类' : '新增分类'" :visible.sync="dialogVisible" width="30%">
				<el-form :label-position="labelPosition" :model="newCategoryData">
					<el-form-item label="名称">
						<el-input v-model="newCategoryData.name"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="newCategoryData.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="categoriesOperateEv">{{edit_or_new ? '修改' : '保存'}}</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
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
					cId: 0,
					name: "未分类",
					describe: "",
					count: 3
				},
				{
					cId: 1,
					name: "javascript",
					describe: "",
					count: 4
				}
			],
			multipleSelection: [],
			dialogVisible: false,
			newCategoryData: {
				name: "",
				description: ""
			},
			labelPosition: "top",
			edit_or_new: false
		};
	},
	methods: {
		selectionChange(val) {
			//多选事件
			this.multipleSelection = val;
		},
		multipleSelectionDelete() {
			this.$confirm("你确定要删除选中的分类?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {})
				.catch(() => {});
		},
		editEv(row, column, cell, event) {
			// console.log(row, cell);
			if (cell.className.indexOf("cName") !== -1) {
				this.editCategoriesEv(row.cId);
			}
		},
		editCategoriesEv(cId) {
			this.dialogVisible = true;
			if (cId || cId === 0) {
				this.edit_or_new = true;
				console.log(cId);
			} else {
				this.edit_or_new = false;
				console.log("new");
			}
		},
		deleteCategoriesEv() {
			this.$confirm("你确定要删除该分类?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {})
				.catch(() => {});
		},
		categoriesOperateEv() {}
	}
};
</script>

<style lang="scss">
.admin_categories {
	width: 100%;
	padding: 30px;
	box-sizing: border-box;
	.el-dialog__body {
		padding-top: 10px;
	}
	.el-form-item {
		margin-bottom: 4px;
		button {
			width: 100%;
			margin-top: 20px;
		}
	}
	.el-form--label-top .el-form-item__label {
		padding-bottom: 0px;
	}
}
.categories_main {
	padding: 30px;
	box-sizing: border-box;
	background: #ffffff;
	.categories_list {
		padding-top: 30px;
		.cName {
			cursor: pointer;
            &:hover{
                color: #409eff;
            }
		}
		i {
			cursor: pointer;
		}
        .edit{
            color: #409eff;
        }
        .delete{
            color: #f56c6c;
        }
	}
}
@media (max-width: 540px){
    .admin_categories{
        padding: 30px 10px;
    }
}
</style>