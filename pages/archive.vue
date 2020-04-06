<template>
	<main class="archive">
		<section class="page_banner">
			<div class="minContainer">
				<h1>归档</h1>
			</div>
		</section>
		<section class="archive_wrap">
			<div class="minContainer">
				<div class="timeline" :year="key" v-for="(item, key, index) in timeData" :key="index">
					<div
						class="item"
						:month="key1+'月'"
						:year="key1"
						v-for="(item1, key1, index1) in item"
						:key="index1"
					>
						<div class="item_wrap">
							<div class="item_main">
								<div class="line" v-for="(item2,index2) in item1" :key="index2">
									<h3 class="line_title">
										<nuxt-link :to="'/post/'+item2.id">{{item2.title}}</nuxt-link>
									</h3>
									<strong class="date">{{new Date(item2.publishedAt).getDate()}}日</strong>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {
			timeData: {}
		};
	},
	async asyncData(app) {
		let res = await app.$axios({
			url: "/api/archive",
			method: "get"
		});
		return {
			timeData: res.data.data
		};
	},
	mounted() {
		// this.$axios({
		// 	url: "/api/archive",
		// 	method: "get"
		// }).then(res => {
		// 	this.timeData = res.data.data;
		// 	console.log(this.timeData);
		// });
	},
	methods: {}
};
</script>