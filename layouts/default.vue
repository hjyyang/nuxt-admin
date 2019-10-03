<template>
	<div class="default_layout">
		<Header />
		<nuxt />
		<!-- <Footer /> -->
	</div>
</template>

<script>
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
export default {
	components: {
		Header,
		Footer
	},
	data() {
		return {};
	},
	mounted() {
		this.menuScroll();
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

				if (window.innerHeight <= scrollTop) {
					document
						.getElementsByClassName("app_header")[0]
						.getElementsByClassName("page_header")[0].className =
						"page_header show";
				} else {
					document
						.getElementsByClassName("app_header")[0]
						.getElementsByClassName("page_header")[0].className =
						"page_header";
				}
			};
		}
	}
};
</script>>

<style lang="scss">
</style>
