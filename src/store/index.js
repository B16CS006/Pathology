import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

// import { auth, database, storage } from 'firebase'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        pictures:["1000399983051341824","1000780891931672576","1001004050991562752","1001285106525507591"],
        updatedPictures: ["1000780891931672576"],
        user: null,
        picture: null,
        loading: null,
        error: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload){
            state.loading = payload
        },
        setError(state, payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        },
        setPicture(state, payload){
            state.picture = payload
        }
    },
    actions: {
        signUp({ commit }, payload) {
            console.log('signing up')
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading',false)
                        const newUser = {
                            id: user.uid,
                            role: 'user',
                            email: payload.email,
                            name: payload.email
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading',false)
                        commit('setError',error)
                        console.log(error)
                    }
                )
        },
        signIn({commit}, payload){
            console.log('Signing In')
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
                user =>{
                    commit('setLoading', false)
                    const newUser = {
                        id :  user.uid,
                        role: 'user',
                        email : payload.email,
                        name: payload.email 
                    }
                    commit('setUser',newUser)
                }
            ).catch(
                error => {
                    commit('setLoading', false)
                    commit('setError',error)
                    console.log(error)
                }
            )
        },
        clearError({commit}){
            commit('clearError')
        },
        updatePicture({commit, state}, pictureId){
            if(state.picture !=null && state.picture.id == pictureId){
                return
            }
            commit('setPicture',pictureId)
        },
        getPicture({commit, state}, pictureId){
            if(state.picture.toLowerCase() === 'random'){
                pictureId = state.pictures[Math.floor(Math.random()*state.pictures.length)];
                
            }

            if(state.picture !=null && state.picture.id == pictureId){
                return
            }

            let description = null
            let link = null

            firebase.database().ref('UserText/' + pictureId).once('value')
            .then((data) => {
                description = data.val()
                // console.log('descprition',description)
            }).then(() => {
                // console.log('storage')
                return firebase.storage().ref('PathologyImages/'+pictureId+'.jpg').getDownloadURL()
            }).then(url => {
                link = url
                // console.log('link',link)
            }).then(() => {
                const payload = {
                    id: pictureId,
                    description: description,
                    link: link
                }
                console.log('commit',payload)
                commit('setPicture',payload)
            }).catch((error) => {
                const payload = {
                    id: pictureId,
                    description: description,
                    link: link
                }
                console.log('error',error)
                commit('setPicture',payload)
            })
        }
    },
    getters: {
        currentUser(state) {
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        },
        picture(state){
            return state.picture
        },
        pictures(state){
            return state.pictures
        },
        updatedPictures(state){
            return state.updatedPictures
        },
        featuredPictures(state,getters){
            return getters.pictures.slice(0,50)
        }

    }
})