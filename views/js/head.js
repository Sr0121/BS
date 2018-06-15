
$(document).ready(function(){
    $.ajax({url:'/home/info' , type:'get', success:function(data){
            if(data.state === "SUCCESS"){
                $("#home_a").text(data.user_name);
                $("#head_name").text(data.user_name);
                $("#head_img").attr('src', '/icon/'+data.user_icon);
            }
            else{
                $(location).attr('href', './sign_in');
            }
        }});
});

$(document).ready(function () {
    $("#head_modify_password").click(function () {
        $("input[name='password']").val("");
        $("input[name='password_confirm']").val("");
        $("input[name='password']").attr("placeholder", "请输入密码");
        $("input[name='password_confirm']").attr("placeholder", "请再次输入密码");
        $("#head_password_form").slideToggle();
    });
    $("#head_name").click(function () {
        $("input[name='user_name']").val("");
        $("input[name='user_name']").attr("placeholder", "请更改用户名");
        $("#head_user_name_form").slideToggle();
        $("#head_modify_password").toggle();
    });
    $("#head_set").click(function () {
        $("#head_password_form").hide();
        $("#head_user_name_form").hide();
        $("input[name='submit']").hide();
        $("#head_modify_password").show();
    });
    $("#head_quit").click(function () {
       $.ajax({url:'/head/quit' , type:'post'});
    });
});

$(document).ready(function(){
    $("#head_passwd_submit").click(function () {
        var passwd = $("input[name='password']").val();
        var passwd_confirm = $("input[name='password_confirm']").val();

        if (passwd.length < 6) {
            $("input[name='password']").val("");
            $("input[name='password']").attr("class", "form-control input_border change");
            $("input[name='password']").attr("placeholder", "密码不得小于6位");
        }
        else if (passwd != passwd_confirm) {
            $("input[name='password_confirm']").val("");
            $("input[name='password_confirm']").attr("class", "form-control input_border change");
            $("input[name='password_confirm']").attr("placeholder", "输入的密码不一致");
        }
        else {
            $.ajax({url:'/head/set' , type:'post', data: { password: passwd_confirm}, success:function(data){
                    if(data.state === "SUCCESS"){
                        $("#head_password_form").slideToggle();
                        $("#head_modify_success").slideToggle(setTimeout(function(){
                            $("#head_modify_success").slideToggle()}, 3000));
                    }
                    else{
                        $(location).attr('href', './sign_in');
                    }
                }});
        }
    })
});

$(document).ready(function(){
    $("#head_user_name_submit").click(function () {
        var user_name = $("input[name='user_name']").val();

        if (user_name.length == 0) {
            $("input[name='user_name']").val("");
            $("input[name='user_name']").attr("class", "form-control input_border change");
            $("input[name='user_name']").attr("placeholder", "密码不得小于6位");
        }
        else {
            $.ajax({url:'/head/set_user_name' , type:'post', data: {name: user_name}, success:function(data){
                    $("#home_a").text(user_name);
                    $("#head_name").text(user_name);
                    if(data.state === "SUCCESS"){
                        $("#head_user_name_form").slideToggle();
                        $("#head_modify_password").toggle();
                    }
                    else{
                        $(location).attr('href', './sign_in');
                    }
                }});
        }
    })
});

$(document).ready(function () {
    $("#head_img").click(function () {
       $("input[name='file']").click();
    });
    $("input[name='file']").change(function () {
        if($("input[name='file']").val()!=undefined){
            $("input[name='submit']").show();
        }
    });
});