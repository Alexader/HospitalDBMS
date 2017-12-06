$(document).ready(function () {
    $("input[name='gridRadios']").change(function () {
        var option = $("input[name='gridRadios']:checked").val();
        switch (option) {
            case 'admin':
                $('label[for="inputID"]').text("邀请码");
                break;
            case 'patient':
            case 'doctor':
                $('label[for="inputID"]').text("身份证/工号");
                break;
        }
    })
    //handle data before send to server
    $('form[id="search"]').submit(function (e) {
        //stop submit automatically
        e.preventDefault();
        //forbid post empty key
        if ($('input[name="search"]').val().length === 0) alert("关键词不能为空");
        else {
            var key = $('input[name="search"]').val();
            //choose how to search in the database
            var searchOption = $('#searchOption').val();
            console.log('search clicked');

            var data = {};
            data.key = key;
            data.searchOption = searchOption;
            $.ajax({
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: "http://localhost:3000/search",
                success: function (data) {
                    console.log("success");
                    $('#content').html(data);
                },
                error: function (err) {
                    alert("发送失败");
                }
            })
        }
    })
    //change placeholder with distict option
    $('select[id="searchOption"]').on('change', (function (e) {
        var value = $('select[id="searchOption"] option:selected').text();
        $('input[name="search"]').attr('placeholder', "按" + value + "搜索", );
    }));
    //get user info if click on the avatar
    $('#userInfo').click(function (e) {
        e.preventDefault();
        var data = { userInfo: 'userInfo' };
        $.ajax({
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/user',
            success: function (data) {
                console.log("user info received");
                $('#content').html(data);
            },
            error: function (err) {
                alert(err);
                console.error(err);
                $('#content').html(err);
            },
            complete: function () {
                console.log('completed');
            },
        });
    });

})
$('body').on('click', 'button[name="revise"]', function(e) {
    e.preventDefault();
    $(this).parent().find('input[class="dataRevisable"]').prop("disabled", false);
})
$('body').on('submit', 'form.userData', function(e) {
    e.preventDefault();
    var  data = $(this).serializeArray();
    data.push({
        name: 'userType', 
        value: $(this).closest('.tab').attr("data-tab"),
    });
    var currentForm = $(this);
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/insert',
        data: $.param(data),
        datatype: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(data) {
            console.log("insert to server");
            //insert success or something
            alert("insert to server");
            currentForm.find('input.dataRevisable').prop('disabled', true);
        },
        error: function() {
            alert("insert failed");
        }
    })
});
