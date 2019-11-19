<template>
	<main class="song">
		<section class="song_wrap">
			<div class="minContainer">
				<div class="song_head">
					<div :class="['disc',play ? '' : 'stop']" @click="songPlay">
						<img src="/upload/2019/10/tiankongzhichneg.jpeg" alt />
						<div class="shade"></div>
					</div>
					<div class="song_info">
						<h1>无题</h1>
						<p class="des_row">歌手: 陈亮</p>
						<p class="des_row">类型: 吉他solo</p>
					</div>
				</div>
				<div class="song_score">
					<div class="sc_item">
						<el-image src="/upload/2019/10/wuti1.png" lazy></el-image>
					</div>
					<div class="sc_item">
						<el-image src="/upload/2019/10/wuti2.png" lazy></el-image>
					</div>
					<div class="sc_item">
						<el-image src="/upload/2019/10/wuti3.png" lazy></el-image>
					</div>
					<div class="sc_item">
						<el-image src="/upload/2019/10/wuti4.png" lazy></el-image>
					</div>
					<div class="sc_item">
						<el-image src="/upload/2019/10/wuti5.png" lazy></el-image>
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
			pageTitle: "",
			play: false
		};
	},
	asyncData(app) {
		return {
			pageTitle: app.params.song
		};
	},
	methods: {
		songPlay: function(e) {
			this.play = !this.play;
		}
	},
	mounted() {}
};
</script>