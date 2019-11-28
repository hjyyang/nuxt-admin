<template>
	<div class="default_layout">
		<Header :isMobile="isMobile"></Header>
		<div class="fixed_contact">
			<ul>
				<li>
					<a href>
						<i class="iconfont icon-github-copy"></i>
					</a>
				</li>
				<li>
					<i class="iconfont icon-weixin"></i>
                    <div class="popup"><img src="http://via.placeholder.com/160x160?text=1" alt=""></div>
				</li>
			</ul>
		</div>
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
import yTool from "~/assets/js/tool";
export default {
	components: {
		Header,
		Footer
	},
	data() {
		return {
			isMobile: false
		};
	},
	mounted() {
		document.getElementsByTagName("body")[0].className = "";
		this.menuScroll();
        this.mobileMonitor();
        yTool.lazysize();
	},
	methods: {
		menuScroll() {
			let scrollTop = 0;
			window.onscroll = () => {
				if (
					document.documentElement &&
					document.documentElement.scrollTop
				) {
					scrollTop = document.documentElement.scrollTop;
				} else if (document.body) {
					scrollTop = document.body.scrollTop;
				}
				if (document.getElementsByClassName("app_header")[0]) {
					if (scrollTop > 20) {
						document
							.getElementsByClassName("app_header")[0]
							.getElementsByClassName(
								"page_header"
							)[0].className = "page_header show";
					} else {
						document
							.getElementsByClassName("app_header")[0]
							.getElementsByClassName(
								"page_header"
							)[0].className = "page_header";
					}
				}
			};
		},
		mobileMonitor() {
			if (!window) return;
			if (window.outerWidth <= 1024) {
				this.isMobile = true;
			}
			let vm = this;
			window.onresize = function() {
				if (window.outerWidth <= 1024) {
					vm.isMobile = true;
				} else {
					vm.isMobile = false;
				}
			};
		}
	}
};
</script>>

<style lang="scss">
.default_layout {
	> main {
		min-height: calc(100vh - 60px);
	}
}
</style>
