$(document).ready(function () {
    $('#name,#email,#phone,#message').on('input click', function () {
        $(this).removeClass('error_input');
        $('#error_message').hide();
    });

    $('#contact_form').on('submit', function (e) {
        e.preventDefault();

        var form = this;
        var fields = ['#name', '#email', '#phone', '#message'];

        fields.forEach(function (selector) {
            $(selector).val($.trim($(selector).val()));
        });

        $('#success_message').hide();
        $('#error_message').hide();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var error = false;
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var message = $('#message').val();

        if (name.length === 0) {
            error = true;
            $('#name').addClass('error_input');
        }
        if (email.length === 0 || email.indexOf('@') === -1) {
            error = true;
            $('#email').addClass('error_input');
        }
        if (phone.length === 0) {
            error = true;
            $('#phone').addClass('error_input');
        }
        if (message.length === 0) {
            error = true;
            $('#message').addClass('error_input');
        }

        if (error) {
            $('#error_message').text('Veuillez remplir tous les champs obligatoires.').fadeIn(500);
            return;
        }

        $('#send_message').attr({ disabled: 'true', value: 'Envoi en cours...' });

        $.post('contact.php', $('#contact_form').serialize(), function (result) {
            if ($.trim(result) === 'sent') {
                $('#contact_form').find('.field-set, #submit, .g-recaptcha').remove();
                $('#success_message').fadeIn(500);
            } else {
                $('#error_message').fadeIn(500);
                $('#send_message').removeAttr('disabled').attr('value', 'Envoyer le Message');
            }
        }).fail(function () {
            $('#error_message').fadeIn(500);
            $('#send_message').removeAttr('disabled').attr('value', 'Envoyer le Message');
        });
    });
});
