<template>
	<main class="post_detail">
		<section
			class="page_banner"
			:style="postData.coverImg ? 'background-image: url('+postData.coverImg+')': ''"
		>
			<div class="minContainer">
				<h1>{{postData.postTitle}}</h1>
				<div class="post_info">
					<span class="date">{{new Date(postData.createdAt).format("yyyy-MM-dd")}}</span>
					<span>{{postData.pv}}次阅读</span>
				</div>
			</div>
		</section>
		<section class="post_detail_wrap">
			<div class="minContainer">
				<div class="details_main" v-html="postData.htmlContent"></div>
				<div class="detail_side"></div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {
			postData: {
				postTitle: "",
				htmlContent: "",
				postId: Number,
				author: "",
				coverImg: "",
				pv: Number,
				commentStatus: Boolean
			}
		};
	},
	async asyncData(app) {
		// console.log(app.route.params.post);
		let res = await app.$axios({
			method: "GET",
			url: "/api/findPost?id=" + app.route.params.post
		});
		if (res.data.result) {
			let data = res.data.post;
			return {
				postData: {
					postTitle: data.postTitle,
					postContent: data.editContent,
					htmlContent: data.htmlContent,
					postId: data.postId,
					author: data.author,
					coverImg: data.coverImg,
					pv: data.pv,
					createdAt: data.createdAt,
					commentStatus: data.commentStatus === "close" ? false : true
				}
			};
		} else {
			app.redirect("/404/");
		}
	},
	head() {
		return {
			title: this.postData.postTitle
		};
	},
	methods: {},
	mounted() {
		// console.log(this.postData);
		document.getElementsByTagName("body")[0].classList.add("postDetail");
	},

	beforeDestroy: function() {
		document.getElementsByTagName("body")[0].classList.remove("postDetail");
	}
};
</script>