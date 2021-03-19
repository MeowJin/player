<template>
	<view class="container">
		<view class="search">
			<text class="iconfont iconsearch"></text>
			<input placeholder="搜索歌曲" />
		</view>
		<view class="page-section">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true">
				<swiper-item>
					<image class="banner" src="../../static/imgs/swiper_item_1.png" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view v-if='loading' class="bill-wraper">
			<view class="bill" v-for="p in 3">
				<view class="left">
					<view class="prestrain"></view>
				</view>
				<view class="content">
					<view class="content_item">
						<view class="prestrain"></view>
					</view>
					<view class="content_item">
						<view class="prestrain"></view>
					</view>
					<view class="content_item">
						<view class="prestrain"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="bill-wraper">
			<view class="bill" v-for="bill in topList" @click="()=>onDetail(bill)">
				<view class="left">
					<image class="left_img" mode="aspectFill" :src="bill.coverImgUrl"></image>
				</view>
				<view class="content">
					<view class="content_item" v-for="(item,index) in bill.tracks">
						<view>{{index+1}}.{{item.first}} - {{item.second}}</view>
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
				loading: false,
			}
		},
		onLoad() {
			//获取歌单
			this.loading = true;
			request('/toplist/detail').then(res => {
				const {
					list
				} = res;
				//展示4个歌单
				const newList = list.splice(0, 4);
				this.topList = newList;
			}).finally(res => {
				this.loading = false;
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
	@import '../../static/iconfont/iconfont.css';

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;

		.search {
			padding-bottom: 20rpx;
			position: relative;

			.iconfont {
				position: absolute;
				left: 20rpx;
				top: 5rpx;
			}

			input {
				border: 1px solid #eee;
				border-radius: 20rpx;
				padding: 5rpx 20rpx 5rpx 60rpx;
			}
		}

		.page-section {
			margin-bottom: 20rpx;

			.banner {
				width: 100%;
			}
		}

		.bill-wraper {
			.bill {
				margin-bottom: 30rpx;
				display: flex;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				word-break: break-all;

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
					color: rgba(0, 0, 0, 0.7);
					display: flex;
					flex-flow: column;
					flex-wrap: wrap;
					justify-content: space-between;

					.content_item {
						padding: 8rpx 0 8rpx 20rpx;

						.prestrain {
							width: calc(100vw - 300rpx);
							height: 45rpx;
						}
					}
				}
			}
		}
	}
</style>
