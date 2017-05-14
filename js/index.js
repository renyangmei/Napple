/**
 * Created by Administrator on 2017/3/17.
 */
$(function(){
    var flag=true;
    var heights2=$(document.body).height();
    window.onresize=function(){
        var heights=$(window).height();
        var widths=$(window).width();
        $(".ac_list").css("height",heights);
        if(widths>765){
            $("#ac_nav").css({"height":48,"maxHeight":48,"top":0,"background":"rgba(0,0,0,0.8)"})
            $(".ac_list").hide();
            $(".line1").css("transform","translate(0,0) rotate(0deg)");
            $(".line1").css("transition","transform -0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99) 1s");
            $(".line2").css("transform","translate(0,0) rotate(0deg)");
            $(".line2").css("transition","transform -0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99) 1s");
            $(".ac_bg").css("transform","translateX(0)");
            $(".ac_bg").css("transition","transform 0.25s 0.55s ease-out");
            flag=true;
        }
    }
    window.onresize();
    //小屏导航点击与不点击效果
    $(".small .line").click(function(){
        if(flag){
            $(".line1").css("transform","translate(0,7px) rotate(45deg)");
            $(".line1").css("transition","transform -0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99) 1s");
            $(".line2").css("transform","translate(0,-3px) rotate(-45deg)");
            $(".line2").css("transition","transform -0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99) 1s");
            $(".ac_bg").css("transform","translateX(200%)");
            $(".ac_bg").css("transition","transform 0.55s 0.25s ease-out");
            $("#ac_nav").css({"height":heights2,"maxHeight":"none","top":-40,"background":"#000"});
            $("body").css("overflow","hidden");
            flag=false;
        }else{
            $(".line1").css("transform","translate(0,0) rotate(0deg)");
            $(".line1").css("transition","transform -0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99) 1s");
            $(".line2").css("transform","translate(0,0) rotate(0deg)");
            $(".line2").css("transition","transform -0.25s cubic-bezier(0.4, 0.01, 0.165, 0.99) 1s");
            $(".ac_bg").css("transform","translateX(0)");
            $(".ac_bg").css("transition","transform 0.25s 0.55s ease-out");
            $("#ac_nav").css({"background":"rgba(0,0,0,0.8)","height":48,"maxHeight":48,"top":0})
            $("body").css("overflow","auto");
            flag=true;
        }
        $(".ac_list").slideToggle();
    })


    //轮播图

    var t1,t2;
    var currentIndex=0;
    var nextIndex=0;
    var currentTime=0;
    var banner_flag=true;
    t1=setInterval(move,3000);
    t2=setInterval(move1,50);
    window.onblur=function () {
        clearInterval(t1);
        clearInterval(t2);
    }
    window.onfocus=function () {
        t1=setInterval(move,3000);
        t2=setInterval(move1,50);
    }
    function move(type) {
        var type=type||"left"; //设置轮播朝哪个方向走
        if(type=="left"){
            nextIndex=currentIndex+1;
            if(nextIndex>$(".gallery_slide_wrapper a").length-1){
                nextIndex=0;
                banner_flag=false;  //如果大于图片数量的长度，则让开关为FALSE。
            }
            $(".gallery_slide_wrapper a").eq(currentIndex).children().eq(0).animate({width:"90%",height:"90%"},1000).end().end().css("z-index","0");

            $(".gallery_slide_wrapper a").eq(nextIndex).children().eq(0).animate({width:"100%",height:"100%"}).end().end().animate({left:"0%"},1000,function () {

                $(".gallery_slide_wrapper a").eq(currentIndex).animate({left:"100%"});
                currentIndex=nextIndex;
                currentTime=0;
                banner_flag=true;
            }).css("z-index",2);
        }else if(type=="right"){
            nextIndex=currentIndex-1;
            if(nextIndex<0){
                nextIndex=$(".gallery_slide_wrapper a").length-1;
            }
            $(".gallery_slide_wrapper a").eq(currentIndex).animate({left:"100%"},1000).css("z-index","2");//设置当前图片层级为2
            $(".gallery_slide_wrapper a").eq(nextIndex).css({left:"0%"}).children().eq(0).css({width:"90%",height:"90%"}).animate({width:"100%",height:"100%"},1000,function () {
                $(".gallery_slide_wrapper a").eq(currentIndex).css("z-index","0");//当下一个完成时，设置当前图片的层级为0;
                currentIndex=nextIndex;
            });
            // $(".gallery-item").eq(currentIndex).animate({left:"100%"})

            // currentTime=0;
            // banner_flag=true;
            // });
        }

    }
    /*进度条*/
    function move1() {
        if(banner_flag) {
            currentTime += 50;
            var pro = currentTime / 3000;
            if (pro > 1) {
                pro = 1;
            }
            $(".circle_progress").eq(currentIndex).css("width", pro * 100 + "%");
        }else{
            $(".circle_progress").css("width","0%"); //清除进度条
        }
    }

    /*轮播图点击点*/
    $(".tablist li").on("click",function () {
        nextIndex=$(this).index();
        console.log(nextIndex,currentIndex);
        stop();
    })
    /*左右按钮*/
    $(".arrow_pre").bind("click",function () {
        stop();
        $(".circle_progress").css("width","0%");
        move("left");
        $(".circle_progress").eq(nextIndex).css("width","100%");
    })
    $(".arrow_next").on("click",function () {
        stop();
        $(".circle_progress").css("width","0%");
        move("right");
        $(".circle_progress").eq(nextIndex).css("width","100%");
    })



    //停止进度条与轮播
    function stop() {
        clearInterval(t2);
        clearInterval(t1);

        /*设置点击进度条后的样式*/
        $(".circle_progress").css("width","0%").eq(nextIndex).css("width","100%");
        if(nextIndex>currentIndex){
            $(".gallery_slide_wrapper a").eq(currentIndex).children().eq(0).animate({width:"90%",height:"90%"},1000).end().end().css("z-index","0");

            $(".gallery_slide_wrapper a").eq(nextIndex).children().eq(0).animate({width:"100%",height:"100%"}).end().end().animate({left:"0%"},1000,function () {

                $(".gallery_slide_wrapper a").eq(currentIndex).animate({left:"100%"})
                currentIndex=nextIndex;
                currentTime=0;
                banner_flag=true;
            }).css("z-index",2);
        }else if(nextIndex<currentIndex){
            $(".gallery_slide_wrapper a").eq(currentIndex).animate({left:"100%"},1000).css("z-index","0");
            $(".gallery_slide_wrapper a").eq(nextIndex).css({left:"0%"}).children().eq(0).css({width:"90%",height:"90%"}).animate({width:"100%",height:"100%"},1000,function () {
                currentIndex=nextIndex;
            }).css("z-index",2);
        }

    }



    //底部
    $("h3").click(function(){
        $(this).toggleClass("special");  //操作伪类元素
        $(".click_list").eq($("h3").index(this)).slideToggle();
    })

})
