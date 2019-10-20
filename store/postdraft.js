export const state = () => {
    return {
        postDraft: []

    }
}

export const mutations = {
    setpostDraft(state, data) {
        state.postDraft.unshift(data)
    }
}