
$(document).ready(function(){
    $.ajax({url:'/home/info' , type:'get', success:function(data){
        if(data.state === "SUCCESS"){
            $('#home_a').text(data.id);
            if(data.level_4 === 0){
                $('#home_btn_1').text('开始学习');
            }
            else{
                $('#home_btn_1').text('继续学习');
            }
            if(data.level_6 === 0){
                $('#home_btn_2').text('开始学习');
            }
            else{
                $('#home_btn_2').text('继续学习');
            }
            if(data.toefl === 0){
                $('#home_btn_3').text('开始学习');
            }
            else{
                $('#home_btn_3').text('继续学习');
            }
            if(data.IELTS === 0){
                $('#home_btn_4').text('开始学习');
            }
            else{
                $('#home_btn_4').text('继续学习');
            }
        }
        else{
            $(location).attr('href', './sign_in');
        }
    }});
});

$(document).ready(function(){
    $('#home_btn_1').click(function(){
        $(location).attr('href', './quest?id=level_4');
    });
    $('#home_btn_2').click(function(){
        $(location).attr('href', './quest?id=level_6');
    });
    $('#home_btn_3').click(function(){
        $(location).attr('href', './quest?id=toefl');
    });
    $('#home_btn_4').click(function(){
        $(location).attr('href', './quest?id=IELTS');
    });
    $('#home_set_btn_1').click(function () {
        $('#home_btn_learn_1').show();
        $('#home_btn_learn_2').hide();
        $('#home_btn_learn_3').hide();
        $('#home_btn_learn_4').hide();
    });
    $('#home_set_btn_2').click(function () {
        $('#home_btn_learn_1').hide();
        $('#home_btn_learn_2').show();
        $('#home_btn_learn_3').hide();
        $('#home_btn_learn_4').hide();
    });
    $('#home_set_btn_3').click(function () {
        $('#home_btn_learn_1').hide();
        $('#home_btn_learn_2').hide();
        $('#home_btn_learn_3').show();
        $('#home_btn_learn_4').hide();
    });
    $('#home_set_btn_4').click(function () {
        $('#home_btn_learn_1').hide();
        $('#home_btn_learn_2').hide();
        $('#home_btn_learn_3').hide();
        $('#home_btn_learn_4').show();
    });
});

$(document).ready(function(){
    $('#home_btn_learn_1').click(function(){
        var num = $('#home_learn').val();
        var re = /^[0-9]+.?[0-9]*/;
        if(re.test(num) == true && num > 0){
            $.ajax({url:'/home/change', type:'post' , dataType:'json' , data:{"type":"level_4", "num":$('#home_learn').val()} , async:false, success:function(data){
            }});
            $('#home_learn').val("");
        }
        else{
            $('#home_learn').val("");
            $('#home_learn').attr("placeholder", "请输入一个正数");
        }
    });
    $('#home_btn_learn_2').click(function(){
        var num = $('#home_learn').val();
        var re = /^[0-9]+.?[0-9]*/;
        if(re.test(num) == true && num > 0){
            $.ajax({url:'/home/change', type:'post' , dataType:'json' , data:{"type":"level_6", "num":$('#home_learn').val()} , async:false, success:function(data){
                }});
            $('#home_learn').val("");
        }
        else{
            $('#home_learn').val("");
            $('#home_learn').attr("placeholder", "请输入一个正数");
        }
    });
    $('#home_btn_learn_3').click(function(){
        var num = $('#home_learn').val();
        var re = /^[0-9]+.?[0-9]*/;
        if(re.test(num) == true && num > 0){
            $.ajax({url:'/home/change', type:'post' , dataType:'json' , data:{"type":"toefl", "num":$('#home_learn').val()} , async:false, success:function(data){
                }});
            $('#home_learn').val("");
        }
        else{
            $('#home_learn').val("");
            $('#home_learn').attr("placeholder", "请输入一个正数");
        }
    });
    $('#home_btn_learn_4').click(function(){
        var num = $('#home_learn').val();
        var re = /^[0-9]+.?[0-9]*/;
        if(re.test(num) == true && num > 0){
            $.ajax({url:'/home/change', type:'post' , dataType:'json' , data:{"type":"IELTS", "num":$('#home_learn').val()} , async:false, success:function(data){
                }});
            $('#home_learn').val("");
        }
        else{
            $('#home_learn').val("");
            $('#home_learn').attr("placeholder", "请输入一个正数");
        }
    });
});


$(document).ready(function(){

    var progObj = radialIndicator('#indicatorContainer1' , {
        radius: 80,
        barColor: '#87CEEB',
        barWidth: 10,
        initValue: 0,
        roundCorner : true,
        percentage: true,
        displayNumber: false
    });
        
    progObj.animate(30);

    progObj = radialIndicator('#indicatorContainer2' , {
        radius: 80,
        barColor: '#87CEEB',
        barWidth: 10,
        initValue: 0,
        roundCorner : true,
        percentage: true,
        displayNumber: false
    });
        
    progObj.animate(30);

    progObj = radialIndicator('#indicatorContainer3' , {
        radius: 80,
        barColor: '#87CEEB',
        barWidth: 10,
        initValue: 0,
        roundCorner : true,
        percentage: true,
        displayNumber: false
    });
        
    progObj.animate(30);

    progObj = radialIndicator('#indicatorContainer4' , {
        radius: 80,
        barColor: '#87CEEB',
        barWidth: 10,
        initValue: 0,
        roundCorner : true,
        percentage: true,
        displayNumber: false
    });
        
    progObj.animate(30);
});
