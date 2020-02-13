<template>
	<section class="posts">
		<div class="posts_main">
			<div class="search_wrap">
				<div class="search_title">
					<el-input v-model="searchTitleValue" placeholder="通过标题搜索"></el-input>
					<!-- <el-button type="primary" icon="el-icon-search" @click="searchData"></el-button> -->
				</div>
				<div class="search_category">
					<el-select v-model="selectValue" clearable placeholder="选择分类">
						<el-option v-for="item in categoryList" :key="item.cId" :label="item.cName" :value="item.cId"></el-option>
					</el-select>
				</div>
				<div class="search_date">
					<el-date-picker
						v-model="searchDateValue"
						type="daterange"
						align="top"
						unlink-panels
						range-separator="~"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						:picker-options="pickerOptions"
					></el-date-picker>
					<el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
				</div>
			</div>
			<div class="post_operation">
				<nuxt-link to="/admin/posts/edit" class="new_btn">
					<el-button type="primary" icon="el-icon-plus" size="small">添加新文章</el-button>
				</nuxt-link>
				<el-button
					type="primary"
					icon="el-icon-delete"
					size="small"
					:disabled="multipleSelection.length > 0 ? false : true"
					class="detele_btn"
					@click="multipleSelectionDelete"
				>批量删除</el-button>
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
					<el-table-column label="标题" width="120" fixed>
						<template slot-scope="scope">
							<nuxt-link :to="'/admin/posts/edit?id='+scope.row.id">{{ scope.row.title }}</nuxt-link>
						</template>
					</el-table-column>
					<el-table-column prop="describe" label="描述" min-width="140"></el-table-column>
					<el-table-column prop="createdAt" label="创建时间" width="150" show-overflow-tooltip></el-table-column>
					<el-table-column prop="last_modified_date" label="修改时间" width="150"></el-table-column>
					<el-table-column prop="like_count" label="喜欢数量" width="110"></el-table-column>
					<el-table-column prop="pv" label="浏览数量" width="110"></el-table-column>
					<el-table-column fixed="right" label="发布状态" width="120">
						<template slot-scope="scope">
							<el-switch
								v-model="scope.row.publish_status"
								@change="postStatusChange(scope.$index,scope.row.id)"
								active-icon-class="el-icon-check"
							></el-switch>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<nuxt-link :to="'/admin/posts/edit?id='+scope.row.id" class="edit">
								<i class="el-icon-edit"></i>
							</nuxt-link>
							<i class="el-icon-delete delete" @click="postDeleteEv(scope.row.id)"></i>
						</template>
					</el-table-column>
				</el-table>
				<div class="paged">
					<el-pagination
						@current-change="currentChange"
						:page-size="10"
						:current-page.sync="currentPage"
						layout="prev, pager, next, jumper"
						:total="pagedCount"
					></el-pagination>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import yTool from "~/assets/js/tool";
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
			postsData: [],
			multipleSelection: [],
			currentPage: 1,
			pagedCount: 0,
			categoryList: [],
			selectCaregory: null,
			selectValue: ""
		};
	},
	mounted() {
		this.$axios({
			method: "get",
			url: "/api/getCategory"
		}).then(res => {
			this.categoryList = res.data.data;
			this.hashQuery();
			this.searchData();
		});
	},
	methods: {
		selectionChange(val) {
			//多选事件
			this.multipleSelection = [];
			for (let i in val) {
				this.multipleSelection.push(val[i].id);
			}
		},
		postDeleteEv(e) {
			//文章删除事件
			this.$confirm("你确定要删除这篇文章吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.multipleSelection = [];
					this.multipleSelection.push(e);
					this.deletePost();
				})
				.catch(() => {});
		},
		multipleSelectionDelete() {
			//文章多选删除
			this.$confirm("确定删除选中的文章？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.deletePost();
				})
				.catch(() => {});
		},
		async postStatusChange(index, val) {
			//文章发布开关
			let res = await this.$axios({
				method: "post",
				url: "/api/addAndUpdatePost",
				data: {
					id: val,
					status: this.postsData[index].publish_status ? 1 : 0
				}
			});
		},
		currentChange(val) {
			this.currentPage = val;
			this.searchData();
		},
		//根据条件搜索数据
		async searchData() {
			let res = await this.$axios({
				method: "post",
				url: "/api/findAllPost",
				data: {
					page: this.currentPage,
					title: this.searchTitleValue,
					time: this.searchDateValue,
					category: this.selectValue
				}
			});
			if (res.data.result) {
				this.pagedCount = res.data.postList.count;
				let rows = [],
					data = res.data.postList.rows,
					i;
				for (i in data) {
					rows[i] = {};
					if (!data[i].id) {
						rows[i].id = data[i].term_relationships[0].id;
					} else {
						rows[i].id = data[i].id;
					}
					rows[i].title = data[i].title;
					rows[i].describe = data[i].describe;
					rows[i].createdAt = new Date(
						yTool().getTimeStamp(data[i].createdAt)
					).format("yyyy-MM-dd");
					rows[i].last_modified_date = new Date(
						yTool().getTimeStamp(data[i].last_modified_date)
					).format("yyyy-MM-dd");
					rows[i].publish_status =
						data[i].publish_status === 1 ? true : false;
					rows[i].like_count = data[i].like_count;
					rows[i].pv = data[i].pv;
				}
				this.postsData = rows;
			}
		},
		async deletePost() {
			let deleteArr = this.multipleSelection;
			let res = await this.$axios({
				method: "post",
				url: "/api/deletePost",
				data: {
					postId: deleteArr
				}
			});
			if (res.data.result) {
				this.multipleSelection = [];
				this.searchData();
			}
		},
		hashQuery() {
			let categories = this.$route.query.categories;
			for (let i in this.categoryList) {
				if (this.categoryList[i].cName === categories) {
					this.selectValue = this.categoryList[i].cId;
				}
			}
		}
	}
};
</script>

<style lang="scss">
.posts {
	padding: 30px;
	box-sizing: border-box;
}
.posts_main {
	padding: 30px;
	box-sizing: border-box;
	background: #ffffff;
	.search_wrap {
		display: flex;
		> div {
			margin-right: 20px;
			&:last-of-type {
				margin: 0px;
			}
		}
	}
	.search_title {
		display: flex;
		max-width: 300px;
		width: 100%;
	}
	.search_date {
		button {
			margin-left: 20px;
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
			background: none;
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

@media (max-width: 1000px) {
	.posts_main {
		.search_wrap {
			flex-wrap: wrap;
		}
		.search_title {
			margin-bottom: 20px;
		}
	}
}

@media (max-width: 540px) {
	.posts {
		padding: 30px 10px;
	}
}
</style>
