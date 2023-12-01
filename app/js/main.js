$(function () {
        $('.header__btn').on('click', function () {
            $('.rightside-menu').removeClass('rightside-menu--close')
        });
        $('.rightside-menu__close').on('click', function () {
            $('.rightside-menu').addClass('rightside-menu--close')
        });

        $('.header__btn-menu').on('click', function () {
            $('.menu').toggleClass('menu--open')
        });
        if ($(window).width() < 651) {
            $('.work-path__item--measurements').appendTo($('.work-path__items-box'));
        }

        $('.top__slider').slick({
            dots: true,
            arrows: false,
            fade: true,
            autoplay: true,
        });
        $('.contact-slider').slick({
            slidesToShow: 10,
            slidesToScroll: 10,
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 376,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                    }
                }
            ]
        });
        $('.blog__article-slider').slick({
            prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrowleft">' +
                '<img src="../img/slider-arrow-left.svg" alt=""></button>',
            nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrowright">' +
                '<img src="../img/slider-arrow-right.svg" alt=""></button>',
            dots: false,
            arrows: true,
        });
        let mixer = document.querySelector('.gallery__inner');
        if (mixer) {
            mixer = mixitup('.gallery__inner', {
                    load: {
                        filter: '.bedroom',
                    }
                }
            );
        }
    }
)

const popupLinks = document.querySelectorAll('.about__popup-play');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault()
            }
        );
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup__body--open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('popup__body--open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('popup__body--open');
        stopVideo();
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup__body--open');
        popupClose(popupActive);
    }
})
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            'autoplay': 0,
            'playsinline': 1,
            'rel': 0,
        },
        videoId: 'zrSoQx59x5g?si=QcobE7VUDyR5u0xe',
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function stopVideo() {
    player.stopVideo();
}