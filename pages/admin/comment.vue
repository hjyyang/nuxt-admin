<template>
    <section class="comment">
        <div class="comment_main">
            
        </div>
    </section>
</template>

<script>
export default {
    layout: "admin",
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.comment{
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
}
.comment_main{
    padding: 30px;
    box-sizing: border-box;
    background: #ffffff;
}
@media (max-width: 540px) {
    .comment{
        padding: 30px 10px;
    }
}
</style>
