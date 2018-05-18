
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export default class Song {
  constructor ({id, mid, singer, name, desc, albumname, image, duration, songtype, filename, guid, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.desc = desc
    this.albumname = albumname
    this.image = image
    this.duration = duration
    this.songtype = songtype
    this.filename = filename
    this.guid = guid
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }
      })
    })
  }
  // getAudioSrc() {
  //   if (this.url) {
  //     return Promise.resolve(this.url)
  //   }
  //   return new Promise((resolve, reject) => {
  //     getSongVkey(this.mid, this.filename, this.guid).then((res) => {
  //       if (res.code === ERR_OK) {
  //         let srcData = res.data.items[0]
  //         this.url = `http://dl.stream.qqmusic.qq.com/${srcData.filename}?vkey=${srcData.vkey}&guid=${this.guid}&uin=0&fromtag=38`
  //         resolve(this.url)
  //       }
  //     })
  //   })
  // }
}

export function createSong(fromList, songData) {
  let d = new Date()
  let t = d.getUTCMilliseconds()
  let _guid = Math.round(2147483647 * Math.random()) * t % 1e10
  switch (fromList) {
    case 1:
      return new Song({
        id: songData.songid,
        mid: songData.songmid,
        singer: filterSinger(songData.singer),
        name: songData.songname,
        desc: songData.albumdesc,
        albumname: songData.albumname,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.albummid}.jpg?max_age=2592000`,
        duration: songData.interval,
        songtype: songData.songtype,
        filename: `C400${songData.songmid}.m4a`,
        guid: _guid,
        url: `http://ws.stream.qqmusic.qq.com/C100${songData.songmid}.m4a?fromtag=0&guid=${_guid}`
      })
    case 2:
      return new Song({
        id: songData.id,
        mid: songData.mid,
        singer: songData.singer,
        name: songData.name,
        desc: songData.title,
        albumname: songData.album.name,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.album.mid}.jpg?max_age=2592000`,
        duration: songData.interval,
        songtype: songData.songtype,
        filename: `C400${songData.mid}.m4a`,
        guid: _guid,
        url: `http://ws.stream.qqmusic.qq.com/C100${songData.songmid}.m4a?fromtag=0&guid=${_guid}`
      })
  }
}
