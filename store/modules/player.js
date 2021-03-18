const player = {
	state: {
		music: {},
	},
	mutations: {
		saveMusic: (state, data) => {
			state.music = data;
		}
	},
	actions: {
		setMusic({
			commit
		}, {
			data
		}) {
			commit('saveMusic', data);
		}
	}
}

export default player
