<template>
	<main class="home">
		<div class="home_banner">
			<div class="banner_main" style="background-image: url(/hzw-theme/banner2.jpg);">
				<div class="banner_content">
					<div class="minContainer">
						<h1 data-title="HI,Girl!">HI,Girl!</h1>
						<div class="passage">
							<p>食事をするのは生きているためで、生きているのは食事をするためではない、人生は自分のすばらしいことを生きるべきだ</p>
						</div>
					</div>
				</div>
				<div class="down_back" @click="bannerDown">
					<i class="iconfont icon-chuanmao"></i>
				</div>
			</div>
		</div>
		<div
			class="test"
			ref="test"
			style="height: 100px;padding-top: 30px;display: none;background: pink;"
		></div>
		<section class="home_article" ref="aTarget">
			<div class="minContainer">
				<h2 class="col_title">
					<span>新しい</span>
				</h2>
				<div class="article_list">
					<div class="item" v-for="(item,index) in article" :key="index">
						<div class="post_content">
							<div class="post_date">
								<i class="el-icon-time"></i>
								発表
								<span>{{new Date(item.createdAt).format("yyyy-MM-dd")}}</span>
							</div>
							<h3 class="post_title">
								<nuxt-link :to="'/post/'+item.postId">{{item.title}}</nuxt-link>
							</h3>
							<div class="post_meta">
								<div class="post_count">
									<i class="el-icon-view"></i>
									{{item.pv}}
								</div>
								<!-- <div class="post_comment">
									<nuxt-link to>
										<i class="el-icon-chat-dot-round"></i>24
									</nuxt-link>
								</div>-->
								<div class="post_category" v-if="item.categories.length > 0">
									<nuxt-link to>
										<i class="el-icon-folder-opened"></i>
										{{item.categories[0].name}}
									</nuxt-link>
								</div>
							</div>
							<div class="post_describe">{{item.describe}}</div>
						</div>
						<div class="post_image">
							<nuxt-link :to="'/post/'+item.postId">
								<img class="lazyload" src :data-src="'http://via.placeholder.com/430x300?text='+index" alt />
							</nuxt-link>
						</div>
					</div>
					<div class="more">
						<el-button
							type="primary"
							plain
							round
							title="查看更多"
							v-show="loadMore === 0"
							@click="onMore"
						>より多くを得る</el-button>
						<div class="my_loading" v-show="loadMore === 1">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<div class="over" v-show="loadMore===2">
							<span>我是有底线的！</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import yTool from "~/assets/js/tool";
export default {
	data() {
		return {
			article: [],
			loadMore: 0 //0为有下一页可点击状态，1为加载，2无下一页无法点击
		};
	},
	async asyncData(app) {
		return await app
			.$axios({
				method: "post",
				url: "/api/findPostList",
				data: {
					page: 1
				}
			})
			.then(res => {
				return {
					article: res.data.postList.rows
				};
			})
			.catch(err => {
				console.error(err);
			});
	},
	mounted() {
		this.getData(1);
		document.getElementsByTagName("body")[0].classList.add("home");
	},
	beforeDestroy: function() {
		document.getElementsByTagName("body")[0].classList.remove("home");
	},
	methods: {
		bannerDown(e) {
			yTool(this.$refs.aTarget).anchor(500);
		},
		onMore() {
			this.loadMore = true;
		},
		async getData(page) {
			await this.$axios({
				method: "post",
				url: "/api/findPostList",
				data: {
					page: page
				}
			}).then(res => {
				console.log(res);
			});
		}
	}
};
</script>
