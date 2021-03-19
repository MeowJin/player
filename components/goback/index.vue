<template>
	<view class="status">
		<view class='goback'>
			<text class="iconfont iconfanhui" @click="goback()"></text>
			<text class="iconfont iconhome" @click="gohome()"></text>
		</view>
	</view>

</template>

<script>
	export default {
		methods: {
			goback() {
				uni.navigateBack()
			},
			gohome() {
				uni.navigateTo({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/iconfont/iconfont.css';

	.status {
		.goback {
			padding-left: 20rpx;
			box-sizing: border-box;

			.iconfont {
				color: #fff;
				font-size: 32rpx;
				padding: 15rpx 20rpx;
				box-sizing: border-box;
				background: rgba(0, 0, 0, 0.4);
				vertical-align: sub;
			}

			.iconfanhui {
				border: 1rpx solid rgba(255, 255, 255, 0.4);
				border-right: 0;
				border-radius: 50% 0 0 50%;
				position: relative;
				padding-right: 25rpx;
			}

			.iconfanhui::after {
				content: '';
				display: inline-block;
				height: 60%;
				width: 1rpx;
				position: absolute;
				background: rgba(255, 255, 255, 0.4);
				right: 0;
				top: calc(40% / 2);
			}

			.iconhome {
				border: 1rpx solid rgba(255, 255, 255, 0.4);
				border-left: 0;
				border-radius: 0 50% 50% 0;
				padding-left: 25rpx;
			}
		}
	}
</style>
