if (document.querySelector(".preloader")) {
    enableScroll()
    disableScroll()
    setTimeout(() => {
        enableScroll()
        document.body.classList.add('loaded');
    }, 1400);
}
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const mobMenu = document.querySelector('.menu-mobile');
const iconMenu = document.querySelector('.icon-menu');
const modal = document.querySelectorAll(".modal")
const successModal = document.querySelector(".success-mod")
const errorModal = document.querySelector(".error-mod")
const dropdown = document.querySelectorAll(".dropdown")
let mm = gsap.matchMedia()
let animSpd = 400
let bp = {
    largeDesktop: 1450.98,
    desktop: 1148.98,
    laptop: 1030.98,
    tablet: 700.98,
    phone: 575.98
}
//get path to sprite id
function sprite(id) {
    return '<svg><use xlink:href="img/svg/sprite.svg#' + id + '"></use></svg>'
}
//scroll pos
function scrollPos() {
    return window.pageYOffset || document.documentElement.scrollTop
}
// phone validation
function isPhone(value) {
    return value.match(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/) ? true : false
}
//maskEmail
function maskEmail(email) {
    const [username, domain] = email.split('@');
    let maskedUsername = '';
    if (username.length <= 3) {
        maskedUsername = username.substring(0, 1) + "***";
    } else {
        maskedUsername = username.substring(0, 2) + '***' + username.substring(username.length - 1);
    }
    return maskedUsername + '@' + domain;
}
//enable scroll
function enableScroll() {
    if (!document.querySelector(".modal.open")) {
        if (document.querySelectorAll(".fixed-block")) {
            document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
        }
        document.body.style.paddingRight = '0px'
        document.body.classList.remove("no-scroll")
    }
}
//disable scroll
function disableScroll() {
    if (!document.querySelector(".modal.open")) {
        let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
        if (document.querySelector(".fixed-block")) {
            document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
        }
        document.body.style.paddingRight = paddingValue
        document.body.classList.add("no-scroll");
    }
}
//smoothdrop
function smoothDrop(header, body, dur = false) {
    let animDur = dur ? dur : 500
    body.style.overflow = 'hidden';
    body.style.transition = `height ${animDur}ms ease`;
    body.style['-webkit-transition'] = `height ${animDur}ms ease`;
    if (!header.classList.contains("active")) {
        header.parentNode.classList.add("expanded")
        body.style.display = 'block';
        let height = body.clientHeight + 'px';
        body.style.height = '0px';
        setTimeout(function () {
            body.style.height = height;
            setTimeout(() => {
                body.style.height = null
                header.classList.add("active")
            }, animDur);
        }, 0);
    } else {
        header.parentNode.classList.remove("expanded")
        let height = body.clientHeight + 'px';
        body.style.height = height
        setTimeout(function () {
            body.style.height = "0"
            setTimeout(() => {
                body.style.display = 'none';
                body.style.height = null
                header.classList.remove("active")
            }, animDur);
        }, 0);
    }
}
//tabSwitch
function tabSwitch(nav, block) {
    nav.forEach((item, idx) => {
        item.addEventListener("click", () => {
            nav.forEach(el => {
                el.classList.remove("active")
                el.setAttribute("aria-selected", false)
            })
            item.classList.add("active")
            item.setAttribute("aria-selected", true)
            block.forEach(el => {
                if (el.dataset.block === item.dataset.tab) {
                    if (!el.classList.contains("active")) {
                        el.classList.add("active")
                        el.style.opacity = "0"
                        setTimeout(() => {
                            el.style.opacity = "1"
                        }, 0);
                    }
                } else {
                    el.classList.remove("active")
                }
            })
        })
    });
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
    document.documentElement.style.scrollbarColor = "#002848 #dde6ed"
}
if (isFirefox && customScroll) {
    customScroll.forEach(item => { item.style.scrollbarColor = "#99b9df #dde6ed" })
}
//fixed header
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
    let scrollTop = scrollPos()
    if (scrollTop > 1) {
        header.classList.add("scroll")
        if ((scrollTop > lastScroll && !header.classList.contains("unshow"))) {
            header.classList.add("unshow")
        } else if (scrollTop < lastScroll && header.classList.contains("unshow")) {
            header.classList.remove("unshow")
        }
    } else {
        header.classList.remove("scroll", "unshow")
    }
    lastScroll = scrollTop
})
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
    switchBlock.forEach(item => {
        tabSwitch(item.querySelectorAll("[data-tab]"), item.querySelectorAll("[data-block]"))
    })
}
//open modal
function openModal(modal) {
    let activeModal = document.querySelector(".modal.open")
    disableScroll()
    if (activeModal) {
        activeModal.classList.remove("open")
    }
    modal.classList.add("open")
}
//close modal
function closeModal(modal) {
    if (modal.querySelector("video")) {
        modal.querySelectorAll("video").forEach(item => item.pause())
    }
    modal.classList.remove("open")
    setTimeout(() => {
        enableScroll()
    }, animSpd);
}
// modal click outside
if (modal) {
    modal.forEach((mod) => {
        mod.addEventListener("click", (e) => {
            if (!mod.querySelector(".modal__content").contains(e.target)) {
                closeModal(mod);
            }
        });
        mod.querySelectorAll(".modal__close").forEach(btn => {
            btn.addEventListener("click", () => {
                closeModal(mod)
            })
        })
    });
}
// modal button on click
function modalShowBtns() {
    const modOpenBtn = document.querySelectorAll(".mod-open-btn")
    if (modOpenBtn.length) {
        modOpenBtn.forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault()
                let href = btn.getAttribute("data-modal")
                openModal(document.getElementById(href))
            })
        })
    }
}
modalShowBtns()
// modal close button on click
function modalUnshowBtns() {
    const modCloseBtn = document.querySelectorAll(".mod-close-btn")
    if (modCloseBtn.length) {
        modCloseBtn.forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault()
                let href = btn.getAttribute("data-modal")
                closeModal(document.getElementById(href))
            })
        })
    }
}
modalUnshowBtns()
//open dropdown
function openDropdown(item) {
    item.classList.add("open");
    item.setAttribute("aria-expanded", true);
    item.querySelectorAll(".dropdown__options input").forEach(inp => {
        inp.addEventListener("change", (e) => {
            setActiveOption(item)
        });
    });
    document.addEventListener("click", function clickOutside(e) {
        if (!item.contains(e.target)) {
            closeDropdown(item)
            document.removeEventListener('click', clickOutside);
        }
    });
}
// set active option
function setActiveOption(item) {
    item.querySelector(".dropdown__header").classList.add("checked")
    if (item.classList.contains("radio-select")) {
        let activeInpTxt = item.querySelector("input:checked").nextElementSibling.innerHTML
        item.querySelector(".dropdown__header span").innerHTML = activeInpTxt
        closeDropdown(item)
    }
}
//close dropdonw
function closeDropdown(item) {
    item.classList.remove("open");
    item.setAttribute("aria-expanded", false);
}
//dropdown
if (dropdown) {
    dropdown.forEach(item => {
        item.querySelector(".dropdown__header").addEventListener("click", () => {
            item.classList.contains("open") ? closeDropdown(item) : openDropdown(item)
        })
    })
}
//accordion
const accordion = document.querySelectorAll(".accordion")
if (accordion.length) {
    accordion.forEach(item => {
        item.querySelector(".accordion__header").addEventListener("click", () => {
            if (!item.classList.contains("no-close")) {
                item.parentNode.parentNode.querySelectorAll(".accordion").forEach(el => {
                    if (el.querySelector(".accordion__header").classList.contains("active")) {
                        smoothDrop(el.querySelector(".accordion__header"), el.querySelector(".accordion__body"))
                        if (el.getBoundingClientRect().top < 0) {
                            let pos = scrollPos() + item.getBoundingClientRect().top - el.querySelector(".accordion__body").clientHeight - header.clientHeight - 10
                            window.scrollTo(0, pos)
                        }
                    }
                })
            }
            smoothDrop(item.querySelector(".accordion__header"), item.querySelector(".accordion__body"))
        })
    })
}
// read-more
let readMoreTimeout
function readMoreFunc() {
    clearTimeout(readMoreTimeout)
    const readMore = document.querySelectorAll(".read-more")
    readMoreTimeout = setTimeout(() => {
        if (readMore.length) {
            readMore.forEach(item => {
                let openTxt = item.querySelector(".read-more__btn").getAttribute("data-open")
                let closeTxt = item.querySelector(".read-more__btn").getAttribute("data-close")
                function showMoreBtn() {
                    item.classList.remove("active")
                    item.classList.add("more-hidden")
                    let height = item.querySelector(".read-more__content").clientHeight
                    item.classList.remove("more-hidden")
                    let fullHeight = item.querySelector(".read-more__content").clientHeight
                    item.classList.add("more-hidden")
                    if (fullHeight > height) {
                        item.classList.add("btn-show")
                        if (item.querySelector(".read-more__btn span") && openTxt) {
                            item.querySelector(".read-more__btn span").textContent = openTxt
                        }
                    } else {
                        item.classList.remove("btn-show")
                    }
                }
                showMoreBtn()
                let currWinW = window.innerWidth
                window.addEventListener("resize", () => {
                    if (currWinW != window.innerWidth) {
                        showMoreBtn()
                        currWinW = window.innerWidth
                    }
                })
                item.querySelector(".read-more__btn").addEventListener("click", () => {
                    if (!item.classList.contains("active")) {
                        item.classList.add("active")
                        let height = item.querySelector(".read-more__content").clientHeight + "px"
                        item.classList.remove("more-hidden")
                        let fullHeight = item.querySelector(".read-more__content").clientHeight + "px"
                        item.querySelector(".read-more__content").style.height = height;
                        setTimeout(function () {
                            item.querySelector(".read-more__content").style.height = fullHeight
                            if (item.querySelector(".read-more__btn span") && closeTxt) {
                                item.querySelector(".read-more__btn span").textContent = closeTxt
                            }
                            setTimeout(() => {
                                item.querySelector(".read-more__content").style.height = null
                            }, 500);
                        }, 0);
                    } else {
                        item.classList.remove("active")
                        let fullHeight = item.querySelector(".read-more__content").clientHeight + 'px';
                        item.classList.add("more-hidden")
                        let height = item.querySelector(".read-more__content").clientHeight + 'px';
                        item.classList.remove("more-hidden")
                        item.querySelector(".read-more__content").style.height = fullHeight
                        setTimeout(function () {
                            item.querySelector(".read-more__content").style.height = height
                            if (item.querySelector(".read-more__btn span") && openTxt) {
                                item.querySelector(".read-more__btn span").textContent = openTxt
                            }
                            setTimeout(() => {
                                item.classList.add("more-hidden")
                                item.querySelector(".read-more__content").style.height = null
                            }, 500);
                        }, 0);
                    }
                })
            })
        }
    }, 0);
}
readMoreFunc()
//blur-text animation
const blurTexts = document.querySelectorAll(".blur-text");
if (blurTexts) {
    blurTexts.forEach(title => {
        const innerMass = title.innerHTML.split(/(<br>)/g);
        title.innerHTML = "";
        let charIndex = 0;
        innerMass.forEach((part, i) => {
            if (part === "<br>") {
                title.appendChild(document.createElement("br"));
            } else {
                let lines = part.split(" ");
                let lineWrapper = document.createElement("span");
                lineWrapper.classList.add("lineWrapper");
                title.append(lineWrapper);
                lines.forEach(item => {
                    if (item.trim() !== "") {
                        let wordWrapper = item.split(" ");
                        wordWrapper.forEach(word => {
                            word = word.replace(/&nbsp;/g, ' ');
                            let wordSpan = document.createElement('span');
                            wordSpan.classList.add("wordWrapper");
                            lineWrapper.append(wordSpan);
                            let chars = word.split("");
                            chars.forEach(char => {
                                if (char.trim() !== "") {
                                    let charSpan = document.createElement("span");
                                    charSpan.innerHTML = char;
                                    charSpan.classList.add("char");
                                    charSpan.setAttribute("data-i", charIndex);
                                    charSpan.setAttribute("style", `--char-i: ${charIndex}`);
                                    wordSpan.append(charSpan);
                                    charIndex++;
                                } else {
                                    wordSpan.innerHTML += '&nbsp;'
                                }
                            });
                        });
                    }
                });
            }
        });
        /* let tl = gsap.timeline({
            scrollTrigger: {
                trigger: title,
                start: "top+=200 bottom",
                invalidateOnRefresh: true,
            },
        });
        tl.fromTo(title.querySelectorAll(".char"),
            {
                opacity: 0,
                filter: "blur(10px)",
            },
            {
                opacity: 1,
                filter: "blur(0px)",
            }
        ); */
    });
}
// fadeUp animation
function animate() {
    if (document.querySelectorAll('[data-animation]').length) {
        document.querySelectorAll('[data-animation]').forEach(item => {
            if (!item.classList.contains("animated")) {
                let itemTop = item.getBoundingClientRect().top + scrollPos();
                let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.1);
                let itemScrolled = itemPoint > 100 ? itemPoint : 100
                if (scrollPos() > itemTop - itemScrolled) {
                    let animName = item.getAttribute("data-animation")
                    item.classList.add(animName);
                    item.classList.add("animated");
                }
            }

        })
    }

}
animate()
window.addEventListener("scroll", animate)
//menu
const headerNav = document.querySelector(".header__nav")
if (iconMenu && headerNav) {
    iconMenu.addEventListener("click", () => {
        if (!iconMenu.classList.contains("active")) {
            iconMenu.setAttribute("aria-label", "Закрыть меню")
            iconMenu.classList.add("active")
            headerNav.classList.add("open")
            disableScroll()
        } else {
            iconMenu.setAttribute("aria-expanded", false)
            iconMenu.setAttribute("aria-label", "Открыть меню")
            iconMenu.classList.remove("active")
            headerNav.classList.remove("open")
            enableScroll()
        }
    })
    window.addEventListener("resize", () => {
        if (window.innerWidth > bp.largeDesktop && iconMenu.classList.contains("active")) {
            iconMenu.click()
        }
    })
}
//intro
const introVideo = document.querySelector(".intro video")
if (introVideo) {
    let introTl = gsap.timeline({
        ease: "none",
        duration: 1,
        scrollTrigger: {
            trigger: introVideo,
            start: "top top",
            end: "bottom start",
            scrub: true,
            invalidateOnRefresh: true,
            scrubs: true
        },
    })
    introTl.to(introVideo, {
        scale: 1.7,
    })
    introTl.to(document.querySelector('.intro .media-cover-bg'), {
        y: 0,
    })
}
//about animation
const aboutContainer = document.querySelector(".about__container")
const aboutRibbons = document.querySelector(".about__ribbons")
const aboutItems = document.querySelectorAll(".about .item-about")
if (aboutContainer && aboutRibbons) {
    let aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutContainer,
            start: "top+=200 bottom",
            invalidateOnRefresh: true,
        },
        onComplete: () => {
            aboutRibbons.style.opacity = 0.2
            aboutContainer.style.opacity = 1
            aboutContainer.classList.add("text-animating")
            if (aboutItems.length) {
                setTimeout(() => {
                    aboutItems.forEach((item, i) => {
                        gsap.to(item, {
                            opacity: 1,
                            ease: "power2.out",
                            duration: 1,
                            delay: i * 0.3,
                        });
                    })
                }, 300);
            }

        },
    })
    aboutRibbons.querySelectorAll(".about__ribbons-path").forEach((path, pathIdx) => {
        let pathLength = path.getTotalLength()
        path.style.strokeDasharray = pathLength + "px";
        path.style.strokeDashoffset = pathLength + "px"
        aboutTl.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
        }, pathIdx * 0.2)
    })
}
//events
const eventsWrapper = document.querySelector(".events__wrapper")
const eventsMod = document.querySelector("#event-modal")
const eventsModContentWrapper = document.querySelector("[data-event-mod-content]")
const eventsCol = document.querySelectorAll(".events .swiper-slide")
const eventsFilter = document.querySelector(".events__filter")
const eventsCalendar = document.querySelector(".events .datepicker")
const filterSelected = document.querySelector(".filter-selected__items")
let eventsDatepicker
let eventsFilterObj
// events filter
if (eventsFilter && filterSelected) {
    eventsFilterObj = {
        checkInp: function (inp) {
            inp.checked = true
            inp.setAttribute("checked", true)
        },
        uncheckInp: function (inp) {
            inp.checked = false
            inp.removeAttribute("checked")
        },
        setSelected: function (inp) {
            let txt = inp.parentNode.querySelector("span:last-child").textContent
            let idx = inp.getAttribute("data-id")
            let inpName = inp.getAttribute("data-name")
            let selectedTxt = inpName ? inpName + " " + txt.toLowerCase() : txt
            filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${idx}">${selectedTxt}<button class="btn-cross"></button></li>`)
        },
        removeSelected: function (id) {
            if (filterSelected.querySelector(`[data-target="${id}"]`)) {
                filterSelected.querySelector(`[data-target="${id}"]`).remove()
            }
        },
        selectedOnClick: function (e) {
            filterSelected.querySelectorAll("li").forEach(item => {
                if (item.querySelector(".btn-cross").contains(e.target)) {
                    let dataTarget = item.getAttribute("data-target")
                    eventsFilter.querySelector(`label input[data-id='${dataTarget}']`).click()
                }
            })
        },
    }
    eventsFilter.querySelectorAll("label input").forEach(item => {
        if (item.checked) {
            eventsFilterObj.setSelected(item)
        }
    })
    eventsFilter.addEventListener("click", e => {
        if (eventsFilter.querySelector("label input")) {
            eventsFilter.querySelectorAll("label input").forEach(inp => {
                if (inp.contains(e.target)) {
                    let id = inp.getAttribute("data-id")
                    if (inp.type === 'checkbox') {
                        inp.checked ? eventsFilterObj.setSelected(inp) : eventsFilterObj.removeSelected(id)
                    } else if (inp.type === 'radio') {
                        eventsFilter.querySelectorAll(`input[name='${inp.name}']`).forEach(inp => eventsFilterObj.removeSelected(inp.getAttribute("data-id")))
                        eventsFilter.setSelected(inp)
                    }
                }
            })
        }
    })
    filterSelected.addEventListener("click", e => eventsFilterObj.selectedOnClick(e))
}
//events swiper
function initEventsSwiper() {
    const eventsSwiper = document.querySelector('.events .swiper')
    const eventsSwiperNav = document.querySelector('.events .swiper-nav')
    if (eventsSwiper) {
        new Swiper(eventsSwiper, {
            slidesPerView: 1,
            spaceBetween: 16,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,
            navigation: {
                prevEl: document.querySelector(".events .nav-btn--prev"),
                nextEl: document.querySelector(".events .nav-btn--next"),
            },
            breakpoints: {
                1450.98: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1148.98: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1030.98: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                700.98: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
            },
            speed: 800,
        });
        if (eventsSwiperNav) {
            !eventsSwiper ? eventsSwiperNav.classList.add("hidden") : eventsSwiperNav.classList.remove("hidden")
        }
    }
}
initEventsSwiper()
//events onclick
if (eventsWrapper) {
    eventsWrapper.addEventListener("click", e => {
        const itemEvents = document.querySelectorAll(".item-event")
        itemEvents.forEach(item => {
            if (item.contains(e.target)) {
                const itemModContent = item.querySelector(".item-event__mod")
                if (itemModContent) {
                    eventsModContentWrapper.innerHTML = itemModContent.innerHTML
                    readMoreFunc()
                    openModal(eventsMod)
                }
            }
        })
    })
}
//events datepicker
if (eventsCalendar) {
    eventsDatepicker = new AirDatepicker(eventsCalendar, {
        onSelect() {
            eventsFilter.submit()
        }
    })
}
//events animation
if (eventsWrapper && eventsCol.length) {
    let eventsTl = gsap.timeline({
        scrollTrigger: {
            trigger: eventsWrapper,
            start: "center bottom",
            invalidateOnRefresh: true,
            toggleActions: "play none play none",
        },
    });
    eventsCol.forEach((item, i) => {
        eventsTl.from(item, {
            xPercent: 30,
            opacity: 0,
            ease: "back.out",
            duration: 1,
        }, i * 0.2);
    })
}
//news swiper
const newsSwiperEl = document.querySelector(".news__swiper")
if (newsSwiperEl) {
    let newsSwiper
    let isInitialized
    function initNewsSwiper() {
        if (window.innerWidth <= bp.laptop && !isInitialized) {
            isInitialized = true
            newsSwiper = new Swiper(newsSwiperEl.querySelector(".swiper"), {
                slidesPerView: 1,
                spaceBetween: 16,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                breakpoints: {
                    575.98: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    }
                },
                pagination: {
                    el: newsSwiperEl.querySelector(".swiper-pagination"),
                    type: "bullets",
                    clickable: true,
                },
                speed: 800,
            });
        } else if (window.innerWidth > bp.laptop && isInitialized) {
            isInitialized = false
            newsSwiper.destroy()
        }
    }
    initNewsSwiper()
    window.addEventListener("resize", initNewsSwiper)
}
//news animation
const newsSlide = document.querySelectorAll('.news__slide')
if (newsSlide.length) {
    let newsTl = gsap.timeline({
        scrollTrigger: {
            trigger: newsSwiperEl,
            start: "top center",
            invalidateOnRefresh: true,
            toggleActions: "play none play none",
        },
    });
    newsSlide.forEach((item, i) => {
        newsTl.from(item, {
            y: 50,
            opacity: 0,
            ease: "back.out",
            duration: 1,
        }, i * 0.1);

    })
}
//projectsSwiper
const projectsSwiper = document.querySelector(".projects .swiper")
if (projectsSwiper) {
    new Swiper(projectsSwiper, {
        slidesPerView: 1,
        spaceBetween: 16,
        observer: true,
        observeParents: true,
        centeredSlides: true,
        watchSlidesProgress: true,
        initialSlide: projectsSwiper.querySelectorAll(".swiper-slide").length > 2 ? 1 : 0,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 110,
            modifier: 1,
            slideShadows: true
        },
        navigation: {
            prevEl: document.querySelector(".projects .nav-btn--prev"),
            nextEl: document.querySelector(".projects .nav-btn--next"),
        },
        breakpoints: {
            1450.98: {
                slidesPerView: 1.48,
                spaceBetween: 80,
            },
            1030.98: {
                slidesPerView: 1.185,
                spaceBetween: 80,
            },
            700.98: {
                slidesPerView: 1,
                spaceBetween: 60,
            },
            479.98: {
                slidesPerView: 1.4,
                spaceBetween: 40,
            },
        },
        speed: 800
    })
}
// actual news popup
const newsPopup = document.querySelector(".news-popup")
if (newsPopup) {
    newsPopup.querySelector(".news-popup__close").addEventListener("click", () => newsPopup.classList.add("hidden"))
}


