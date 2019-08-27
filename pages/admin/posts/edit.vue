<template>
	<section class="edit">
		<header>
			<div class="container">
				<nuxt-link to="/admin/posts" class="go_back">
					<i class="iconfont icon-fanhui"></i>
				</nuxt-link>
				<div class="status_text">
					Articles are automatically saved to
					<nuxt-link to title="最近保存于 2019/8/27 下午9:53:20">drafts</nuxt-link>
				</div>
                <div class="cover_img">
                    <i class="el-icon-picture"></i>
                </div>
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
	mounted() {}
};
</script>

<style lang="scss">
.edit {
	height: 100%;
	background: #ffffff;
	header {
		padding-top: 10px;
		.container {
			display: flex;
			align-items: center;
		}
	}
	.go_back {
		display: block;
		&:hover {
			opacity: 0.8;
            i{
                color: #409eff;
            }
		}
		i {
			font-size: 30px;
			color: #ddd;
            transition: all .3s;
		}
	}

	.status_text {
        padding: 0px 14px;
		margin-left: auto;
		font-size: 16px;
		color: #ddd;
		a {
			color: #ddd;
			text-decoration: underline !important;
			&:hover {
				color: #409eff;
			}
		}
	}
    .cover_img{
        padding: 0px 14px;
        font-size: 28px;
        color: #ddd;
        i{
            cursor: pointer;
        }
    }
}
</style>