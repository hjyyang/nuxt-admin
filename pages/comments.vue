<template>
	<main class="comments">
		<section class="page_banner">
			<div class="minContainer">
				<h1>留言版</h1>
			</div>
		</section>
		<section class="comments_wrap">
			<div class="minContainer">
				<h2 class="col_title">
					<span>
						伝言板 |
						<i class="min">10条评论</i>
					</span>
				</h2>

				<div class="list_item">
					<div class="list_head">
						<div class="list_face">
							<img src="http://via.placeholder.com/44x44?text=head" alt />
						</div>
						<div class="list_info">
							<div class="name">我的世界只有你</div>
							<div class="info">
								发布于13小时前（
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-guge" />
								</svg> Google Chrome 76.0.3809.132
								<i class="iconfont icon-windows-copy" style="color: #1296db;"></i>
								Windows 10 )来自: 广东广州
							</div>
						</div>
					</div>
					<div
						class="list_con"
					>这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好</div>
				</div>
				<div class="list_item">
					<div class="list_head">
						<div class="list_face">
							<img src="http://via.placeholder.com/44x44?text=head" alt />
						</div>
						<div class="list_info">
							<div class="name">我的世界只有你</div>
							<div class="info">
								发布于13小时前（
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-guge" />
								</svg> Google Chrome 76.0.3809.132
								<i class="iconfont icon-windows-copy" style="color: #1296db;"></i>
								Windows 10 )来自: 广东广州
							</div>
						</div>
					</div>
					<div
						class="list_con"
					>这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好 这是一个测试内容，我随便写写就好</div>
				</div>
				<div class="paged">
					<el-pagination
						@size-change="sizeChange"
						@current-change="currentChange"
						:current-page.sync="currentPage"
						:pager-count="5"
						:hide-on-single-page="true"
						layout="prev, pager, next, jumper"
						:total="120"
					></el-pagination>
				</div>

				<div class="exitCon">
					<div :class="['exitComm',exitChecked ? 'focus' : '']" data-text="在对的时间遇到对的你...">
						<textarea @focus="exitFocus" @blur="exitBlur"></textarea>
					</div>
					<button type="button">BiuBiuBiu~</button>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {
            currentPage: 1,
            exitChecked: false
		};
	},
	asyncData() {},
	methods: {
		sizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		currentChange(val) {
			console.log(`当前页: ${val}`);
		},
		exitFocus() {
			this.exitChecked = true;
		},
		exitBlur() {
            this.exitChecked = false;
        }
	}
};
</script>