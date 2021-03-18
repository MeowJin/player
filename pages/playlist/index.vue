<template>
	<view class="container">
		<view class="introduction">
			<view class="left">
				<view class="play-count">
					<text>{{playlist.playCountUnit}}</text>
				</view>

				<image class="left_img" mode="aspectFill" :src="playlist.coverImgUrl"></image>
			</view>
			<view class="content">
				<view class="name">{{playlist.name}}</view>
				<view class="description">{{playlist.description}}</view>
			</view>
		</view>

		<view class="music">
			<view class="play-all">播放全部
				<text class="play-all_count">(共{{playlist.trackCount}}首)</text>
			</view>
			<view class="music-item" v-for="(item,index) in playlist.tracks" @click="()=>onPlay(item)">
				<view class="index">{{index+1}}</view>
				<view class="content">
					<view class="name">{{item.name}}</view>
					<view class="des">{{item.des}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import {
		addChineseUnit
	} from '../../utils/utils.js'

	export default {
		data() {
			return {
				playlist: {}
			}
		},
		onLoad(data) {
			this.init(data);
		},
		methods: {
			init(data) {
				const {
					id
				} = data; //榜单ID
				request(`/playlist/detail?id=${id}`).then(res => {
					const {
						playlist
					} = res;
					playlist.playCountUnit = addChineseUnit(playlist.playCount);
					if (playlist.tracks) {
						playlist.tracks = playlist.tracks.map(item => {
							const ars = item.ar.map(p => p.name).join('/');
							const lis = item.alia && item.alia.length ? item.alia : item.name;
							return {
								...item,
								des: ars + ' - ' + lis
							}
						})
					}
					this.playlist = playlist;

				})
			},
			onPlay(row) {
				uni.navigateTo({
					url: `../player/index`
				})
				this.$store.commit('saveMusic', row)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: #eee;
		height: 100%;

		.introduction {
			padding: 200rpx 40rpx 50rpx;

			.left {
				width: 35vw;
				height: 35vw;
				position: relative;

				.play-count {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					z-index: 9999;
					color: #fff;
				}

				.left_img {
					width: 35vw;
					height: 35vw;
					vertical-align: bottom;
					border-radius: 10rpx;
				}
			}

			.content {
				padding-left: 37vw;
				display: inline-block;
				vertical-align: top;
				position: absolute;
				top: 220rpx;
				color: rgba(0, 0, 0, 0.7);

				.name {
					font-size: 36rpx;
					margin-bottom: 20rpx;
				}

				.description {
					font-size: 24rpx;
				}
			}
		}

		.music {
			border-radius: 50rpx 50rpx 0 0;
			padding: 30rpx 20rpx;
			background: #fff;

			.play-all {
				padding-bottom: 50rpx;
				padding-left: 50rpx;

				.play-all_count {
					color: rgba(0, 0, 0, 0.4);
					font-size: 14px;
				}
			}

			.music-item {
				position: relative;
				overflow: hidden;

				.index {
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
				}

				.content {
					position: absolute;
					left: 110rpx;
					top: 10rpx;

					.name {}

					.des {
						color: rgba(0, 0, 0, 0.4);
						font-size: 24rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}

	}
</style>
