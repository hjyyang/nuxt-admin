<template>
	<div class="edit_layout">
		<nuxt />
	</div>
</template>

<script>
export default {
	middleware: "auth",
	data() {
		return {};
	},
	mounted() {
		document.getElementsByTagName("body")[0].classList.add("edit");
	},
	beforeDestroy() {
        document.getElementsByTagName("body")[0].classList.remove("edit");
    }
};
</script>

<style lang="scss">
.edit_layout {
	height: 100vh;
}
</style>
