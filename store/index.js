import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app';
import player from './modules/player';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		player
	}
})

export default store
