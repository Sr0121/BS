
$(document).ready(function () {
    $("#head").load('./head.html');
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
            $(location).attr('href', './home');
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
            $(location).attr('href', './home');
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
            $(location).attr('href', './home');
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
            $(location).attr('href', './home');
        }
        else{
            $('#home_learn').val("");
            $('#home_learn').attr("placeholder", "请输入一个正数");
        }
    });
});


$(document).ready(function(){
    $.ajax({url:'/home/info' , type:'get', success:function(data){
        if (data['state'] == 'SUCCESS') {
            $("#home_level_4_total").text(data['level_4_total']);
            $("#home_level_6_total").text(data['level_6_total']);
            $("#home_toefl_total").text(data['toefl_total']);
            $("#home_IELTS_total").text(data['IELTS_total']);
            if(data['level_4']+data['level_4_review_target'] === 0){
                $("#home_level_4_info").text("无计划");
                $("#home_btn_1").attr("disabled", "disabled");
            }
            else{
                $("#home_level_4_info").html("今日学习目标"+(data['level_4'])+"词");
                if(data['level_4'] <= data['level_4_learned']
                    && data['level_4_learned']>0
                    && (data['level_4_review_target'] <= data['level_4_review_learned']
                    || data['level_4_learned'] == data['level_4_total'] - data['level_4_left'])){
                    $("#home_btn_1").attr("disabled", "disabled");
                    $("#home_btn_1_text").text("完成");
                }
            }
            if(data['level_6']+data['level_6_review_target'] === 0){
                $("#home_level_6_info").text("无计划");
                $("#home_btn_2").attr("disabled", "disabled");
            }
            else{
                $("#home_level_6_info").html("今日学习目标"+(data['level_6'])+"词");
                if(data['level_6'] <= data['level_6_learned']
                    && data['level_6_learned']>0
                    && (data['level_6_review_target'] <= data['level_6_review_learned']
                    || data['level_6_learned'] == data['level_6_total'] - data['level_6_left'])){
                    $("#home_btn_2").attr("disabled", "disabled");
                    $("#home_btn_2_text").text("完成");
                }
            }
            if(data['toefl']+data['toefl_review_target'] === 0){
                $("#home_toefl_info").text("无计划");
                $("#home_btn_3").attr("disabled", "disabled");
            }
            else{
                $("#home_toefl_info").html("今日学习目标"+(data['toefl'])+"词");
                if(data['toefl'] <= data['toefl_learned']
                    && data['toefl_learned']>0
                    && (data['toefl_review_target'] <= data['toefl_review_learned']
                    || data['toefl_learned'] == data['toefl_total'] - data['toefl_left'])){
                    $("#home_btn_3").attr("disabled", "disabled");
                    $("#home_btn_3_text").text("完成");
                }
            }
            if(data['IELTS']+data['IELTS_review_target'] === 0){
                $("#home_IELTS_info").text("无计划");
                $("#home_btn_4").attr("disabled", "disabled");
            }
            else{
                $("#home_IELTS_info").html("今日学习目标"+(data['IELTS'])+"词");
                if(data['IELTS'] <= data['IELTS_learned']
                    && data['IELTS_learned']>0
                    && (data['IELTS_review_target'] <= data['IELTS_review_learned']
                    || data['IELTS_learned'] == data['IELTS_total'] - data['IELTS_left'])){
                    $("#home_btn_4").attr("disabled", "disabled");
                    $("#home_btn_4_text").text("完成");
                }
            }

            var progObj = radialIndicator('#indicatorContainer1' , {
                radius: 80,
                barColor: '#87CEEB',
                barWidth: 10,
                initValue: 0,
                roundCorner : true,
                percentage: true,
                displayNumber: false
            });

            var rate= (data['level_4_total']-data['level_4_left'])/data['level_4_total']*100;
            progObj.animate(rate);
            $("#home_rate1").text(rate.toFixed(2)+"%");

            progObj = radialIndicator('#indicatorContainer2' , {
                radius: 80,
                barColor: '#87CEEB',
                barWidth: 10,
                initValue: 0,
                roundCorner : true,
                percentage: true,
                displayNumber: false
            });

            rate= (data['level_6_total']-data['level_6_left'])/data['level_6_total']*100;
            progObj.animate(rate);
            $("#home_rate2").text(rate.toFixed(2)+"%");

            progObj = radialIndicator('#indicatorContainer3' , {
                radius: 80,
                barColor: '#87CEEB',
                barWidth: 10,
                initValue: 0,
                roundCorner : true,
                percentage: true,
                displayNumber: false
            });

            rate= (data['toefl_total']-data['toefl_left'])/data['toefl_total']*100;
            progObj.animate(rate);
            $("#home_rate3").text(rate.toFixed(2)+"%");

            progObj = radialIndicator('#indicatorContainer4' , {
                radius: 80,
                barColor: '#87CEEB',
                barWidth: 10,
                initValue: 0,
                roundCorner : true,
                percentage: true,
                displayNumber: false
            });

            rate= (data['IELTS_total']-data['IELTS_left'])/data['IELTS_total']*100;
            progObj.animate(rate);
            $("#home_rate4").text(rate.toFixed(2)+"%");
        }
        else{
            $(location).attr('href', './sign_in');
        }
    }});

});