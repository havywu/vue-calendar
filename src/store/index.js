import Vuex from "vuex";
import Vue from "vue";

import index from './modules/index';

// 必须在store创建之前注册vuex
Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {},
	mutations: {},
	actions: {},
	modules: {
        index,
    },
});

export default Store;