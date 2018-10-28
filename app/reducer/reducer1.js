var dev=false;
const Userdetails ={
Message:[],
url:dev?"http://10.42.0.1:3000/usersm/":"https://imanity.herokuapp.com/usersm/"
}



const reducer =(state=Userdetails,action)=>{
  switch (action.type) {
    case "adduser":
      state={
        ...state,
        user:action.payload
      }
    break;
    case "informationforward":
      state={
        ...state,
      }
      state[action.payload.to] ={ inputavailable:true,
          information:action.payload.info
          }
    break;
    case "informationRecieved":
      state[action.payload].inputavailable=false

    break;
    case "contactadded":
      state={
        ...state,
        contact:action.payload,
          }
    break;
    case "Logout":
      delete state.user;
      state={
        ...state
      };

    break;
    case "MessageUp":
      state={
        ...state,
        Message:action.payload,
          }
    break;
    case "Messageadd":
      state={
        ...state
          }
          if(state.Message){
            if(!(state.Message)[action.payload.name]){
              (state.Message)[action.payload.name]=[]
            }
            (state.Message)[action.payload.name].unshift(action.payload.data);
          }
    break;
    case "DataAdd":

      state={
        ...state
          }
            state[action.payload.name]=action.payload.data;

    break;
    case "Addpost":
    fetch(url+action.payload.url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(action.payload.data)
      }).then(function(res){ return res.json(); }).then(function(data){
        state={
          ...state
            }
            state[action.payload.url]=data;
      })
    break;
    case "Addget":

    fetch(url+action.payload).then(function(res){ return res.json(); }).then(function(data){
        state={
          ...state
            }
            state[action.payload]=data;

      })
    break;

    }
  return state;
}
export default reducer ;
