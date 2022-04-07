function getImgName(){
  let imgStr=getImgURL()
  //let imgStr='https://s.cn.bing.net/th?id=OHR.Malaga_ZH-CN9644862917_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'

  let res=imgStr.match(/^\S+id=(\S+)&\S+/)

  let name=res?.[1]
  if(!name)throw ("getImgName-failed!")
  return name
}
   console.log(getImgName())