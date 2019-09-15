<template>
	<section class="admin_data">
		<div class="card_list">
			<div class="PV_data card col7">
				<canvas width="600" height="600">你的浏览器不支持canvas,请升级你的浏览器</canvas>
			</div>
			<div class="browser_data card col3"></div>
		</div>
	</section>
</template>

<script>
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
			let PVcanvas = document
					.getElementsByClassName("PV_data")[0]
					.getElementsByTagName("canvas")[0],
				PVCtx;
			if (!PVcanvas.getContext) return;
			PVCtx = PVcanvas.getContext("2d");

			PVCtx.beginPath(); //新建一条path
			PVCtx.moveTo(10, 200); //起始点
			var cp1x = 40,
				cp1y = 100; //控制点
			var x = 200,
				y = 200; // 结束点
			//绘制二次贝塞尔曲线
			PVCtx.quadraticCurveTo(cp1x, cp1y, x, y);
			PVCtx.stroke();

			PVCtx.beginPath();
			// PVCtx.rect(10, 200, 10, 10);
			// PVCtx.rect(cp1x, cp1y, 10, 10);
			// PVCtx.rect(x, y, 10, 10);
			PVCtx.fill();
		}
	}
};
</script>

<style lang="scss">
.admin_data {
	padding: 30px;
	box-sizing: border-box;
	.PV_data {
	}
	canvas {
		// width: 100%;
	}
}
</style>