

$(function() {
    var timer = null;
    var value = 100;//timebar %數
    var classNumber = 1;//第幾課
    var testWordNumber = -1;
    var testWordPic =[];
    var count=0;// count該堂課有多少單字
    var score = 0;
    var controlStart=0;
    

// cal timebar reduce time
    function cals(){
      // console.log(value++);
      // $(".timecals").css("width",timebarWidth-8);
      var TotalTime = $('.timeInput').val();
      var reduceTime = 100/TotalTime;
      // console.log(reduceTime);
      $(".timecals").css("width",value+"%");
      value=value-reduceTime;
      // console.log(value);
      if (value<0){
        alert("時間到!!!!");
        restart()
      }
    };

// check number is diff
    function randomNumber(limit){
      var arr =[];
      // 給足夠數量數值到陣列裡面
      for(var i =0;i<limit;i++){
          arr.push(i);
      }

      arr.sort(
        function(){ 
            return Math.random() - 0.5; 
        }
      );
      return arr;
    }

//radom picture 
    function showPic(){
      $.ajax({
        // url: "data.json",
        url: "data_name_new.json",
        type: "GET",
        dataType: "json",
        success: function(Jdata) {
          // alert("SUCCESS!!!");
          // console.log(Jdata[0][0]);
          // var test ="."+"//course//1/August.jpg";
          // push number limit and get random array
          var getArray = [];
          // 把classNumber減一，原因是json檔案從0開始，對應不到實際課程名稱

          var classNumber = $('.classInput').val(); 
          classNumber = classNumber-1;
          
///////////////////////////////
          // count=0;//每次都要歸0不然重複壓會往上跑
          
          // console.log(Object.keys(Jdata[classNumber]).length)
          // $.each(Jdata[classNumber], function(index,val) {
          //   count++;
          // }); 
          

          getArray = randomNumber(Object.keys(Jdata[classNumber]).length);
          console.log("getArray:"+getArray);

          // console.log("classNumber:"+classNumber+" "+"getArray:"+getArray[0])
          // console.log("show pic :"+"."+Jdata[classNumber][getArray[0]]['path'])
          
          // var s= "./course/1/sky.jpg";
          // $('.v1').css("background-image","url("+s+")");


          // post pic
          //for(var i=0;i<count;i++){
          // var s1,s2,s3,s4,s5,s6,s7,s8;
            // s1 = "."+Jdata[classNumber][getArray[0]]['path'];
            // s2 = "."+Jdata[classNumber][getArray[1]]['path']
            
          // for (var i =0 ;i<8;i++){
          //   console.log(Jdata[classNumber][getArray[i]]['path'])
          // }

          $('.v1').css("background-image","url("+"."+Jdata[classNumber][getArray[0]]['path']+")");
          console.log(".v1"+Jdata[classNumber][getArray[0]]['path'])
          $('.v2').css("background-image","url("+"."+Jdata[classNumber][getArray[1]]['path']+")");
          console.log(".v2"+Jdata[classNumber][getArray[1]]['path'])
          $('.v3').css("background-image","url("+"."+Jdata[classNumber][getArray[2]]['path']+")");
          console.log(".v3"+Jdata[classNumber][getArray[2]]['path'])
          $('.v4').css("background-image","url("+"."+Jdata[classNumber][getArray[3]]['path']+")");
          console.log(".v4"+Jdata[classNumber][getArray[3]]['path'])
          $('.v5').css("background-image","url("+"."+Jdata[classNumber][getArray[4]]['path']+")");
          console.log(".v5"+Jdata[classNumber][getArray[4]]['path'])
          $('.v6').css("background-image","url("+"."+Jdata[classNumber][getArray[5]]['path']+")");
          console.log(".v5"+Jdata[classNumber][getArray[5]]['path'])
          $('.v7').css("background-image","url("+"."+Jdata[classNumber][getArray[6]]['path']+")");
          console.log(".v7"+Jdata[classNumber][getArray[6]]['path'])
          $('.v8').css("background-image","url("+"."+Jdata[classNumber][getArray[7]]['path']+")");
          console.log(".v8"+Jdata[classNumber][getArray[7]]['path'])
          //};

          // post word
          titleNumber = Math.floor(Math.random() * 8);
          // console.log("testNumber:"+testWordNumber);
          $('.practiceVocal').text(Jdata[classNumber][getArray[titleNumber]]['name']);
          console.log(Jdata[classNumber][getArray[titleNumber]]['name'])
          // 給globel
          testWordNumber = getArray[titleNumber];
          testWordPic = getArray;
          // 顯示目前比較數字
          console.log("testNumber:"+testWordNumber);
          console.log("testWordPic:"+testWordPic);


/////////////////////////////
          // classNumber = classNumber+1;
        },
        
        error: function() {
          alert("ERROR!!!");
        }
      });
    };

// button function
    var bgcsnd = new Audio("sound/COUNTDOWN TIMER 30 sec.wav");
    bgcsnd.loop = true; //設定循環播放

    function start() {  
        // var test =;
        if(controlStart==0){
          timer = setInterval(cals, 1000);
          controlStart=1;
        } 
        showPic();
        // var get = randomNumber([1,2,3,4,5,6,7,8,9,10]);
        // console.log("GetValue:"+get);
        // randomNumber(20);
        bgcsnd.play();
    };

    function stop() {
        clearTimeout(timer);
        controlStart=0;
        bgcsnd.pause();
    };
  
    function restart(){
      // restart time bar
      $(".number").text(0);
      $(".timecals").css("width","100%");
      value =100;

      // clean pic
      for(var i=1;i<9;i++){
        var tags = ".v"+i;
        $(tags).css("background-image","url()");
      }
      // stop time
      stop();

      // clean title
      $('.practiceVocal').text('');

      // controlStart reset
      controlStart=0;
      bgcsnd.pause();
    }
  
    function setting(){
      $('.settingView').toggle(200);
      $('.shadow').toggle(200);
      clearTimeout(timer);
      // console.log('setting stop timer');
      bgcsnd.pause();
    }

  //時間往上加
    function timeUp(){
      // var getValue = $('.timerCount').text()  
      var getValue = $('.timeInput').val();
      // console.log(getValue);
      getValue++;
      $('.timeInput').val(getValue);   
      // console.log(getValue);
    };
  
  //時間往下扣
    function timeDown(){
      var getValue = $('.timeInput').val()    
      // console.log(getValue);
      getValue--;
      $('.timeInput').val(getValue);   
      // console.log(getValue);
    };  
  
  
  //課程往上加
    function classUp(){
      var getValue = $('.classInput').val()    
      // console.log(getValue);
      getValue++;
      $('.classInput').val(getValue);
      classNumber=getValue;
      // console.log(getValue);
    };
  //課程往下扣
    function classDown(){
      var getValue = $('.classInput').val()    
      // console.log(getValue);
      if(getValue>1){
        getValue--
      };
      classNumber=getValue;
      $('.classInput').val(getValue);   
      // console.log(getValue);
      // console.log("classNumber:"+classNumber);
    };  
  


///////////////////////////////////////////
    var corsnd = new Audio("sound/short_videoplayback.wav");
    var errsnd = new Audio("sound/short_error.wav");


    function checkScore1(){
      // console.log(1);
      // console.log("testWordPic:"+testWordPic[0]);
      console.log(testWordNumber+" "+testWordPic[0])
      if(testWordNumber==testWordPic[0]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v1').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore2(){
      console.log(testWordNumber+" "+testWordPic[1])
      if(testWordNumber==testWordPic[1]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();


      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v2').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore3(){
      console.log(testWordNumber+" "+testWordPic[2])
      if(testWordNumber==testWordPic[2]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
        
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v3').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore4(){
      console.log(testWordNumber+" "+testWordPic[3])
      if(testWordNumber==testWordPic[3]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
        
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v4').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore5(){
      console.log(testWordNumber+" "+testWordPic[4])
      if(testWordNumber==testWordPic[4]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
        
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v5').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore6(){
      console.log(testWordNumber+" "+testWordPic[5])
      if(testWordNumber==testWordPic[5]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
        
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v6').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore7(){
      console.log(testWordNumber+" "+testWordPic[6])
      if(testWordNumber==testWordPic[6]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
        
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v7').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);
    }
    function checkScore8(){
      console.log(testWordNumber+" "+testWordPic[7])
      if(testWordNumber==testWordPic[7]){
        console.log("Good")
        score = score+10;
        corsnd.play();
        start();
        
      }else{
        console.log("Bad")
        score = score-10;
        errsnd.play();
        $('.v8').css("background-image","url()");
      }
      bgcsnd.play();
      $('.number').text(score);

    }
/////////////////////////////////////////////  
  
//     call click 
    $('.start').bind("click", start); // use .on in jQuery 1.7+
    $('.stop').bind("click", stop);
    $('.restart').bind("click", restart);
    $('.setting').bind("click", setting);
    $('.shadow').bind("click", setting);
  
    $('.timeUp').bind("click",timeUp);
    $('.timeDown').bind("click",timeDown);
  
  
    $('.classUp').bind("click",classUp);
    $('.classDown').bind("click",classDown);




    // check score
    $('.v1').bind("click",checkScore1);
    $('.v2').bind("click",checkScore2);
    $('.v3').bind("click",checkScore3);
    $('.v4').bind("click",checkScore4);
    $('.v5').bind("click",checkScore5);
    $('.v6').bind("click",checkScore6);
    $('.v7').bind("click",checkScore7);
    $('.v8').bind("click",checkScore8);


    // start();  // if you want it to auto-start
});

