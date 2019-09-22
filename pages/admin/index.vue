<template>
	<section class="admin_data">
		<div class="card_list">
			<div class="PV_data card col7">
				<!-- <canvas>你的浏览器不支持canvas,请升级你的浏览器</canvas> -->
			</div>
			<div class="browser_data card col3"></div>
		</div>
	</section>
</template>

<script>
// import echarts from "echarts";
import echarts from "echarts/lib/echarts";
import line from "echarts/lib/chart/line";
import tooltip from "echarts/lib/component/tooltip";

export default {
	layout: "admin",
	data() {
		return {};
	},
	mounted() {
		this.PV();
	},
	methods: {
		PV() {
			document.getElementsByClassName("PV_data")[0].style.width = "70%";
			document.getElementsByClassName("PV_data")[0].style.height =
				"500px";
			var myPv = echarts.init(
				document.getElementsByClassName("PV_data")[0]
			);
			myPv.setOption({
				baseOption: {
					xAxis: {
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月"
						]
					},
					yAxis: {
						type: "value"
					},
					series: [
						{
							name: "访问量",
							data: [100, 92, 90, 34, 10, 30, 20],
							type: "line",
							smooth: true
						}
					],
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} "
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.admin_data {
	padding: 30px;
	box-sizing: border-box;
	.PV_data {
		max-width: 960px;
	}
	canvas {
		// width: 100%;
	}
}
</style>