function getImgName(){
        //let imgStr=bingTargetImg.style.backgroundImage
        let imgStr='url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
        let reg=/"https?:\/\/[\w.]+\/?\S*id=(\S*)&rf\S*"/
        let res=reg.exec(imgStr)
        let defaultName=new Date().getTime()+".jpg"
        let name=res?.[1]||defaultName
        return name
   }
   console.log(getImgName())