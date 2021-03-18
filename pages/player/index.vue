<template>
	<view class="container">
		<view class="bg" :style="{'--background':'url('+music.al.picUrl+')'}">
		</view>
		<view class="pic-wrapper">
			<view class="pic_inner">
				<image class="pic" :src="music.al.picUrl" mode="aspectFill"></image>
				<text v-if='paused' class="iconfont iconplay" @click="()=>onPaused(true)"></text>
				<text v-if='!paused' class="iconfont iconstop" @click="()=>onPaused(false)"></text>
			</view>
		</view>
		<view class="lyric-wrapper" id='lyric' ref='lyric'>
			<view class="lyric" :style="{transform: 'translateY('+scrollTop+')'}" v-for="(lyric,index) in lyricList">
				<text :class="lyricIndex==index?'actived':''">{{lyric.lyric}}</text>
			</view>
		</view>
		<view class="progress">
			<slider activeColor="#FFCC33" backgroundColor="#000000" block-color="#8A6DE9" block-size="18" :max="duration" :value="currentTime"
			 @change="currentChange" />
		</view>
	</view>

</template>

<script>
	import request from '../../utils/request.js';
	import audio from '../../utils/audio.js';

	export default {
		data() {
			return {
				music: {},
				innerAudioContext: {},
				interval: {},
				currentTime: 0, //当前播放时间
				duration: 0, //总时长		
				paused: false, //是否暂停
				lyricList: [], //歌词				
				lyricIndex: 0, //当前歌词索引，用于高亮显示
				scrollTop: 0, //歌词滚动高度
			}
		},
		onLoad() {
			this.music = this.$store.state.player.music;
			this.duration = this.$store.state.player.music.dt / 1000;
			this.init(this.$store.state.player.music);
		},
		onUnload() {
			this.onStop();
		},
		methods: {
			init(song) {
				//更改标题为歌曲名
				uni.setNavigationBarTitle({
					title: song.name
				})
				//播放歌曲
				request(`/song/url?id=${song.id}`).then(res => {
					const {
						data
					} = res;
					this.music = {
						...song,
						url: data[0].url
					};
					return request(`/lyric?id=${song.id}`)
				}).then(res => {
					const {
						lrc: {
							lyric
						}
					} = res;

					let arr = lyric.split(/\n/g);
					arr.pop();
					const list = arr.map(item => {
						const li = item.split(']');
						const time = li[0].substr(1, li[0].length);
						const timeArr = time.split(':');
						const minute = timeArr[0];
						const secondArr = timeArr[1].split('.')
						const duration = parseFloat(minute * 60 + parseInt(secondArr[0])) + parseFloat('0.' + secondArr[1])
						return {
							time,
							duration,
							lyric: li[1]
						}
					})
					this.lyricList = list;
					this.onPlay();
					this.startInterval();
				})
			},
			onPlay() {
				this.innerAudioContext = audio.createInnerAudioContext(this.music);
			},
			onStop() {
				this.stopInterval();
			},
			onPaused(flag) {
				if (flag) {
					this.innerAudioContext.play();
				} else {
					this.innerAudioContext.pause();
				}
			},
			currentChange(e) {
				const {
					target: {
						value
					}
				} = e;
				this.currentTime = value;
				if (this.innerAudioContext.paused) {
					this.innerAudioContext.play();
				}
				this.innerAudioContext.seek(value);
				this.resetInterval();
			},
			startInterval() {
				this.interval = setInterval(() => {
					const currentTime = this.innerAudioContext.currentTime;
					this.currentTime = parseInt(currentTime);
					this.paused = this.innerAudioContext.paused;
					if (currentTime >= this.duration) {
						this.stopInterval();
					}
					//歌词
					const lyTimeList = this.lyricList.map(item => item.duration)
					const lyricIndex = lyTimeList.findIndex(p => p > currentTime)
					if (lyricIndex - 1 === this.lyricIndex) {} else {
						//滚动高度=总高度/歌词行数


						let view = uni.createSelectorQuery().select('.lyric');
						// console.log(view);

						view.fields({
							size: true,
							scrollOffset: true
						}, data => {
							console.log("得到节点信息" + JSON.stringify(data));
							this.scrollTop += data.height;
							console.log("滚动高度" + this.scrollTop);
						}).exec();
						// 	//获取对应的节点值位置高度信息
						// 	view.boundingClientRect(data => {
						// 		console.log("得到布局位置信息" + JSON.stringify(data));
						// 		console.log("节点离页面顶部的距离为" + data.top);
						// 		// 计算高度值并赋值
						// 		//this.mainClientHeight=data.height;
						// 		this.mainClientHeight = data.height;
						// 		//console.log(data.height);
						// 	}).exec();
						// 	// console.log('歌词dom', this.$refs.lyric, getComputedStyle(this.$refs.lyric));
						// 	const scrollHeight = document.getElementById('lyric').scrollHeight;
						// 	const clientHeight = document.getElementById('lyric').clientHeight
						// 	const offsetHeight = scrollHeight / this.lyricList.length;
						// 	if (offsetHeight * lyricIndex > clientHeight / 2) {
						// 		document.getElementById('lyric').scrollTop += offsetHeight;
						// 	}
						// }
						// this.scrollTop = document.getElementById('lyric').scrollTop; 
						this.lyricIndex = lyricIndex - 1;
					}
				}, 500)
			},
			stopInterval() {
				clearInterval(this.interval);
			},
			resetInterval() {
				document.getElementById('lyric').scrollTop = this.scrollTop;
				this.stopInterval();
				this.startInterval();
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/iconfont/iconfont.css';

	.container {
		.bg {
			position: fixed;
			height: 100vh;
			width: 100vw;
			filter: blur(20px);
			z-index: -99;
			background-image: var(--background);
			background-size: cover;
			background-repeat: no-repeat;
			background-position: top;
			background-attachment: fixed;
		}

		.pic-wrapper {
			width: 70vw;
			height: 70vw;
			margin: 0 auto;
			padding-top: 160rpx;
			position: relative;

			.pic_inner {
				width: 100%;
				height: 100%;
				border: 16rpx solid rgba(255, 255, 255, 0.1);
				box-sizing: border-box;
				border-radius: 50%;
				filter: drop-shadow(0 0 2px #fff);

				.pic {
					width: 100%;
					height: 100%;
					border: 70rpx solid #000;
					border-radius: 50%;
					box-sizing: border-box;
					animation: 10s rotate infinite linear;
				}
			}
		}

		.lyric-wrapper {
			color: #fff;
			text-align: center;
			height: 30vh;
			overflow: scroll;
			margin-top: 100rpx;
			scroll-behavior: smooth;

			.lyric {
				padding: 15rpx 0;
				color: rgba(155, 155, 155, 0.6);

				.actived {
					color: #fff;
					transition: .2s all;
				}
			}
		}

		.iconfont {
			font-size: 180rpx;
			color: #fff;
			position: absolute;
			top: calc(50% - 90rpx);
			left: calc(50% - 90rpx);
		}

		.progress {
			position: fixed;
			bottom: 10rpx;
			width: 100%;
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
