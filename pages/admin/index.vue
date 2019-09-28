<template>
	<section class="admin_data">
		<div class="card_list">
			<div class="PV_data_wrap card col7">
				<div class="PV_data"></div>
			</div>
			<div class="browser_data_wrap card col3">
				<div class="browser_data"></div>
			</div>
			<!-- <div class="map_data_wrap card">
				<div class="map_data"></div>
			</div> -->
		</div>
	</section>
</template>

<script>
// import echarts from "echarts";
import echarts from "echarts/lib/echarts";
import line from "echarts/lib/chart/line";
import pie from "echarts/lib/chart/pie";
import tooltip from "echarts/lib/component/tooltip";
import legend from "echarts/lib/component/legend";

export default {
	layout: "admin",
	data() {
		return {};
	},
	mounted() {
		this.PV();
		this.browser();
	},
	methods: {
		PV() {
			let myPv = echarts.init(
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
		},
		browser() {
			let myBrowser = echarts.init(
				document.getElementsByClassName("browser_data")[0]
			);
			myBrowser.setOption({
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: "vertical",
					left: "left",
					data: ["Chrome", "Safari", "Opera", "Firefox", "IE"]
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: [
							{ value: 635, name: "Chrome" },
							{ value: 310, name: "Safari" },
							{ value: 234, name: "Opera" },
							{ value: 135, name: "Firefox" },
							{ value: 148, name: "IE" }
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}
				]
			});
		}
	}
};
</script>

<style lang="scss">
.admin_data {
	padding: 30px;
	box-sizing: border-box;
	.card_list {
		flex-wrap: wrap;
		.card:last-of-type {
			// margin-bottom: 0px;
		}
	}
	.PV_data_wrap {
		position: relative;
		&::before {
			content: "";
			display: block;
			padding-top: 52%;
		}
		.PV_data {
			position: absolute;
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
		}
	}

	.browser_data_wrap {
		position: relative;
		&::before {
			content: "";
			display: block;
			padding-top: 100%;
		}
		.browser_data {
			position: absolute;
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
		}
	}

	.map_data_wrap {
		position: relative;
		width: 100%;
		&::before {
			content: "";
			display: block;
			padding-top: 40%;
		}
		.map_data {
			position: absolute;
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
		}
	}

	@media (max-width: 768px) {
		.card_list {
			flex-wrap: wrap;
		}
		.col7 {
			width: 100%;
		}
		.col3 {
			width: 100%;
		}
		.browser_data_wrap {
			&::before {
				padding-top: 60%;
			}
		}
	}
	@media (max-width: 540px) {
		padding: 10px;
		.PV_data_wrap {
			&::before {
				padding-top: 100%;
			}
		}
	}
	@media (max-width: 375px) {
		.browser_data_wrap {
			&::before {
				padding-top: 100%;
			}
		}
	}
}
</style>