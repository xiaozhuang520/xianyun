import { async } from "q"

export const state = () => {
    return {
        userinfo: {}
    }
}

export const mutations = {
    setuserinfo(state, data) {
        state.userinfo = data

    }
}
export const actions = {
    
    async login(store, data) {
        const res = await this.$axios({
            url: '/accounts/login',
            method: 'post',
            data
        })
       
        if (res.status === 200) {
            store.commit('setuserinfo',res.data)
        }
        return res
        
    },
    async sendcaptcha(store, data) {
        const res = await this.$axios({
            url: '/captchas',
            method: 'post',
            data: {
                tel: data
            }
        })
        return res
    },
    async register(store, data) {
        const res = await this.$axios({
            url: '/accounts/register',
            method: 'post',
            data
        })
      
        if(res.status===200){
            store.commit('setuserinfo',res.data)
        }
        return res
    }
}