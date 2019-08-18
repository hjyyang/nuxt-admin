<template>
    <div>
		<Header />
        <main class="admin_layout">
            <nuxt />
        </main>
    </div>
</template>

<script>
import Header from "~/components/header.vue"
export default {
	components: {
        Header
    },
    data() {
        return {};
    }
};
</script>>

<style>
</style>