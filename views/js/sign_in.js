$(document).ready(function () {
    $('#b').click(function () {
        $("input[name='id']").attr("placeholder", "请输入用户名");
        $("input[name='id']").attr("class", "form-control input_border");
        $("input[name='password']").attr("placeholder", "请输入密码");
        $("input[name='password']").attr("class", "form-control input_border");

        var id = $("input[name='id']").val();
        var passwd = $("input[name='password']").val();
        var valid_id_pwd = /^[a-zA-Z0-9_]{6,16}$/;

        var flag = 0;
        // alert("Value: " + len);
        if (valid_id_pwd.test(id) === false) {
            $("input[name='id']").val("");
            $("input[name='id']").attr("class", "form-control input_border change");
            if (id.length < 6) {
                $("input[name='id']").attr("placeholder", "用户名不得小于6位");
            }
            else {
                $("input[name='id']").attr("placeholder", "用户名只包含a-zA-Z0-9_");
            }
            flag = 1;
        }

        if (passwd.length < 6) {
            $("input[name='password']").val("");
            $("input[name='password']").attr("class", "form-control input_border change");
            $("input[name='password']").attr("placeholder", "用户名不得小于6位");
            flag = 1;
        }
        if (flag === 0) {
            $.ajax({
                url: '/sign_in/si', type: 'post', dataType: 'json', data: $('#a').serialize(), async: false, success: function (data) {
                    // $('p').html(data.id);
                    if (data.state === 'SUCCESS') {
                        $(location).attr('href', './home');
                    }
                    else {
                        alert('用户名或密码错误');
                    }
                }
            });
        }

    });
})

$(document).ready(function () {
    $('#c').click(function () {
        $(location).attr('href', './sign_up');
    });
});