import io from 'socket.io-client';
import request from '../utils/request';

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 获取信息
const MSG_RECEIVE = 'MSG_RECEIVE';
// 标示已读
const MSG_READ = 'MSG_READ';
// 链接断开
const MSG_DISCONNECT = 'MSG_DISCONNECT';

const socket = io('ws://39.108.138.156:3000');
socket.on('disconnect', res => {
  console.log(res);
});

const initState = {
  messages: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      const {users, messages} = action.payload;
      return {
        ...state,
        messages,
        users,
        unread: messages.filter(v => !v.read && action.payload.userId === v.to).length,
      };
    default:
      return state
  }
}

// // 获取聊天列表
// export function getMsgList(params) {
//   return (dispatch, getState) => {
//     request
//       .get('/user/messageList', params)
//       .then(res => {
//         const userId = getState().user._id;
//         let payload = res.data;
//         payload.userId = userId;
//         dispatch({type: MSG_LIST, payload})
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// }

// 发送信息
export function sendMsg({from, to, content}) {
  return dispatch => {
    socket.emit('chatMessageFromClient', {from, to, content})
  }
}

// 接受信息
export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on('chatMessageFromServer', data => {
      console.log(data);
      dispatch({
        type: MSG_RECEIVE,
        payload: data,
        userId: getState().user._id
      })
    });
  }
}

// // 处理断开链接
// export function onDisconnect() {
//   return dispatch => {
//     socket.on('disconnect', res => {
//       console.log(res);
//     });
//   }
// }
//
// export function readMsg(from) {
//   return (dispatch, getState) => {
//     const userId = getState().user._id;
//     request.post(`/user/readMsg`, {
//       from
//     }).then(data => {
//       dispatch({
//         type: MSG_READ,
//         payload: {
//           userId,
//           from,
//           num: data.num
//         }
//       })
//     }).catch(err => {
//
//     })
//   }
// }