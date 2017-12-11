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
//start revising data
$('body').on('click', 'button[name="revise"]', function(e) {
    e.preventDefault();
    $(this).parent().find('input[class="dataRevisable"]').prop("disabled", false);
})
//post revised data to database
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
//post delete message to database
$('body').on('click', 'button[name="delete"]', function(e) {
    e.preventDefault();
    var comfirmation = confirm("once you delete, this can't be reversed! Are you sure to delete?");
    var but = $(this);
    if(comfirmation === true) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/delete',
            data: {
                userType: but.closest('.tab').attr('data-tab'),
                id: but.parent().find('form').children('div').children('input[name="id"]').val(),
            },
            success: function(data) {
                //delete the function
                alert(data.info);
                //remove one record and it is deleted from database
                but.closest('.stacked').remove();
            },
            error: function() {
                alert("there is an error")
            }
        })
    }
})
//show more info
$('body').on('click', 'input[name="more"]', function(e) {
    e.preventDefault();
    var but = $(this);
    if(but.attr("value")===">>收起") {
        but.attr("value", ">>更多");
        $('div.myData').empty();
    } else {
        $.ajax({
                type: 'post', 
                url: 'http://localhost:3000/more',
                datatype: 'json',
                data: {
                    userType: but.closest('.tab').attr('data-tab'),
                    id: but.parent().find('form').children('div').children('input[name="id"]').val(),
                },
                success: function(data) {
                    alert(JSON.stringify(data));
                    $(".myData").append("<div>主治医生:"+data.Name+'</div>');
                    $(".myData").append("<h3>手术治疗:</h3>"+"<p>手术费用："+data.sPrice+"</p>"+"<p>手术地点："+data.Site+"</p>"+"<p>手术时间"+data.Time+"</p>"+'<br>');
                    $(".myData").append("<h3>药物治疗:</h3>"+"<p>药物费用："+data.mPrice+"</p>"+"<p>药物服用要求："+data.Instruction+"</p>"+'<br>');
                    $(".myData").append("<h3>检查项目:</h3>"+"<p>项目名称："+data.Title+"</p>"+"<p>项目费用："+data.ePrice+"</p>"+'<br>');
                    but.attr('value', ">>收起");
                },
                error: function() {
                    console.log("error to query database");
                }
            })
    }
})
