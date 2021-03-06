// util
// 获取随机数字
function getRandomNum(max = 1) {
    return Math.floor(Math.random() * max);
}

// 获取随机颜色
function getRandomRGB(opacity = 1) {
    return 'rgba('+(Math.random() * 255)+','+(Math.random() * 255)+','+(Math.random() * 255)+',' + opacity+')';
}

// 气泡
let fnTextPopup = function() {
    // 主逻辑
    document.documentElement.addEventListener('click', function(event) {
        let x = event.pageX,
            y = event.pageY;

        let eleText = document.createElement('i');
        eleText.className = 'text-popup material-icons sidebar-material-icons';
        eleText.innerHTML = 'favorite'
        this.appendChild(eleText);
        // 生成颜色
        eleText.style.color = getRandomRGB(Math.random());
        // 位置
        eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
        eleText.style.top = (y - eleText.clientHeight) + 'px';
        // 动画结束后删除自己
        eleText.addEventListener('animationend', function() {
            eleText.parentNode.removeChild(eleText);
        });
    });
};
fnTextPopup();



// canvas 连线
class Circle {
    //创建对象
    //以一个圆为对象
    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
    //this.r是创建圆的半径，参数越大半径越大
    //this._mx,this._my是移动的距离，参数越大移动
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 2 ;
        this.speed = 1;
        this._mx = Math.random() *  this.speed;
        this._my = Math.random() * this.speed;
        this.move_type = Math.random() > 0.5 ? false : true;
        this.color = '#fff';//'rgba('+(Math.random() * 255)+','+(Math.random() * 255)+','+(Math.random() * 255)+')';

    }

    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆
    //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
    drawCircle(ctx) {
        ctx.beginPath();
        //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
        ctx.arc(this.x, this.y, this.r, 0, 360)
        ctx.closePath();
        ctx.fillStyle = this.color;//'rgba(255, 255, 255, 1)';
        ctx.fill();
    }


    // 圆圈移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x =  this.move_type  ? (this.x + this._mx) : (this.x - this._mx);
        this.y = this.move_type  ? (this.y + this._my) : (this.y - this._my);
    }
}
//鼠标点画圆闪烁变动
// class currentCirle extends Circle {
//     constructor(x, y) {
//         super(x, y)
//     }

//     drawCircle(ctx) {
//         ctx.beginPath();
//         //注释内容为鼠标焦点的地方圆圈半径变化
//         this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
//         // this.r = 5;
//         ctx.arc(this.x, this.y, this.r, 0, 360);
//         ctx.closePath();
//         ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
//         // ctx.fillStyle = '#fff'
//         ctx.fill();

//     }
// }
//更新页面用requestAnimationFrame替代setTimeout
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let w = canvas.width =  document.documentElement.clientWidth;//canvas.offsetWidth;
let h = canvas.height = document.documentElement.clientHeight;//canvas.offsetHeight;
let circles = [];
// let current_circle = new currentCirle(0, 0)

let draw = function () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx);
        for (j = i + 1; j < circles.length; j++) {
            // circles[i].drawLine(ctx, circles[j])
        }
    }
    // if (current_circle.x) {
    //     current_circle.drawCircle(ctx);
    //     for (var k = 1; k < circles.length; k++) {
    //         // current_circle.drawLine(ctx, circles[k])
    //     }
    // }
    requestAnimationFrame(draw)
}

let init = function (num) {
    for (var i = 0; i < num; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw();
}
window.addEventListener('load', init(300));
// window.onmousemove = function (e) {
//     e = e || window.event;
//     current_circle.x = e.clientX;
//     current_circle.y = e.clientY;
// }
// window.onclick = function (e) {
//     e = e || window.event;
//     // current_circle.x = e.clientX;
//     // current_circle.y = e.clientY;
// }
// window.onmouseout = function () {
//     current_circle.x = null;
//     current_circle.y = null;
// };