<template>
	<section class="admin_tag">
		<div class="tag_main">
			<div class="operation">
				<el-button
					type="primary"
					size="small"
					@click="multipleSelectionDelete"
					:disabled="multipleSelection.length===0"
				>批量删除</el-button>
				<el-button type="primary" size="small" @click="editTagEv(false)">新增标签</el-button>
			</div>
			<div class="tag_list">
				<el-table
					ref="multipleTable"
					:data="tagData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="selectionChange"
					@cell-click="editEv"
				>
					<el-table-column type="selection" width="55" fixed></el-table-column>
					<el-table-column label="名字" width="120" fixed prop="name" class-name="tName"></el-table-column>
					<el-table-column prop="describe" label="描述" min-width="140"></el-table-column>
					<el-table-column prop="count" label="总数" width="110"></el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<i class="el-icon-edit edit" @click="editTagEv(scope.row.tId)"></i>
							<i class="el-icon-delete delete" @click="deleteTagEv(scope.row.tId)"></i>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog :title="edit_or_new ? '编辑标签' : '新增标签'" :visible.sync="dialogVisible" width="30%">
				<el-form :label-position="labelPosition" :model="newTagData">
					<el-form-item label="名称">
						<el-input v-model="newTagData.name"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="newTagData.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="tagOperateEv">{{edit_or_new ? '修改' : '保存'}}</el-button>
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
			tagData: [
				{
					tId: 0,
					name: "css",
					describe: "",
					count: 3
				},
				{
					tId: 1,
					name: "javascript",
					describe: "",
					count: 4
				}
			],
			multipleSelection: [],
			dialogVisible: false,
			newTagData: {
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
			this.$confirm("你确定要删除选中的标签?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {})
				.catch(() => {});
		},
		editEv(row, column, cell, event) {
			// console.log(row, cell);
			if (cell.className.indexOf("tName") !== -1) {
				this.editTagEv(row.tId);
			}
		},
		editTagEv(tId) {
			this.dialogVisible = true;
			if (tId || tId === 0) {
				this.edit_or_new = true;
				console.log(tId);
			} else {
				this.edit_or_new = false;
				console.log("new");
			}
		},
		deleteTagEv() {
			this.$confirm("你确定要删除该标签?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {})
				.catch(() => {});
		},
		tagOperateEv() {}
	}
};
</script>

<style lang="scss">
.admin_tag {
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
.tag_main {
	padding: 30px;
	box-sizing: border-box;
	background: #ffffff;
	.tag_list {
		padding-top: 30px;
		.tName {
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
    .admin_tag{
        padding: 30px 10px;
    }
}
</style>