<template>
	<view class="container">
		<view class="search">
			<input placeholder="搜索歌曲" />
		</view>
		<view class="page-section swiper">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true">
				<swiper-item>
					<image class="banner" src="../../static/imgs/swiper_item_1.png" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="bill-wraper">
			<view class="bill" v-for="bill in topList">
				<view class="left">
					<image class="left_img" mode="aspectFill" :src="bill.coverImgUrl"></image>
				</view>
				<view class="content">
					<view class="content_item" v-for="(item,index) in bill.tracks">
						<view @click="()=>onDetail(bill)">{{index+1}}.{{item.first}} - {{item.second}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				topList: [],
			}
		},
		onLoad() {
			//获取歌单
			request('/toplist/detail').then(res => {
				const {
					list
				} = res;
				//展示4个歌单
				const newList = list.splice(0, 4);
				this.topList = newList;
			})
		},
		methods: {
			onDetail(row) {
				uni.navigateTo({
					url: '../playlist/index?id=' + row.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;

		.search {

			padding-bottom: 20rpx;

			input {
				border: 1px solid #eee;
				border-radius: 20rpx;
				padding: 5rpx 20rpx;
			}
		}

		.banner {
			width: 100%;
		}

		.bill-wraper {
			.bill {
				margin-bottom: 30rpx;
				position: relative;

				.left {
					width: 200rpx;
					height: 200rpx;

					.left_img {
						width: 200rpx;
						height: 200rpx;
						vertical-align: bottom;
						border-radius: 10rpx;
					}
				}

				.content {
					padding-left: 220rpx;
					display: inline-block;
					vertical-align: top;
					position: absolute;
					top: 0;
					color: rgba(0, 0, 0, 0.7);

					.content_item {
						padding: 8rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>
