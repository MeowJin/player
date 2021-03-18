const request = function(options) {
	if (typeof(options) === 'string') {
		options = {
			url: options
		}
	}
	//if (options.url) options.url = '/api' + options.url;

	options.url = 'http://121.37.133.66:3000' + options.url;
	return new Promise((resolve, reject) => {
		try {
			const token = uni.getStorageSync('token');
			if (token) {
				options.header = {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				};
			}
		} catch (err) {
			console.log(err)
		}
		options.complete = (response) => {
			if (response.statusCode == 401) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
		}
		options.success = res => {
			const {
				data
			} = res;
			const {
				code
			} = data;
			if (code === 200) {
				resolve(data);
			} else {
				console.error('请求错误')
				uni.showToast({
					title: "请求错误，请稍后再试",
					icon: 'none',
					duration: 1500,
				})
				reject();
			}
		}
		options.fail = error => {
			console.error('请求失败')
			reject(error);
		}
		return uni.request(options);
	})
}
export default request;
