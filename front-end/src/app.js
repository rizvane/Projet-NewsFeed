import {messages} from "./messages";
import axios from 'axios'

const webSocket = new WebSocket('ws://localhost:8888')

webSocket.onmessage = (e) => {
    let response = e.data
    console.log(response)

}
