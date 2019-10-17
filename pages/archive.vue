<template>
	<main class="archive">
		<section class="page_banner">
			<div class="minContainer">
				<h1>归档</h1>
			</div>
		</section>
		<section class="archive_wrap">
			<div class="minContainer">
				<div class="timeline" year="2018">
					<div class="item" month="1月">
						<div class="line">
							<h3 class="line_title">
								<nuxt-link to>更新时间条</nuxt-link>
							</h3>
							<strong class="date">14日</strong>
						</div>
                        <div class="line">
							<h3 class="line_title">
								<nuxt-link to>test test test</nuxt-link>
							</h3>
							<strong class="date">16日</strong>
						</div>
					</div>
                    <div class="item" month="2月">
						<div class="line">
							<h3 class="line_title">
								<nuxt-link to>更新时间条</nuxt-link>
							</h3>
							<strong class="date">14日</strong>
						</div>
                        <div class="line">
							<h3 class="line_title">
								<nuxt-link to>test test test</nuxt-link>
							</h3>
							<strong class="date">16日</strong>
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
			timeData: [
				{
					year: "2018",
					data: [
						{
							month: "1",
							data: [
								{ date: "14", title: "test", link: "" },
								{
									date: "16",
									title: "this is test post",
									link: ""
								}
							]
						}
					]
				}
			]
		};
	},
	asyncData() {}
};
</script>