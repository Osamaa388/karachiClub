/*  ---------------------------------------------------
  Template Name: Gym
  Description:  Gym Fitness HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Masonary
    $('.gallery').masonry({
        itemSelector: '.gs-item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hs-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*------------------
        Team Slider
    --------------------*/
    $(".ts-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            320: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            }
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".ts_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Image Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Barfiller
    --------------------*/
    $('#bar1').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar2').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar3').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });

    $('.table-controls ul li').on('click', function () {
        var tsfilter = $(this).data('tsfilter');
        $('.table-controls ul li').removeClass('active');
        $(this).addClass('active');

        if (tsfilter == 'all') {
            $('.class-timetable').removeClass('filtering');
            $('.ts-meta').removeClass('show');
        } else {
            $('.class-timetable').addClass('filtering');
        }
        $('.ts-meta').each(function () {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });

})(jQuery);
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});


$(document).ready(function () {

    $('.testimonial-carousel').owlCarousel({

        loop: true,

        margin: 20,

        nav: true,

        dots: true,

        autoplay: true,

        autoplayTimeout: 5000,

        autoplayHoverPause: true,

        smartSpeed: 700,

        navText: [
            '<span>‹</span>',
            '<span>›</span>'
        ],

        responsive: {

            0: {
                items: 1,
                margin: 15
            },

            768: {
                items: 2,
                margin: 20
            },

            992: {
                items: 3,
                margin: 20
            }

        }

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".kc-hero");
    const slides = document.querySelectorAll(".kc-slide");
    const prevBtn = document.querySelector(".kc-prev");
    const nextBtn = document.querySelector(".kc-next");
    const dotsContainer = document.querySelector(".kc-slider-dots");

    let current = 0;
    let timer;

    let touchStartX = 0;
    let touchEndX = 0;


    /* ==========================================
       CREATE DOTS AUTOMATICALLY
    ========================================== */

    slides.forEach(function (_, index) {

        const dot = document.createElement("button");

        dot.className = "kc-slider-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.setAttribute("aria-label", "Go to slide " + (index + 1));

        dot.addEventListener("click", function () {
            goToSlide(index);
            restartSlider();
        });

        dotsContainer.appendChild(dot);

    });


    const dots = document.querySelectorAll(".kc-slider-dot");


    /* ==========================================
       SHOW SLIDE
    ========================================== */

    function goToSlide(index) {

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }


        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        slides[index].classList.add("active");
        dots[index].classList.add("active");


        current = index;

    }


    /* ==========================================
       NEXT
    ========================================== */

    function nextSlide() {
        goToSlide(current + 1);
    }


    /* ==========================================
       PREVIOUS
    ========================================== */

    function previousSlide() {
        goToSlide(current - 1);
    }


    /* ==========================================
       ARROWS
    ========================================== */

    nextBtn.addEventListener("click", function () {

        nextSlide();

        restartSlider();

    });


    prevBtn.addEventListener("click", function () {

        previousSlide();

        restartSlider();

    });


    /* ==========================================
       AUTO SLIDER
    ========================================== */

    function startSlider() {

        timer = setInterval(function () {

            nextSlide();

        }, 5000);

    }


    function restartSlider() {

        clearInterval(timer);

        startSlider();

    }


    /* ==========================================
       MOBILE SWIPE
    ========================================== */

    slider.addEventListener("touchstart", function (e) {

        touchStartX = e.changedTouches[0].screenX;

    }, { passive: true });


    slider.addEventListener("touchend", function (e) {

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    }, { passive: true });


    function handleSwipe() {

        const distance = touchStartX - touchEndX;


        if (Math.abs(distance) < 50) {
            return;
        }


        if (distance > 0) {

            nextSlide();

        } else {

            previousSlide();

        }


        restartSlider();

    }


    /* ==========================================
       DESKTOP KEYBOARD
    ========================================== */

    document.addEventListener("keydown", function (e) {

        if (e.key === "ArrowRight") {

            nextSlide();

            restartSlider();

        }


        if (e.key === "ArrowLeft") {

            previousSlide();

            restartSlider();

        }

    });


    /* ==========================================
       PAUSE WHEN MOUSE OVER
    ========================================== */

    slider.addEventListener("mouseenter", function () {

        clearInterval(timer);

    });


    slider.addEventListener("mouseleave", function () {

        startSlider();

    });


    /* ==========================================
       START
    ========================================== */

    goToSlide(0);

    startSlider();

});

