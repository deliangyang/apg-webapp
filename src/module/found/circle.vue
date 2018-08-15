<template>
    <div class="found-circle">
        <div class="search-box">
            <van-search placeholder="请输入需要的素材" v-model="keyword" @search="onSearch"/>
        </div>

        <van-list v-model="loading" :finished="finished" @load="onLoad" >
            <div class="found-item" v-for="(item, index) in foundCircles" :key="index">
                <van-row>
                    <van-col span="4">
                        <div class="avatar">
                            <img :src="item.user.avatar" />
                        </div>
                    </van-col>
                    <van-col span="20">
                        <div class="nickname">{{item.user.nickname}}</div>
                        <div class="create-time">{{item.createTime}}</div>
                        <div class="content">{{item.content}}</div>
                        <div class="images" v-if="item.type === 2">
                            <div v-for="(images, idx) in item.extra.image" :key="idx">
                                <div class="image-list">
                                    <img v-for="(image, key) in images" @click="showImagePreview(index, idx, key)" :key="key" :src="image" />
                                </div>
                            </div>
                        </div>
                        <div class="video" v-if="item.type === 3">
                            <video :src="item.extra.video" controls ></video>
                        </div>

                        <div class="operate-download">
                            <div class="download">
                                <img src="@/images/copy.png" />
                                <div>存入相册</div>
                            </div>
                            <div class="copy">
                                <img src="@/images/download.png" />
                                <div>复制文字</div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </van-list>
    </div>
</template>

<script>
import { List, Search, Row, Col, ImagePreview } from 'vant';
import Vue from 'vue';
import { utils } from '@/utils/index';
Vue.use(List).use(Search).use(Row).use(Col);

export default {
    data() {
        return {
            finished: true,
            loading: false,
            foundCircles: [],
            keyword: '',
            page: 1,
        };
    },
    methods: {
        onLoad() {
            this.loadFoundCircle({
                page: this.page++,
                keywords: this.keyword,
            });
        },
        onSearch(keyword) {
            this.loadFoundCircle({
                keywords: keyword,
                page: 1,
            });
        },
        showImagePreview(index, idx, key) {
            const images = [];
            this.foundCircles[index].extra.image.forEach(element => {
                element.forEach(image => {
                    images.push(image);
                });
            });
            ImagePreview({
                images: images,
                startPosition: idx * 3 + key,
                onClose() {
                    // do something
                }
            });
        },
        loadFoundCircle(params) {
            this.loading = true;
            this.finished = false;
            this.$axios.get('/api/found/circle', { params: params }).then((res) => {
                if (params && params.page === 1) {
                    this.foundCircles = [];
                }
                res.data.data.forEach(element => {
                    if (element.type === 2 || element.type === 3) {
                        try {
                            element.extra = JSON.parse(element.extra);
                        } catch (e) {
                            //
                        }
                    }
                    if (element.type === 2) {
                        if (element.extra.image) {
                            const images = [];
                            var tmp = [];
                            var index = 0;
                            element.extra.image.forEach(image => {
                                tmp.push(image);
                                if ((index + 1) % 3 === 0) {
                                    images.push(tmp);
                                    tmp = [];
                                }
                                index++;
                            });
                            element.extra.image = images;
                        }
                    }
                    element.createTime = utils.dateTranslate(utils.strtotime(element.created_at));
                    this.foundCircles.push(element);
                });
                this.loading = false;
                this.finished = true;
            });
        },
    },
    mounted() {
        this.$nextTick((res) => {
            this.loadFoundCircle();
        });
    },
};
</script>

<style lang="less">
.found-circle {
    .found-item {
        padding: 8px 0;
        background-color: #ffffff;
        border-bottom: 1px solid #CCCCCC;
        .avatar {
            text-align: center;
            img {
                box-shadow: 0 0 5px #cccccc;
                width: 40px;
                height: 40px;
                border-radius: 5px;
                -moz-border-radius: 5px; /* Firefox */
                -webkit-border-radius: 5px; /* Safari 和 Chrome */
            }
        }
        .nickname {
            text-align: left;
            font-weight: bold;
            color: #9768C9;
            font-size: 12px;
            margin-bottom: 5px;
        }
        .content {
            text-align: left;
            font-size: 15px;
            margin-top: 5px;
        }
        .images {
            margin-top: 10px;
            text-align: left;
            .image-list {
                display:flex;
                display: inline-block;
                img {
                    box-shadow: 0 0 5px #cccccc;
                    width: 30%;
                    height: auto;
                    border-radius: 5px;
                }
                img:nth-child(2),
                img:nth-child(3) {
                    margin-left: 5px;
                }
            }
        }
        .video {
            text-align: left;
            margin-top: 10px;
            video {
                border-radius: 10px;
                -moz-border-radius: 10px; /* Firefox */
                -webkit-border-radius: 10px; /* Safari 和 Chrome */
                box-shadow: 0 0 5px #cccccc;
            }
        }
        .create-time {
            text-align: left;
            color: #666;
            font-size: 12px;
        }
        .operate-download {
            margin-top: 12px;
            flex-direction: row;
            display: flex;
            color: #3E3E3E;
            img {
                height: 20px;
                width: 20px;
            }
            div {
                width: 60px;
                text-align: center;
                font-size: 12px;
            }
        }
    }
    .found-item:last-child {
        border-bottom: none;
    }
}
</style>

