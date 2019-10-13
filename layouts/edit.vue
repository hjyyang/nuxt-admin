<template>
	<div class="edit_layout">
		<nuxt />
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		document.getElementsByTagName("body")[0].className = "edit";
	}
};
</script>

<style lang="scss">
.edit_layout {
	height: 100vh;
}
</style>
