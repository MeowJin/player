var innerAudioContext;
const createInnerAudioContext = function(data) {
	if (innerAudioContext) {
		stopInnerAudioContext();
	}
	innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src = data.url;
	return innerAudioContext;
}

const stopInnerAudioContext = function() {
	innerAudioContext.stop();
}

export default {
	createInnerAudioContext,
	stopInnerAudioContext
}
