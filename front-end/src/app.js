import {messages} from "./messages";
import axios from 'axios'

axios.get('http://127.0.0.1:8080').then((response) => console.log(response))
console.log('App.js loaded')
console.log(messages)