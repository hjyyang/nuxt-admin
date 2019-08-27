<template>
	<section class="posts">
		<div class="posts_main">
			<div class="search_wrap">
				<div class="search_title">
					<el-input v-model="searchTitleValue" placeholder="Search by title"></el-input>
					<el-button type="primary" icon="el-icon-search"></el-button>
				</div>
				<div class="search_date">
					<el-date-picker
						v-model="searchDateValue"
						type="daterange"
						align="top"
						unlink-panels
						range-separator="~"
						start-placeholder="Start"
						end-placeholder="End"
						:picker-options="pickerOptions"
					></el-date-picker>
					<el-button type="primary" icon="el-icon-search">Search</el-button>
				</div>
			</div>
			<div class="post_operation">
				<nuxt-link to="/admin/posts/edit" class="new_btn">
					<el-button type="primary" icon="el-icon-plus" size="small">Add New Article</el-button>
				</nuxt-link>
				<el-button
					type="primary"
					icon="el-icon-delete"
					size="small"
					:disabled="multipleSelection.length > 0 ? false : true"
					class="detele_btn"
					@click="multipleSelectionDelete"
				>Batch Delete</el-button>
			</div>
			<div class="posts_list">
				<el-table
					ref="multipleTable"
					:data="postsData"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="selectionChange"
				>
					<el-table-column type="selection" width="55" fixed></el-table-column>
					<el-table-column label="Title" width="120" fixed>
						<template slot-scope="scope">
							<nuxt-link to>{{ scope.row.title }}</nuxt-link>
						</template>
					</el-table-column>
					<el-table-column prop="describe" label="Describe" min-width="140"></el-table-column>
					<el-table-column prop="publish_date" label="Publish Date" width="150" show-overflow-tooltip></el-table-column>
					<el-table-column prop="last_modified_date" label="Modified Date" width="150"></el-table-column>
					<el-table-column prop="like_count" label="Like Count" width="110"></el-table-column>
					<el-table-column prop="count" label="Pv Count" width="110"></el-table-column>
					<el-table-column fixed="right" label="Status" width="120">
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.publish_status"
								@change="postStatusChange(1)"
								active-icon-class="el-icon-check"
							></el-switch>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="operation" width="120">
						<nuxt-link to class="edit">
							<i class="el-icon-edit"></i>
						</nuxt-link>
						<i class="el-icon-delete delete" @click="postDeleteEvent"></i>
					</el-table-column>
				</el-table>
				<div class="paged">
					<el-pagination
						@size-change="sizeChange"
						@current-change="currentChange"
						:current-page.sync="currentPage"
						layout="prev, pager, next, jumper"
						:total="100"
					></el-pagination>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			searchTitleValue: "",
			searchDateValue: "",
			pickerOptions: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit("pick", [start, end]);
						}
					}
				]
			},
			postsData: [
				{
					title: "test",
					describe: "this is the describe",
					publish_date: "2019-08-03",
					last_modified_date: "2019-08-16",
					like_count: 2,
					count: 3,
					publish_status: true
				},
				{
					title: "test",
					describe: "this is the describe",
					publish_date: "2019-08-03",
					last_modified_date: "2019-08-16",
					like_count: 2,
					count: 3,
					publish_status: false
				}
			],
			multipleSelection: [],
			currentPage: 1
		};
	},
	methods: {
		selectionChange(val) {
			//多选事件
			this.multipleSelection = val;
		},
		postDeleteEvent() {
			//文章删除事件
			this.$confirm(
				"Are you sure to delete this article?",
				"prompt",
				{
					confirmButtonText: "true",
					cancelButtonText: "cancel",
					type: "warning"
				}
			)
				.then(() => {})
				.catch(() => {});
		},
		multipleSelectionDelete() {
			//文章多选删除

			this.$confirm(
				"Make sure to delete the checked article？",
				"prompt",
				{
					confirmButtonText: "true",
					cancelButtonText: "cancel",
					type: "warning"
				}
			)
				.then(() => {})
				.catch(() => {});
		},
		postStatusChange(val) {
			//文章发布开关
			console.log(val);
			setTimeout(()=>{
				this.postsData[val].publish_status = false;
			},1000)
		},
		sizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		currentChange(val) {
			console.log(`当前页: ${val}`);
		}
	}
};
</script>

<style lang="scss">
.open_menu {
	.posts {
		width: calc(100% - 141px);
	}
}
.posts {
	width: calc(100% - 65px);
	padding: 30px;
	box-sizing: border-box;
}
.posts_main {
	padding: 30px;
	box-sizing: border-box;
	background: #ffffff;
	.search_wrap {
		display: flex;
	}
	.search_title {
		display: flex;
		max-width: 300px;
		width: 100%;
		margin-right: 40px;
		input {
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
			border-right: 0px;
		}
		button {
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
	.post_operation {
		display: flex;
		padding-top: 20px;
	}
	.new_btn {
		margin-right: 40px;
	}
	.detele_btn:hover {
		background: #f56c6c;
		border-color: #f56c6c;
	}
	.posts_list {
		padding-top: 40px;
		a {
			color: #606266;
			&:hover {
				color: #409eff;
			}
		}
		.edit {
			margin-right: 10px;
			color: #409eff;
		}
		.delete {
			color: #f56c6c;
			cursor: pointer;
		}
	}
	.paged {
		display: flex;
		padding-top: 60px;
		padding-bottom: 30px;
		.el-pagination {
			margin-left: auto;
		}
	}
}

@media (max-width:1000px){
    .posts_main {
        .search_wrap{
            flex-wrap: wrap;
        }
        .search_title{
            margin-bottom: 20px;
        }
    }
}
</style>
