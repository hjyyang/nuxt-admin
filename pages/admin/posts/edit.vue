<template>
    <section class="edit">
        <header>
            <div class="container">
                <nuxt-link to="/admin/posts" class="go_back"><i class="iconfont icon-fanhui"></i></nuxt-link>
            </div>
        </header>
    </section>
</template>

<script>
export default {
    layout: "edit",
    data() {
        return {};
    },
    mounted(){
    }
};
</script>

<style lang="scss">
.edit{
    header{
        padding-top: 10px;
    }
    .go_back{
        display: block;
        i{
            font-size: 30px;
        }
    }
}
</style>