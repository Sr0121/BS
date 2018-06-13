var current_word = new Map();

var get_new_word = function () {
    var index = window.location.href.indexOf("id")
    var dic_num = window.location.href.substring(index + 3);

    $.ajax({
        url: '/quest/dic', type: 'post', dataType: 'json', data: { "data": current_word, "type": dic_num }, async: false, success: function (data) {
            if (data.done !== undefined) {
                $('#quest_word').text(data.word);
                $('#quest_btn_0').html(data.answer_0);
                $('#quest_btn_1').html(data.answer_1);
                $('#quest_btn_2').html(data.answer_2);
                $('#quest_btn_3').html(data.answer_3);
                $('#quest_btn_0').attr("style", "cursor: pointer;");
                $('#quest_btn_1').attr("style", "cursor: pointer;");
                $('#quest_btn_2').attr("style", "cursor: pointer;");
                $('#quest_btn_3').attr("style", "cursor: pointer;");
                $("#record_remain").text(data.done);
                $("#record_learned").text(data.total);
                $("#record_not_reviewed").text(data.review_done);
                $("#record_reviewed").text(data.review_total);
            }
            current_word = data;
        }
    });
}

var judge = function (index, data) {
    if (data.state === "SUCCESS") {
        $("#quest_btn_" + index).attr("style", "cursor: pointer; color:green;");
        $("#record_remain").text(data.done);
        $("#record_learned").text(data.total);
        $("#record_not_reviewed").text(data.review_done);
        $("#record_reviewed").text(data.review_total);
    }
    else {
        $("#quest_btn_" + index).attr("style", "cursor: pointer; color:red;");
        $("#quest_btn_" + current_word.right).attr("style", "cursor: pointer; color:green;");
    }
    current_word = data;
    setTimeout(function () {
        get_new_word();
    }, 2000);
}

$(document).ready(function () {
    get_new_word();
});

$(document).ready(function () {
    $('#quest_btn_0').click(function () {
        $.ajax({
            url: '/quest/ans', type: 'post', dataType: 'json', data: { "data": current_word, "choose": 0 }, async: false, success: function (data) {
                judge(0, data);
            }
        });
    });
    $('#quest_btn_1').click(function () {
        $.ajax({
            url: '/quest/ans', type: 'post', dataType: 'json', data: { "data": current_word, "choose": 1 }, async: false, success: function (data) {
                judge(1, data);
            }
        });
    });
    $('#quest_btn_2').click(function () {
        $.ajax({
            url: '/quest/ans', type: 'post', dataType: 'json', data: { "data": current_word, "choose": 2 }, async: false, success: function (data) {
                judge(2, data);
            }
        });
    });
    $('#quest_btn_3').click(function () {
        // alert(current_word.word);
        $.ajax({
            url: '/quest/ans', type: 'post', dataType: 'json', data: { "data": current_word, "choose": 3 }, async: false, success: function (data) {
                judge(3, data);
            }
        });
    });
});