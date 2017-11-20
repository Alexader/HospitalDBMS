$(document).ready(function() {
    $('.NormalUser').hide();
    $("input[name='gridRadios']").change(function() {
        var option = $("input[name='gridRadios']:checked").val();
        switch(option) {
            case 'admin':
                $('.NormalUser').hide();
                $('.admin').show();
                break;
            case 'patient':
            case 'doctor':
                $('.admin').hide();
                $('.NormalUser').show();
        }
    })
})