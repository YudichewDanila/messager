import { createStore } from 'vuex'

export default createStore({
  state:{
    pageNumber:0,
    mainChat:false,
    mainProfel:false,
    mainScrollBur:true,
    mainAddFrend:false,
    updateFrend:true,
    authType:true,
    toid:{},
    jwtTocken:'',
    myprofel:{},
    users:[],
  },
  getters: {
    PageNumber(state){
      return state.pageNumber;
    },
    AuthType(state){
      return state.authType;
    },
    showjwt(state){
      return state.jwtTocken;
    },
    myprofel(state){
      return state.myprofel;
    },
    users(state){
      return state.users;
    },
    toidChat(state){
      return state.toid;
    },
    mainChat(state){
      return state.mainChat;
    },
    mainProfel(state){
      return state.mainProfel;
    },
    mainAddFrend(state){
      return state.mainAddFrend;
    },
    updateFrend(state){
      return state.updateFrend;
    },
    mainScrollBur(state){
      return state.mainScrollBur;
    }
  },
  mutations: {
    ADDCOUNT:(state, addcount)=>{
      state.pageNumber = addcount;
    },
    AUTHTYPEER:(state, typeer)=>{
      state.authType = typeer;
    },
    JWTTOCKENPUSH:(state, jwt)=>{
      state.jwtTocken = jwt;
    },
    MYPROFEL:(state, profel)=>{
      state.myprofel = profel;
    },
    USERS:(state, users)=>{
      state.users = users;
    },
    UPDATETOID:(state, toid)=>{
      state.toid = toid;
    },
    MAINCHAT:(state, status)=>{
      state.mainChat = status; 
    },
    MAINPROFEL:(state, status)=>{
      state.mainProfel = status;
    },
    MAINADDFREND:(state, status)=>{
      state.mainAddFrend = status;
    },
    MAINSCROLLBUR:(state, status)=>{
      state.mainScrollBur = status;
    },
    CLIERSTATUS:(state)=>{
      state.mainChat = false;
      state.mainAddFrend = false;
      state.mainProfel = false;
    },
    UPDATEFREND:(state, status)=>{
      state.updateFrend = status;
    }

  },
  actions: {
    async addcount({commit}, addcount){
      commit("ADDCOUNT", addcount);
    },
    async authtypeer({commit}, typeer){
      commit("AUTHTYPEER", typeer);
    },
    async jwtTockenpush({commit}, jwt){
      commit("JWTTOCKENPUSH", jwt);
    },
    async myprofel({commit}, profel){
      commit("MYPROFEL", profel);
    },
    async users({commit}, users){
      commit("USERS", users);
    },
    async updatetoid({commit}, toid){
      commit("UPDATETOID", toid);
    },
    async mainchat({commit}, status){
      commit("MAINCHAT", status);
    },
    async mainprofel({commit}, status){
      commit("MAINPROFEL", status);
    },
    async mainaddfrend({commit}, status){
      commit("MAINADDFREND", status);
    },
    async mainscrollbur({commit}, status){
      commit("MAINSCROLLBUR", status);
    }, 
    async clierstatus({commit}){
      commit("CLIERSTATUS");
    },
    async updatefrend({commit}, status){
      commit("UPDATEFREND", status);
    }
    
  },
  modules: {
  }
})
