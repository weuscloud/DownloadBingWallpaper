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
    let keyMap=new Map()
    window.addEventListener("load",function(){
    
        if(getBingTargetImg()){
            start()
        }
    })
    function getBingTargetImg(){
        try{
          return  document.getElementsByClassName("img_cont")[0]
        }catch(e){
            console.error("DOM中没有目标元素")
        }
    }
    function debounce(fn,ms){
        let timer
        if(typeof 
            fn!=="function"&&
            typeof ms!=="number"){
                return ()=>{
                    console.log("[wrong arguments detected] --debounce")
                }
        }

        return function task(...args){
            
            if(!timer){
                fn(...args)
                timer=window.setTimeout(()=>{
                    timer=null
                },ms)
            }
        }
    }
    function start(){
     keyMap.set("F9",download)
     window.addEventListener("keyup",debounce((e)=>{
        let f=keyMap.get(e.code)
        if(typeof f==="function"){
            f()
        }
     },1000)) 
    }
    function download(){
        let url=getImgURL()
            getIMG(url).then((data)=>{
            save(data)
            })
    }
    function getImgURL(){
       let imgStr=getBingTargetImg().style.backgroundImage
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
   function getImgName(){
        let imgStr=getBingTargetImg().style.backgroundImage
        //let imgStr='url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
        let reg=/"https?:\/\/[\w.]+\/?\S*id=(\S*)&rf\S*"/
        let res=reg.exec(imgStr)
        let defaultName=new Date().getTime()+".jpg"
        let name=res?.[1]||defaultName
        return name
   }
    function save(fileObject){
        var urlObject = window.URL || window.webkitURL || window;
            var save_link = document.createElement("a");

            save_link['href'] = urlObject.createObjectURL(fileObject);
            save_link['download'] = getImgName();
            save_link.click();
    }
})();