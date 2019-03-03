/* eslint-disable */ 
export default {
  state: {
      ads:[
        {title:'First Ad',
        description: 'Hello im discription',
        promo: false,
        imageSrc:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: '123'},
        {title:'Second Ad',
        description: 'Hello im discription',
        promo: true,
        imageSrc:'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '1234'},
        {title:'Third Ad',
        description: 'Hello im discription',
        promo: true,
        imageSrc:'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '12345'}
      ]
  },
  mutations: {
    createAd(state, payload){
        state.ads.push(payload)
    }
  },
  actions: {
    createAd({commit}, payload){
        payload.id = Math.random().toString()

        commit('createAd', payload)
    }
  },
  getters: {
      ads(state){
        return state.ads
      },
      promoAds(state){
          return state.ads.filter(ad=>{
              return ad.promo
          })
      },
      myAds(state){
          return state.ads
      },
      addById(state){
          return adId=>{
              return state.ads.find(ad=> ad.id===adId)
          }
      }
  }
}
