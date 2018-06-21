$(document).ready(function () {
    $('#c').click(function () {
        $("input[name='id']").attr("placeholder", "请输入账号");
        $("input[name='id']").attr("class", "form-control input_border");
        $("input[name='password']").attr("placeholder", "请输入密码");
        $("input[name='password']").attr("class", "form-control input_border");
        $("input[name='email']").attr("placeholder", "请输入邮箱");
        $("input[name='email']").attr("class", "form-control input_border");

        var id = $("input[name='id']").val();
        var passwd = $("input[name='password']").val();
        var email = $("input[name='email']").val();
        var valid_id_pwd = /^[a-zA-Z0-9_]{6,16}$/;
        var valid_email = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

        var flag = 0;
        // alert("Value: " + len);
        if (valid_id_pwd.test(id) === false) {
            $("input[name='id']").val("");
            $("input[name='id']").attr("class", "form-control input_border change");
            if (id.length < 6) {
                $("input[name='id']").attr("placeholder", "账号不得小于6位");
            }
            else {
                $("input[name='id']").attr("placeholder", "账号只包含a-zA-Z0-9_");
            }
            flag = 1;
        }

        if (passwd.length < 6) {
            $("input[name='password']").val("");
            $("input[name='password']").attr("class", "form-control input_border change");
            $("input[name='password']").attr("placeholder", "密码不得小于6位");
            flag = 1;
        }

        if (valid_email.test(email) === false) {
            $("input[name='email']").val("");
            $("input[name='email']").attr("class", "form-control input_border change");
            $("input[name='email']").attr("placeholder", "请输入合法邮箱地址");
            flag = 1;
        }

        if (flag === 0) {
            $.ajax({
                url: '/sign_up/si', type: 'post', dataType: 'json', data: $('#a').serialize(), async: false, success: function (data) {
                    if (data.state === 'FAILURE') {
                        $("input[name='id']").val("");
                        $("input[name='id']").attr("class", "form-control input_border change");
                        $("input[name='id']").attr("placeholder", "账号已被使用");
                    }
                    else {
                        $('#myModal').modal();
                    }
                }
            });
        }
    });
})

$(document).ready(function () {
    $('#d').click(function () {
        $(location).attr('href', './sign_in');
    });
});
