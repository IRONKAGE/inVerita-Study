$('form .message a').on('click', e => {
    e.preventDefault();
    if($('.login:visible').length > 0) {
        $('.login').css('display','none');
        $('.register').css('display','block');
    } else {
        $('.register').css('display','none');
        $('.login').css('display','block');
    }
});

function response (data) {
    let resp = data.responseText;
    try {
        if (data.message != void (0)) {
            resp = data.message;
        } else {
            resp = JSON.parse(data.responseText);
            resp = resp.message;
        }
    } catch (e) {}
    return resp;
}

$('form').on('submit', e => {
    e.preventDefault();
    let value = $(e.target).attr('class');
    let selector = '.' + value;
    let username = $(selector + ' [name=username]').val();
    let password = $(selector + ' [name=password]').val();
    $.ajax({
        url: '/' + value,
        type: 'POST',
        data: {
            username: username,
            password: password
        },
        beforeSend: () => {
            $(selector + ' button').prop('disabled', true);
        },
        success: (res) => {
            location.reload();
        },
        error: (res) => {
            alert(response(res));
        },
        complete: () => {
            $(selector + ' button').prop('disabled', false);
        }
    })
});