<template>
    <main class="music">
        <section class="page_banner">
            <div class="minContainer">
                <h1>音乐，响彻心灵</h1>
            </div>
        </section>
        <section class="music_wrap">
            <div class="fiexd_nav">
                <div class="nav_wrap">
                    <ul @click="selectCategory">
                        <li class="current">纯音乐</li>
                        <li>民谣</li>
                        <li>吉他曲</li>
                    </ul>
                </div>
            </div>
            <div class="minContainer">
                <div class="content">
                    <div class="item">
                        <h2 class="col_title">
                            <div class="title_wrap">
                                <div class="title_main">
                                    <span>纯音乐</span>
                                    <div class="play">
                                        <i class="el-icon-video-play"></i>顺序播放
                                    </div>
                                </div>
                            </div>
                        </h2>
                        <ul>
                            <li>
                                <nuxt-link to="/music/天空之城">
                                    <div class="poster">
                                        <img src="/upload/2019/10/tiankongzhichneg.jpeg" alt />
                                    </div>
                                    <div class="title">天空之城</div>
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to>
                                    <div class="poster">
                                        <img src="/upload/2019/10/tiankongzhichneg.jpeg" alt />
                                    </div>
                                    <div class="title">无题</div>
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to>
                                    <div class="poster">
                                        <img src="/upload/2019/10/tiankongzhichneg.jpeg" alt />
                                    </div>
                                    <div class="title">天空之城</div>
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to>
                                    <div class="poster">
                                        <img src="/upload/2019/10/tiankongzhichneg.jpeg" alt />
                                    </div>
                                    <div class="title">天空之城</div>
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to>
                                    <div class="poster">
                                        <img src="/upload/2019/10/tiankongzhichneg.jpeg" alt />
                                    </div>
                                    <div class="title">天空之城</div>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import yTool from "~/assets/js/tool";
export default {
    data() {
        return {};
    },
	asyncData() {},
	mounted(){
	},
    methods: {
        selectCategory: function() {
			console.log(yTool.lazysize)
		}
    }
};
</script>