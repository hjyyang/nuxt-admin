<template>
	<main class="home">
		<div class="home_banner">
			<div class="banner_main">
				<div class="item">
					<img src="~/static/theme/banner2.jpg" alt />
				</div>
			</div>
		</div>

		<section class="home_article">
			<div class="minContainer">
				<div class="item">
					<div class="post_content">
						<div class="post_date">
							<i class="el-icon-time"></i>
							发布与2019-10-01
						</div>
						<h3 class="post_title">
							<nuxt-link to>这是一个测试标题</nuxt-link>
						</h3>
						<div class="post_meta">
							<div class="post_count">
								<i class="el-icon-view"></i>70
							</div>
							<div class="post_comment">
								<nuxt-link to>
									<i class="el-icon-chat-dot-round"></i>24
								</nuxt-link>
							</div>
							<div class="post_category">
								<nuxt-link to>
									<i class="el-icon-folder-opened"></i>测试
								</nuxt-link>
							</div>
						</div>
						<div class="post_describe">这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题</div>
					</div>
					<div class="post_image">
						<nuxt-link to="/">
							<img src="http://via.placeholder.com/430x300" alt />
						</nuxt-link>
					</div>
				</div>
				<div class="item">
					<div class="post_content">
						<div class="post_date">
							<i class="el-icon-time"></i>
							发布与2019-10-01
						</div>
						<h3 class="post_title">
							<nuxt-link to>这是一个测试标题</nuxt-link>
						</h3>
						<div class="post_meta">
							<div class="post_count">
								<i class="el-icon-view"></i>70
							</div>
							<div class="post_comment">
								<nuxt-link to>
									<i class="el-icon-chat-dot-round"></i>24
								</nuxt-link>
							</div>
							<div class="post_category">
								<nuxt-link to>
									<i class="el-icon-folder-opened"></i>测试
								</nuxt-link>
							</div>
						</div>
						<div class="post_describe">这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题这是一个测试标题</div>
					</div>
					<div class="post_image">
						<nuxt-link to="/">
							<img src="http://via.placeholder.com/430x300" alt />
						</nuxt-link>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {};
	},
	asyncData() {}
};
</script>

<style lang="scss">
.home_article {
	padding-top: 80px;
	.item {
		display: flex;
		margin-bottom: 40px;
		border-radius: 10px;
		background: #ffffff;
		box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
		transition: all 0.3s;
        color: #666666;
        overflow: hidden;
		&:hover {
			box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
			img {
				transform: scale(1.2);
			}
		}
		&:nth-of-type(2n) {
			.post_image {
				order: -1;
			}
			.post_content {
				text-align: right;
			}
			.post_meta {
				justify-content: flex-end;
				> div {
					margin-left: 12px;
					margin-right: 0px;
				}
			}
		}
	}
	.post_content {
		max-width: 350px;
		width: 100%;
		padding: 30px;
		box-sizing: border-box;
	}
	h3.post_title {
		a {
			color: #1a1a1a;
		}
	}
	.post_date {
		margin-bottom: 20px;
	}
	.post_meta {
		display: flex;
		padding-top: 16px;
		> div {
			margin-right: 12px;
		}
		a {
			color: #666666;
			font-size: 14px;
		}
		i {
			margin-right: 4px;
		}
	}
	.post_describe {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		height: 86px;
		padding-top: 14px;
		color: #666666;
		font-size: 15px;
		overflow: hidden;
	}
	.post_image {
		max-width: 430px;
		width: 100%;
		a {
			display: block;
			overflow: hidden;
		}
	}
}
</style>
