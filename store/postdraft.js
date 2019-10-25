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
    },
    editPostDraft(state,data){
        state.postDraft.splice(data.index,1,data)
    }
}