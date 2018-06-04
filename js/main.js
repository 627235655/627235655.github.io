$(document).ready(function() {

    $('a.blog-button').click(function() {
        if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
        currentWidth = $('.panel-cover').width();
        $('.panel-cover').addClass('animated panel-cover--collapsed slideInLeft');
        $('.content-wrapper').addClass('animated slideInLeft');
    });

    if (window.location.hash && window.location.hash == "#blog") {
        $('.panel-cover').addClass('panel-cover--collapsed');
    }

    if (window.location.pathname != "/") { // if hexo in subdir of site, should change this line
        $('.panel-cover').addClass('panel-cover--collapsed');
    }

    $('.btn-mobile-menu').click(function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
        $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
    });

    $('.navigation-wrapper .blog-button').click(function() {
        // $('.navigation-wrapper').toggleClass('visible');
        $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
    });

    // util
    function getRandomNum(max) {
      return Math.floor(Math.random() * max);
    }

    let fnTextPopup = function(arr, options) {
        // arr参数是必须的
        if (!arr || !arr.length) {
            return;
        }
        // 主逻辑
        let len = arr.length;
        document.documentElement.addEventListener('click', function(event) {
            let x = event.pageX,
                y = event.pageY;
            let eleText = document.createElement('span');
            eleText.className = 'text-popup icon icon-heart';
            this.appendChild(eleText);
            // 生成颜色
            let colorTxt = '#';
            for (let i = 0; i < 6; i++) {
              colorTxt += arr[getRandomNum(len)];
            }
            eleText.style.color = colorTxt;
            // 位置
            eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
            eleText.style.top = (y - eleText.clientHeight) + 'px';
            // 动画结束后删除自己
            eleText.addEventListener('animationend', function() {
                eleText.parentNode.removeChild(eleText);
            });
        });
    };

    fnTextPopup([0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']);

});