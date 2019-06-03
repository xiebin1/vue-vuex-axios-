import api from '../../fetch/api'
import * as types from './../types.js';

const state = {
    getMineBaseMsg: [],
    status: {},
} 

const actions = {
    async mineBaseMsgApi({ commit }) {
        let { data } = await api.mineBaseMsgApi()
        commit(types.GET_BASE_API, data)
    },
    async addNewsList({ commit }, title) {
        console.log(title)
        let { data } = await api.addNewsList(title);
        console.log(data);
        commit(types.GET_NEWS_LIST, data)
    }
}

const getters = {
    getMineBaseMsg: state => state.getMineBaseMsg
}

const mutations = {
    [types.GET_BASE_API](state, res) {
        // console.log(state,res)
        state.getMineBaseMsg = res
    },
    [types.GET_NEWS_LIST](state, res) {
        console.log(state)
        state.getMineBaseMsg = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
