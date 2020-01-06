export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  }
}

export const actions = {
  //nuxtServerInit是由Nuxt.js在服务器渲染每个页面之前调用的
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login({
    commit
  }, {
    username,
    password
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/api/login', {
        user_name: username,
        password: password
      })
      if (data.result) {
        commit('SET_USER', data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({
    commit
  }) {
    await this.$axios.post('/api/logout');
    commit('SET_USER', null);
  }

}
