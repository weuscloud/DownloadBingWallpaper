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

(function () {
    'use strict';
    let keyMap = new Map()
    window.addEventListener("load", function () {

        if (getBingTargetImg()) {
            start()
        }
    })
    function getBingTargetImg() {
        try {
            return document.getElementsByClassName("img_cont")[0]
        } catch (e) {
            throw("getBingTargetImg-DOM中没有目标元素img_cont")
        }
    }
    function debounce(fn, ms) {
        let timer
        if (typeof
            fn !== "function" &&
            typeof ms !== "number") {
            return () => {
                console.log("[wrong arguments detected] --debounce")
            }
        }

        return function task(...args) {

            if (!timer) {
                fn(...args)
                timer = window.setTimeout(() => {
                    timer = null
                }, ms)
            }
        }
    }
    function start() {
        keyMap.set("F9", download)
        window.addEventListener("keyup", debounce((e) => {
            let f = keyMap.get(e.code)
            if (typeof f === "function") {
                f()
            }
        }, 1000))
    }
    function download() {
    
        getIMG(getImgURL()).then((data) => {
            save(data)
        })
    }
    function getImgURL() {
        let url
        let imgStr=getBingTargetImg().style.backgroundImage
        //let imgStr = 'url("https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'
        //let imgStr='url("/th?id=OHR.Godafoss_ZH-CN9460037606_1920x1080.jpg&rf=LaDigue_1920x1080.jpg")'

        let rawURL = imgStr.match(/^url\("(\S*)"\)/)
        if (!rawURL) throw ("很抱歉，似乎没有办法提取URL");

        url = rawURL[1] || "";

        if (url.match(/^https?\S*\.jpg/)) {
            return url;
        }//'https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'
        let URLhead = 'https://s.cn.bing.net'
        url = URLhead + url;
        return url
    }
    function getIMG(url) {
        //img对象，file对象，base64，canvas对象相互转换以及图片压缩
        //https://www.cnblogs.com/lwxiao/p/10519617.html
        return new Promise(r => {
            fetch(url).then((res) => {
                res.arrayBuffer().then((data) => {
                    let type = "image/*"
                    let blob = new Blob([data], { type })
                    r(blob)
                })
            })
        })
    }
    function getImgName() {
        let imgStr = getImgURL()
        //let imgStr='https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'

        let res = imgStr.match(/^\S+id=(\S+)&\S+/)

        let name = res?.[1]
        if (!name) throw ("getImgName-failed!")
        return name
    }
    function save(fileObject) {
        var urlObject = window.URL || window.webkitURL || window;
        var save_link = document.createElement("a");

        save_link['href'] = urlObject.createObjectURL(fileObject);
        save_link['download'] = getImgName();
        save_link.click();
    }
})();