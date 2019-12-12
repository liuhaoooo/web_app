import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  USERDATA: 'USERDATA',
  FRIENDDATA:'FRIENDDATA'
}

//-----------------------------------------------------
const state = {
  userdatas: {},
  frienddata:{}
}

//-----------------------------------------------------
const getters = {
  userdatas: state => state.userdatas,
  frienddata: state => state.frienddata
}

//-----------------------------------------------------
const mutations = {
  [types.USERDATA](state, userdatas) {
    if (userdatas) {
      state.userdatas = userdatas
    } else {
      state.userdatas = {}
    }
  },
  [types.FRIENDDATA](state, frienddata) {
    if (frienddata) {
      state.frienddata = frienddata
    } else {
      state.frienddata = {}
    }
  }
}

//-----------------------------------------------------
const actions = {
  setuserdata: ({ commit }, userdatas) => {
    commit(types.USERDATA, userdatas)
  },
  setfrienddata: ({ commit }, frienddata) => {
    commit(types.FRIENDDATA, frienddata)
  }
}



export default new Vuex.Store({
  types,
  state,
  getters,
  mutations,
  actions
})
