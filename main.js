// 选择canvas
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// 自动设置canvas宽度
autoSetCanvasSize(canvas)

// 监听鼠标
listenToMouse(canvas)



var useEraser = false
eraser.onclick = function(){
  useEraser = true
  wrap.className = 'wrap active'
}

paint.onclick = function(){
  useEraser = false
  wrap.className = 'wrap'
}

// 自动设置画板宽度函数
function autoSetCanvasSize(canvas){
  // 设置画板宽度
  setCanvasSize()

  // 监听用户缩放页面宽度事件
  window.onresize = function() {
    setCanvasSize()
  }

  // 设置画板宽度函数
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

//画线函数
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1) //起点
  context.lineTo(x2,y2) //终点
  context.stroke()
  context.closePath()
}

// 监听鼠标函数
function listenToMouse(canvas){
  // 默认关闭画笔
  var using = false
  // 默认点坐标
  var oldPoint = {x:undefined,y:undefined}

  // 鼠标按下事件
  canvas.onmousedown = function(pointer){
    // 获得鼠标指针x,y
    var x = pointer.clientX
    var y = pointer.clientY
    // 开启画笔
    using=true
    if(useEraser){
      context.clearRect(x,y,10,10)
    }else{
      // 点击记录新的点坐标
      oldPoint = {x:x,y:y}
    }
  }

  // 鼠标移动事件
  canvas.onmousemove = function(pointer){
    // 获得鼠标指针x,y
    var x = pointer.clientX
    var y = pointer.clientY
    if(!using){return}
    if(useEraser){
      context.clearRect(x,y,10,10)
    }else{
      // 点击记录旧的点坐标
      var newPoint = {x:x,y:y}
      //画线
      drawLine(oldPoint.x,oldPoint.y,newPoint.x,newPoint.y)
      // 新点代替旧点
      oldPoint = newPoint
    }
  }

  // 鼠标弹起事件
  canvas.onmouseup = function(pointer){
    using = false
  }
}