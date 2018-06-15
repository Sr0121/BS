
$(document).ready(function () {
    $("#head").load('./head.html');
})

$(document).ready(function () {
    $('#word_add_confirm').click(function () {
        var word = $("input[name='word_add_word']").val();
        var translation = $("input[name='word_add_translation']").val();

        if(word.length == 0){
            $("input[name='word_add_word']").val("");
            $("input[name='word_add_word']").attr("placeholder", "单词不能为空");
            $("input[name='word_add_translation']").val("");
            $("input[name='word_add_translation']").attr("placeholder", "释义不能为空");
        }

        else if(translation.length == 0){
            $("input[name='word_add_translation']").val("");
            $("input[name='word_add_translation']").attr("placeholder", "释义不能为空");
        }

        else {
            $.ajax({
                url: '/wordbook/check', type: 'post', dataType: 'json', data: $('#a').serialize(), async: false, success: function (data) {
                    if(data.state != "SUCCESS"){
                        $(location).attr('href', './sign_in');
                    }
                    else{
                        if(data.in_list == true){
                            $("input[name='word_add_translation']").val("");
                            $("input[name='word_add_translation']").attr("placeholder", "该词已在单词本中");
                        }
                        else{
                            $.ajax({
                                url: '/wordbook/newword', type: 'post', dataType: 'json', data: $('#a').serialize(), async: false, success: function (data) {
                                    if(data == -1){
                                        $(location).attr('href', './sign_in');
                                    }
                                    else{
                                        $(location).attr('href', './wordbook');
                                    }
                                }
                            });
                            $("input[name='word_add_word']").val("");
                            $("input[name='word_add_translation']").val("");
                            $("#word_add_confirm").attr("data-dismiss", "modal");
                        }
                    }
                }
            });
        }
    });
});


$(document).ready(function () {
    $.ajax({url: '/wordbook/list', type:'get', success:function (data) {
        if(data.state == 'SUCCESS') {
            $("#show_table").html(data.html);
            $(".word_flip").click(function(){
                var id = $(this).attr("id");
                $("#panel_"+id).slideToggle("slow");
            });

            $(".word_set").click(function () {
                var word = $(this).attr("id").substr(9);
                $(this).attr("data-toggle", "modal");
                $(this).attr("data-target", "#word_set_model");
                $("#word_set_confirm").attr("name", word);

                $('#word_set_confirm').click(function () {
                    var translation = $("input[name='word_set_translation']").val();

                    if(translation.length == 0){
                        $("input[name='word_set_translation']").val("");
                        $("input[name='word_set_translation']").attr("placeholder", "释义不能为空");
                    }

                    else {
                        $.ajax({
                            url: '/wordbook/set', type: 'post', dataType: 'json', data: {word: word, translation: translation}, async: false, success: function (data) {
                                if(data == -1){
                                    $(location).attr('href', './sign_in');
                                }
                                else{
                                    $(location).attr('href', './wordbook');
                                }
                            }
                        });
                        $("input[name='word_set_translation']").val("");
                        $("#word_set_confirm").attr("data-dismiss", "modal");
                    }});
            });

            $(".word_del").click(function () {
                var word = $(this).attr("id").substr(9);

                $.ajax({url: '/wordbook/del', type:'post', data:{ "word": word}, success:function (data) {
                        if(data.state != 'SUCCESS') {
                            $(location).attr('href', './sign_in');
                        }
                        else{
                            $(location).attr('href', './wordbook');
                        }
                    }});
            });

        }
        else{
            $(location).attr('href', './sign_in');
        }
        }});

});