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
    $('.btn[name="searchButton"]').click(function() {
        if($('input[name="search"]').val().length===0) alert("关键词不能为空");
    })
})