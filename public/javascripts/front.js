$(document).ready(function() {
    $("input[name='gridRadios']").change(function() {
        var option = $("input[name='gridRadios']:checked").val();
        switch(option) {
            case 'admin':
                $('label[for="inputID"]').text("邀请码");
                break;
            case 'patient':
            case 'doctor':
                $('label[for="inputID"]').text("身份证/工号");
                break;
        }
    })
    //forbid sending empty search key
    $('form[id="search"]').submit(function(e) {
        //stop submit automatically
        e.preventDefault();
        if($('input[name="search"]').val().length===0) alert("关键词不能为空");
        else {
            var key = $('input[name="search"]').val();
            
            console.log('search clicked');
            
            var data = {};
            data.key = key;
            $.ajax({
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: "http://localhost:3000/search",
                success: function(data) {
                    console.log("success");
                    $('#content').html(data);
                },
                error: function(err) {
                    alert("发送失败");
                }
            })
        }
    })
    //if you want to do more kind of search
    $('.btn[name="moreSearch"]').click(function(e) {
        
    })
})