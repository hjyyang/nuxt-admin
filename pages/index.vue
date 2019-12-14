<template>
	<main class="home">
		<div class="home_banner">
			<div class="banner_main" style="background-image: url(/hzw-theme/banner2.jpg);">
				<div class="banner_content">
					<div class="minContainer">
						<h1 data-title="HI,JON!">HI,JON!</h1>
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
								<span>2019-10-01</span>
							</div>
							<h3 class="post_title">
								<nuxt-link to>这是一个测试标题</nuxt-link>
							</h3>
							<div class="post_meta">
								<div class="post_count">
									<i class="el-icon-view"></i>70
								</div>
								<div class="post_comment">
									<nuxt-link to>
										<i class="el-icon-chat-dot-round"></i>24
									</nuxt-link>
								</div>
								<div class="post_category">
									<nuxt-link to>
										<i class="el-icon-folder-opened"></i>测试
									</nuxt-link>
								</div>
							</div>
							<div class="post_describe">这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题</div>
						</div>
						<div class="post_image">
							<nuxt-link to="/">
								<img class="lazyload" src :data-src="'http://via.placeholder.com/430x300?text='+index" alt />
							</nuxt-link>
						</div>
					</div>
					<div class="more">
						<el-button type="primary" plain round title="查看更多">より多くを得る</el-button>
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
			article: [1, 2, 3, 4, 5]
		};
	},
	asyncData() {},
	mounted() {
		document.getElementsByTagName("body")[0].classList.add("home");
	},
	beforeDestroy: function() {
		document.getElementsByTagName("body")[0].classList.remove("home");
	},
	methods: {
		bannerDown(e) {
			yTool(this.$refs.aTarget).anchor(500);
		}
	}
};
</script>
