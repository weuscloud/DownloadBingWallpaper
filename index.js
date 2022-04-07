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
     
    }
    function getImgURL(){
       let imgStr=bingTargetImg.style.backgroundImage
       //let imgStr='url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
       let reg=/"(https?:\/\/[\w.]+\/?\S*)"/
       let res=reg.exec(imgStr)
       if(res){
        let url=res?.[1]||""
        return url
       }
    }
})();