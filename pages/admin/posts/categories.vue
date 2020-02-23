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
					:row-class-name="tableRowClassName"
				>
					<el-table-column type="selection" width="55" fixed></el-table-column>
					<el-table-column label="名字" fixed prop="cName" class-name="cName"></el-table-column>
					<el-table-column prop="slug" label="slug"></el-table-column>
					<el-table-column prop="count" label="总数" class-name="cCount"></el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<i class="el-icon-edit edit" @click="editCategoriesEv(scope.row)"></i>
							<i class="el-icon-delete delete" @click="deleteCategoriesEv(scope.$index)"></i>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog :title="edit_or_new ? '编辑分类' : '新增分类'" :visible.sync="dialogVisible" width="30%">
				<el-form :label-position="labelPosition" :model="newCategoryData">
					<el-form-item label="名称">
						<el-input v-model="newCategoryData.name" clearable></el-input>
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
			categoriesData: [],
			multipleSelection: [],
			dialogVisible: false,
			newCategoryData: {
				name: ""
			},
			labelPosition: "top",
			edit_or_new: false,
			updateRowIndex: null
		};
	},
	mounted() {
		this.getCategories();
	},
	methods: {
		//element表格添加行class方法
		tableRowClassName({ row, rowIndex }) {
			return "index" + rowIndex;
		},
		//多选事件
		selectionChange(val) {
			this.multipleSelection = [];
			for (let i in val) {
				this.multipleSelection.push(val[i].cId);
			}
		},
		//多选删除事件
		multipleSelectionDelete() {
			this.$confirm("你确定要删除选中的分类?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.deleteDataEv(this.multipleSelection);
				})
				.catch(() => {});
		},
		//表格点击事件
		editEv(row, column, cell, event) {
			let index = cell.parentElement.classList[1].split("index")[1];
			index = parseInt(index);
			this.updateRowIndex = index;
			if (cell.className.indexOf("cName") !== -1) {
				this.editCategoriesEv(row);
			}
			if (cell.className.indexOf("cCount") !== -1) {
				this.$router.push("/admin/posts?categories=" + row.cName);
			}
		},
		//分类编辑事件
		editCategoriesEv(row) {
			this.dialogVisible = true;
			if (row.cId || row.cId === 0) {
				//修改分类
				this.edit_or_new = row.cId;
				this.newCategoryData.name = row.cName;
			} else {
				//新增分类
				this.edit_or_new = false;
				this.newCategoryData.name = "";
			}
		},
		//删除单一分类事件
		deleteCategoriesEv(index) {
			this.$confirm("你确定要删除该分类?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					let deleteArr = [this.categoriesData[index].cId];
					this.deleteDataEv(deleteArr, index);
				})
				.catch(() => {});
		},
		//删除分类数据方法
		async deleteDataEv(ar) {
			let res = await this.$axios({
				method: "post",
				url: "/api/deleteCategory",
				data: {
					cId: ar
				}
			});
			if (!res.data.result) {
				this.$message.error(
					res.data.message ? res.data.message : "服务器错误！"
				);
				return false;
			}
			for (let i in this.categoriesData) {
				for (let j in ar) {
					if (ar[j] === this.categoriesData[i].cId) {
						this.categoriesData.splice(i, 1);
					}
				}
			}
			this.multipleSelection = [];
			this.$message({
				type: "success",
				message: "删除成功!"
			});
		},
		//分类数据编辑事件
		async categoriesOperateEv() {
			if (!this.newCategoryData.name) {
				this.$message.error("请输入正确的值！");
			}
			if (this.edit_or_new) {
				//修改分类
				if (
					this.categoriesData[this.updateRowIndex].cName ===
					this.newCategoryData.name
				) {
					this.$message.error("无修改！");
					return false;
				}
				let res = await this.$axios({
					method: "post",
					url: "/api/updateCategory",
					data: {
						cId: this.edit_or_new,
						cName: this.newCategoryData.name
					}
				});
				if (res.data.data) {
					this.categoriesData[
						this.updateRowIndex
					].cName = this.newCategoryData.name;
					this.dialogVisible = false;
				}
			} else {
				//新增分类
				let res = await this.$axios({
					method: "post",
					url: "/api/addCategory",
					data: {
						cName: this.newCategoryData.name
					}
				});
				this.categoriesData.push({
					cId: res.data.data[0].id,
					cName: res.data.data[0].name,
					slug: res.data.data[0].slug,
					count: 0
				});
				this.dialogVisible = false;
				this.$message({
					type: "success",
					message: "添加成功!"
				});
			}
		},
		//获取分类列表
		async getCategories() {
			let res = await this.$axios({
				method: "get",
				url: "/api/getCategory"
			});
			this.categoriesData = res.data.data;
		}
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
		.cName,
		.cCount {
			cursor: pointer;
			&:hover {
				color: #409eff;
			}
		}
		i {
			cursor: pointer;
		}
		.edit {
			color: #409eff;
		}
		.delete {
			color: #f56c6c;
		}
	}
}
@media (max-width: 540px) {
	.admin_categories {
		padding: 30px 10px;
	}
}
</style>