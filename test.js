let imgStr='url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
let reg=/^url\("(https?:\/\/[\w.]+\/?\S*)"\)$/
console.log(reg.exec(imgStr))