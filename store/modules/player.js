const player = {
	state: {
		playlist: {},
		music: {},
	},
	mutations: {
		saveMusic: (state, data) => {
			const {
				playlist,
				music
			} = data;
			state.playlist = playlist;
			state.music = music;
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
