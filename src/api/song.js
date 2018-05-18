import axios from 'axios'
import {commonParams} from './config'

// 获取歌词
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 2001751543,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取音乐 audio 资源url的参数 vkey
export function getSongVkey(musicid, filename, guid) {
  let url = 'api/getSongVkey'
  let data = {
    songmid: musicid,
    g_tk: 2001751543,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    filename: filename,
    guid: guid
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}