import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

// import { auth, database, storage } from 'firebase'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        pictures: null,
        updatedPictures: null,
        user: null,
        loading: null,
        error: null,
        contacts: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        },
        setPictures(state, payload) {
            state.pictures = payload
        },
        setUpdatedPictures(state, payload) {
            state.updatedPictures = payload
        },
        setContacts(state, payload) {
            state.contacts = payload
        }
    },
    actions: {
        signUp({ commit }, payload) {
            // console.log('signing up')
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            uid: user.user.uid,
                            role: 'user',
                            avatar: "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg",
                            email: payload.email,
                            name: payload.name
                        }
                        commit('setUser', newUser)
                        // console.log(newUser)
                        firebase.database().ref('Users/' + user.user.uid).set(newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        // console.log(error)
                    }
                )
        },
        signIn({ commit, actions }, payload) {
            // console.log('Signing In')
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
                user => {
                    commit('setLoading', false)
                    commit('setUser', {
                        uid: user.user.uid,
                        email: payload.email,
                        name: payload.email,
                        role: 'unknown',
                        avatar: "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg"
                    })
                    this.dispatch('getCurrentUser')
                    // firebase.database().ref('Users/' + user.user.uid).once('value').then(data => {
                    //     // console.log('setUser',data.val())
                    //     commit('setUser', data.val())
                    // }).catch(error => {
                    //     console.log(error)
                    //     commit('setUser', {
                    //         uid: user.user.uid,
                    //         email: payload.email,
                    //         name: payload.email,
                    //         role: 'unknown',
                    //         avatar: "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg"
                    //     })
                    // })
                }
            ).catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    // console.log(error)
                }
            )
        },
        autoSignIn({ commit, actions }, user) {
            const currentUser = {
                uid: user.uid,
                email: user.email,
                name: user.email,
                role: 'unknown',
                avatar: "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg"
            }
            commit('setUser', currentUser)
            this.dispatch('getCurrentUser')
            // firebase.database().ref('Users/'+ user.uid).once('value').then(data => {
            //     // console.log('setUser',data.val())
            //     commit('setUser', data.val())
            // }).catch(error =>{
            //     console.log(error)
            //     commit('setUser',{
            //         uid: user.uid,
            //         email: payload.email,
            //         name: payload.email,
            //         role: 'unknown',
            //         avatar: "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg"
            //     })
            // })
        },
        signOut({ commit }) {
            // console.log('sign out')
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({ commit }) {
            commit('clearError')
        },
        // updatePicture({commit, state}, pictureId){
        //     if(state.picture !== null && state.picture.id === pictureId) return
        //     commit('setPicture',pictureId)
        // },
        // updatePictureDetails({commit, state}, pictureDetails){
        //     commit('setLoading',true)
        //     firebase.database().ref('PictureDetails/'+state.picture.id + '/' + state.user.uid).set(pictureDetails)
        //     .then(() => {
        //         commit('setLoading',false)
        //         commit('updatePictureDetails',pictureDetails)
        //     }).catch((error) => {
        //         commit('setLoading', false)
        //     })

        // },
        // getPicture({commit, state}, pictureId){
        //     if(typeof state.picture === 'string' && state.picture.toLowerCase() === 'random'){
        //         pictureId = state.pictures[Math.floor(Math.random()*state.pictures.length)];
        //     }
        //     if(state.picture !== null && state.picture.id === pictureId) return
        //     commit('setLoading',true)
        //     let description = null, link = null, details = null
        //     firebase.database().ref('UserText/' + pictureId).once('value').then((data) => { 
        //         description = data.val() 
        //     }).then(() => { 
        //         return firebase.storage().ref('PathologyImages/'+pictureId+'.jpg').getDownloadURL()
        //     }).then(url => {
        //         link = url
        //         return firebase.database().ref('PictureDetails/' + pictureId).once('value')
        //     }).then((detailsData) => {
        //         if(detailsData.val() !== null){
        //             details = detailsData.val()
        //             // console.log("getPictureDetails: ", details)
        //         }
        //     }).then(() => {
        //         commit('setLoading',false)
        //         const payload = { id: pictureId, description: description, link: link, details: details }
        //         // console.log('commit',payload)
        //         commit('setPicture',payload)
        //     }).catch((error) => {
        //         commit('setLoading',false)
        //         if( description !== null || link !== null || details !== null ){
        //             commit('setPicture',{ id: pictureId, description: description, link: link, details: details })
        //         }else{
        //             commit('setPicture',null)
        //         }
        //     })
        // },
        getPictures({ commit, state }) {
            commit('setLoading', true)
            firebase.database().ref('Pictures').once('value').then((data) => {
                console.log('successfully get pictures from firebase database')
                commit('setPictures', Object.entries(data.val()))
                commit('setLoading', false)
            }).catch(error => {
                commit('setLoading', false)
            })

        },
        getUpdatedPictures({ commit }, uid) {
            firebase.database().ref('UpdatedPictures').child(uid).once('value').then((data) => {
                commit('setUpdatedPictures', Object.keys(data.val()))
            })

        },
        getContacts({ commit, state }) {
            if (state.contacts !== null) return
            firebase.database().ref('Contacts').once('value').then((data) => {
                commit('setContacts', data.val())
            })
        },
        getCurrentUser({ commit, state }) {
            firebase.database().ref('Users/' + state.user.uid).once('value').then(data => {
                // console.log('setUser',data.val())
                commit('setUser', data.val())
            })
        }
    },
    getters: {
        currentUser(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        },
        picture(state) {
            return pictureId => {
                if (pictureId === undefined || pictureId === null || state.pictures === undefined || state.pictures === null) {
                    return null
                } else if (pictureId < state.pictures.length) {
                    let temp = state.pictures[pictureId]
                    temp[2] = pictureId
                    return temp
                } else {
                    let index = -1
                    let temp = state.pictures.find((picture) => {
                        index += 1
                        return picture[0] === pictureId
                    })

                    if (temp === undefined)
                        temp = null
                    else
                        temp[2] = index
                    return temp
                }
            }
        },
        pictures(state) {
            return state.pictures
        },
        updatedPictures(state) {
            return state.updatedPictures
        },
        // featuredPictures(state){

        //     // pictures = state.pictures.filter(( state.updatedPictures ) => !toRemove.includes( state.updatedPictures));
        //     return state.pictures
        // },
        contacts(state) {
            return state.contacts
        }

    }
})