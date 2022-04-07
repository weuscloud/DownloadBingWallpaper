// ==UserScript==
// @name         微软壁纸下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cn.bing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let bingTargetImg
    window.addEventListener("load",function(){
        bingTargetImg= document.getElementsByClassName("img_cont")[0]
        if(bingTargetImg){
            start()
        }
    })
    function start(){
     let url=getImgURL()
     getIMG(url).then((data)=>{
        save(data)
     }) 
    }
    function getImgURL(){
       let imgStr=bingTargetImg.style.backgroundImage
       //let imgStr='url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
       let reg=/"(https?:\/\/[\w.]+\/?\S*)"/
       let res=reg.exec(imgStr)
       let url=res?.[1]||""
       return url
    }
    function getIMG(url){
       //img对象，file对象，base64，canvas对象相互转换以及图片压缩
       //https://www.cnblogs.com/lwxiao/p/10519617.html
      return new Promise(r=>{
        fetch(url).then((res)=>{
            res.arrayBuffer().then((data)=>{
                let type="imgage/*"
                let blob=new Blob([data],{type})
                r(blob)
            })
        })
    })
   }

    function save(fileObject){
        var urlObject = window.URL || window.webkitURL || window;
            var save_link = document.createElement("a");

            save_link['href'] = urlObject.createObjectURL(fileObject);
            save_link['download'] = readerConfig.productName + ".zip";
            save_link.click();
    }
})();