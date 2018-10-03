import 'babel-polyfill'
import $ from 'jquery'
import 'bootstrap'

import './assets/scss/app.scss'

window.$ = window.jQuery = $

require('./jquery.fancybox')
require('./jquery.montage')

$(document).ready(function () {
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            'close'
        ]
    })

    $('.js-scroll').click(function(e) {
        e.preventDefault()
        let id = $(this).attr('href')
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 400)
    })

    $('[data-toggle="tooltip"]').tooltip()

    $('.products-close').on('click', function(e) {
        $(this).closest('.products-item').hide()
    })

    $('.am-container').montage({
        // liquid: false,
        // fillLastRow: true,
        // alternateHeight: true,
        // alternateHeight: true,
        // maxh: 200,
        minh: 50
    })
})
