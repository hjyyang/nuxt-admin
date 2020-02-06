<template>
	<main class="post_detail">
		<section class="page_banner">
			<div class="minContainer">
				<h1>{{postTitle}}</h1>
                <div class="post_info">
                    <span class="date">2019-12-12</span>
                    <span>10次阅读</span>
                </div>
			</div>
		</section>
		<section class="post_detail_wrap">
			<div class="minContainer">
				<div class="details_main">
					<client-only>
						<mavon-editor
							v-model="postContent"
							:boxShadow="false"
							:scrollStyle="false"
							:toolbarsFlag="false"
							:subfield="false"
							defaultOpen="preview"
						/>
					</client-only>
				</div>
				<div class="detail_side"></div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {
			postTitle: "这是一篇测试文章",
			postContent: `**其实我也不知道要写什么**
随便写写吧
![](http://via.placeholder.com/200x100)
就这样呗
[百度](www.baidu.com)`
		};
	},
	asyncData() {},
	methods: {},
	mounted() {
		document.getElementsByTagName("body")[0].classList.add("postDetail");
		// console.log(this.$route.params.post);
	},

	beforeDestroy: function() {
		document.getElementsByTagName("body")[0].classList.remove("postDetail");
	}
};
</script>