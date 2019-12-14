<template>
	<div class="signin_layout">
		<!-- <Header /> -->
		<nuxt />
		<Footer />
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
		document.getElementsByTagName("body")[0].classList.add("login");
	},
	beforeDestroy() {
		document.getElementsByTagName("body")[0].classList.remove("login");
	}
};
</script>>

<style lang="scss">
    body.login{
        padding: 0px;
    }
</style>
