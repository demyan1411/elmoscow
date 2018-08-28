import 'babel-polyfill'
import $ from 'jquery'
import 'bootstrap'

import './assets/scss/app.scss'

window.$ = window.jQuery = $

require('./jquery.fancybox')

// import Vue from 'vue'
// import axios from 'axios'
// import jquery from './jquery'
// import inputFile from './input-file'
// import YaMap from './YaMap.vue'
// import App from './App'
// // import router from './router'
//
// Vue.config.productionTip = false
//
// /* eslint-disable no-new */

// import 'slick-carousel/slick/slick.css'
// import './awesomeicons.font'

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

    // $('.submenu > li').matchHeight()
})
// import 'bootstrap/js/dist/dropdown'
// import 'bootstrap/js/dist/collapse'

// import 'bootstrap/js/dist/util'
// import 'bootstrap/js/dist/tooltip'

// import './switcher'

// import Slick from 'vue-slick'
//
// Vue.component('slick', Slick)
//
// new Vue({
//     el: '#app',
//     components: {
//         YaMap: Boolean(document.getElementsByTagName(' ya-map')) ? YaMap : null
//     },
//     mixins: [
//         jquery,
//         inputFile
//     ],
//     data() {
//         return {
//             switcherUrl: '/ajax/index_discussions.php',
//             // themeListUrl: '/ajax/index_discussions.php?type=theme_list',
//             discussionsPollsActiveTag: 'Все разделы',
//             discussionsPollsActiveType: 'discussions',
//             disscussionsPolls: '',
//             isDiscussionsPollsStarted: true,
//             themeList: [],
//             signUpForm: 'user'
//         }
//     },
//
//     watch: {
//         discussionsPollsActiveTag() {
//             this.switchDiscussionsPolls()
//         },
//
//         discussionsPollsActiveType() {
//             this.switchDiscussionsPolls()
//         }
//     },
//
//     created() {
//         axios.get(this.switcherUrl + '?type=theme_list')
//             .then(res => {
//                 this.themeList = res.data
//             })
//     },
//
//     // mounted() {
//     //
//     // },
//     //
//     // computed: {
//     //     // bigSliderSlides() {
//     //     //     return this.$refs.bigSlider ? : []
//     //     // }
//     // },
//
//     methods: {
//         switchDiscussionsPolls(type) {
//             let tag = encodeURIComponent(this.discussionsPollsActiveTag)
//             axios.get(`${this.switcherUrl}?type=${this.discussionsPollsActiveType}&tag=${tag}`)
//                 .then(res => {
//                     this.isDiscussionsPollsStarted = false
//                     this.disscussionsPolls = res.data
//                 })
//         },
//
//         changeData(data) {
//             let name = Object.keys(data)[0]
//             this[name] = data[name]
//         }
//     }
// })
