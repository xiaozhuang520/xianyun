export const state = () => {
    return {
        postDraft: []

    }
}

export const mutations = {
    setpostDraft(state, data) {
        state.postDraft.unshift(data)
    },
    deletePostDraft(state,index){
        state.postDraft.splice(index,1)
    }
}