let imgStr='url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
        let reg=/"https?:\/\/[\w.]+\/?\S*rf=(\S*)"/
        let res=reg.exec(imgStr)
        let url=res?.[1]||""
console.log(reg.exec(imgStr))