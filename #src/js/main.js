const preloader = document.querySelector(".preloader")
let preloaderHiddenTimeOut = 1800
if (preloader) {
    enableScroll()
    disableScroll()
    setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            enableScroll()
            ScrollTrigger.refresh()
        }, 400);
    }, 1400);
}
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const mobMenu = document.querySelector('.menu-mobile');
const iconMenu = document.querySelector('.icon-menu');
const modal = document.querySelectorAll(".modal")
const successMod = document.querySelector("#success-mod")
const errorMod = document.querySelector("#error-mod")
const cookiePopup = document.querySelector("#cookie-popup")
const dropdown = document.querySelectorAll(".dropdown")
let mm = gsap.matchMedia()
let animSpd = 400
let bp = {
    largeDesktop: 1450.98,
    desktop: 1200.98,
    laptop: 1030.98,
    tablet: 767.98,
    phone: 575.98
}
//get path to sprite id
function sprite(id) {
    return '<svg><use xlink:href="html/img/svg/sprite.svg#' + id + '"></use></svg>'
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
//debounde 
function debounce(func, delay = 100) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
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
//setSuccessTxt
function setSuccessTxt(title = false, txt = false, btnTxt = false) {
    successMod.querySelector(".modal__title").textContent = title ? title : "Ваша заявка принята"
    successMod.querySelector(".main-btn span").textContent = btnTxt ? btnTxt : "Закрыть"
    successMod.querySelector("p").textContent = txt ? txt : ''
}
//setErrorTxt
function setErrorTxt(title = false, txt = false, btnTxt = false) {
    errorMod.querySelector(".modal__title").textContent = title ? title : "Ошибка"
    errorMod.querySelector(".main-btn span").textContent = btnTxt ? btnTxt : "Закрыть"
    errorMod.querySelector("p").textContent = txt ? txt : ''
}
// openSuccessMod
function openSuccessMod(title = false, txt = false, btnTxt = false) {
    setSuccessTxt(title, txt, btnTxt)
    openModal(successMod)
}
// openErrorMod
function openErrorMod(title = false, txt = false, btnTxt = false) {
    setErrorTxt(title, txt, btnTxt)
    openModal(errorMod)
}
// formReset
function formReset(form) {
    if (form.querySelectorAll(".item-form").length > 0) {
        form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
    }
    if (form.querySelectorAll("[data-error]").length > 0) {
        form.querySelectorAll("[data-error]").forEach(item => item.textContent = '')
    }
    form.querySelectorAll("input").forEach(inp => {
        if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
            inp.value = ""
        }
        if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
            inp.checked = false
        }
    })
    if (form.querySelector("textarea")) {
        form.querySelector("textarea").value = ""
    }
    if (form.querySelector(".file-form__items")) {
        form.querySelector(".file-form__items").innerHTML = ""
    }
}
//show cookie
function showCookie() {
    if (cookiePopup) {
        cookiePopup.classList.add("show")
    }
}
//show cookie
function unshowCookie() {
    if (cookiePopup) {
        cookiePopup.classList.remove("show")
    }
}
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
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}
// search form
const searchForm = document.querySelectorAll(".search-form")
function showSearchResBtn(item) {
    if (item.querySelector("input").value.length > 0) {
        item.querySelector(".search-form__reset").classList.add("show")
    } else {
        item.querySelector(".search-form__reset").classList.remove("show")
    }
}
if (searchForm) {
    searchForm.forEach(item => {
        showSearchResBtn(item)
        item.querySelector("input").addEventListener("input", () => showSearchResBtn(item))
        item.addEventListener("reset", () => {
            item.querySelector("input").setAttribute("value", '')
            showSearchResBtn(item)
        })
    })
}
//anchorLinks
const anchorLinks = document.querySelectorAll(".js-anchor")
if (anchorLinks.length) {
    document.querySelectorAll(".js-anchor").forEach(item => {
        item.addEventListener("click", e => {
            let idx = item.getAttribute("href").indexOf("#")
            const href = item.getAttribute("href").substring(idx)
            let dest = document.querySelector(href)
            if (dest) {
                e.preventDefault()
                let destPos = dest.getBoundingClientRect().top < 0 ? dest.getBoundingClientRect().top - header.clientHeight : dest.getBoundingClientRect().top
                if (iconMenu.classList.contains("active")) {
                    iconMenu.click()
                    setTimeout(() => {
                        window.scrollTo({ top: scrollPos() + destPos, behavior: 'smooth' })
                    }, 300);
                } else {
                    window.scrollTo({ top: scrollPos() + destPos, behavior: 'smooth' })
                }
            }
        })
    })
}
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
    });
}
// fadeUp animation
function animate() {
    const elements = document.querySelectorAll('[data-animation]');
    elements.forEach(async item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.1);
        const itemScrolled = itemPoint > 100 ? itemPoint : 100;
        if (itemTop - itemScrolled < 0) {
            const animName = item.getAttribute("data-animation");
            if (preloader && !preloader.classList.contains("loaded")) {
                await new Promise(resolve => setTimeout(resolve, preloaderHiddenTimeOut));
            }
            item.classList.add(animName);
            item.removeAttribute("data-animation");
        }
    });
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
// const filter = document.querySelectorAll(".filter")
// let filterObj
// // filter
// if (filter.length) {
//     filterObj = {
//         checkInp: function (inp) {
//             inp.checked = true
//             inp.setAttribute("checked", true)
//         },
//         uncheckInp: function (inp) {
//             inp.checked = false
//             inp.removeAttribute("checked")
//         },
//         setSelected: function (inp, filterSelected) {
//             let txt = inp.parentNode.querySelector("span:last-child").textContent
//             let idx = inp.getAttribute("data-id")
//             let inpName = inp.getAttribute("data-name")
//             let selectedTxt = inpName ? inpName + " " + txt.toLowerCase() : txt
//             filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${idx}">${selectedTxt}<button class="btn-cross"></button></li>`)
//         },
//         removeSelected: function (id, filterSelected) {
//             if (filterSelected.querySelector(`[data-target="${id}"]`)) {
//                 filterSelected.querySelector(`[data-target="${id}"]`).remove()
//             }
//         },
//         selectedOnClick: function (e, filter, filterSelected) {
//             filterSelected.querySelectorAll("li").forEach(item => {
//                 if (item.querySelector(".btn-cross").contains(e.target)) {
//                     let dataTarget = item.getAttribute("data-target")
//                     filter.querySelector(`label input[data-id='${dataTarget}']`).click()
//                 }
//             })
//         },
//     }
//     filter.forEach(filt => {
//         const filterSelected = filt.querySelector(".filter__selected-items")
//         if (filterSelected) {
//             filt.querySelectorAll("label input").forEach(item => {
//                 if (item.checked) {
//                     filterObj.setSelected(item, filterSelected)
//                 }
//             })
//             filt.addEventListener("click", e => {
//                 if (filt.querySelector("label input")) {
//                     filt.querySelectorAll("label input").forEach(inp => {
//                         if (inp.contains(e.target)) {
//                             let id = inp.getAttribute("data-id")
//                             if (inp.type === 'checkbox') {
//                                 inp.checked ? filterObj.setSelected(inp, filterSelected) : filterObj.removeSelected(id, filterSelected)
//                             } else if (inp.type === 'radio') {
//                                 filt.querySelectorAll(`input[name='${inp.name}']`).forEach(inp => filterObj.removeSelected(inp.getAttribute("data-id"), filterSelected))
//                                 filterObj.setSelected(inp, filterSelected)
//                             }
//                         }
//                     })
//                 }
//             })
//             filterSelected.addEventListener("click", e => filterObj.selectedOnClick(e, filt, filterSelected,))
//         }
//     })
// }



// Логика фильтров с выбранной датой в календаре

const filter = document.querySelectorAll(".filter")
let filterObj
// filter
if (filter.length) {
    filterObj = {
        checkInp: function (inp) {
            inp.checked = true
            inp.setAttribute("checked", true)
        },
        uncheckInp: function (inp) {
            inp.checked = false
            inp.removeAttribute("checked")
        },
        setSelected: function (inp, filterSelected) {
            let txt = inp.parentNode.querySelector("span:last-child").textContent
            let idx = inp.getAttribute("data-id")
            let inpName = inp.getAttribute("data-name")
            let selectedTxt = inpName ? inpName + " " + txt.toLowerCase() : txt
            if (!filterSelected.querySelector(`[data-target="${idx}"]`)) {
                filterSelected.insertAdjacentHTML("afterbegin", `<li data-target="${idx}">${selectedTxt}<button class="btn-cross"></button></li>`)
            }
        },
        removeSelected: function (id, filterSelected) {
            if (filterSelected.querySelector(`[data-target="${id}"]`)) {
                filterSelected.querySelector(`[data-target="${id}"]`).remove()
            }
        },
        selectedOnClick: function (e, filter, filterSelected) {
            filterSelected.querySelectorAll("li").forEach(item => {
                if (item.querySelector(".btn-cross").contains(e.target)) {
                    let dataTarget = item.getAttribute("data-target")
                    const targetInput = filter.querySelector(`label input[data-id='${CSS.escape(dataTarget)}']`)
                    if (targetInput) {
                        targetInput.click()
                        return
                    }
                    if (dataTarget === 'filter[date]') {
                        const dateInput = filter.querySelector('[data-datepicker-value]')
                        if (dateInput) {
                            dateInput.value = ''
                            if (dateInput._picker && typeof dateInput._picker.clear === 'function') {
                                try { dateInput._picker.clear() } catch (err) { }
                            }
                            this.removeSelected(dataTarget, filterSelected)
                        }
                    }
                }
            })
        },
    }

    function formatDateRu(dateValue) {
        try {
            let d
            if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
                d = new Date(dateValue + 'T00:00:00')
            } else if (typeof dateValue === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(dateValue)) {
                const [dd, mm, yy] = dateValue.split('.')
                d = new Date(`${yy}-${mm}-${dd}T00:00:00`)
            } else if (dateValue instanceof Date) {
                d = dateValue
            } else {
                d = new Date(dateValue)
            }
            return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
        } catch (err) {
            return dateValue
        }
    }

    filter.forEach(filt => {
        const filterSelected = filt.querySelector(".filter__selected-items")
        if (filterSelected) {
            filt.querySelectorAll("label input").forEach(item => {
                if (item.checked) {
                    filterObj.setSelected(item, filterSelected)
                }
            })

            const dateInput = filt.querySelector('[data-datepicker-value]')
            const addDateSelected = (value) => {
                if (!value) return;
                const id = 'filter[date]';
                const display = String(value).replace(/\s*,\s*/g, ' - ');
                if (!filterSelected.querySelector(`[data-target="${id}"]`)) {
                    filterSelected.insertAdjacentHTML("afterbegin",
                        `<li data-target="${id}">Дата: ${display}<button class="btn-cross"></button></li>`);
                } else {
                    const el = filterSelected.querySelector(`[data-target="${id}"]`);
                    el.innerHTML = `Дата: ${display}<button class="btn-cross"></button>`;
                }
            }
            const removeDateSelected = () => {
                const id = 'filter[date]'
                filterObj.removeSelected(id, filterSelected)
            }

            if (dateInput) {
                if (dateInput.value) {
                    addDateSelected(dateInput.value)
                }

                dateInput.addEventListener('change', (ev) => {
                    const v = ev.target.value
                    if (v) addDateSelected(v)
                    else removeDateSelected()
                })

                dateInput.addEventListener('input', (ev) => {
                    const v = ev.target.value
                    if (v) addDateSelected(v)
                })
            }

            filt.addEventListener("click", e => {
                if (filt.querySelector("label input")) {
                    filt.querySelectorAll("label input").forEach(inp => {
                        if (inp.contains(e.target) || inp === e.target) {
                            let id = inp.getAttribute("data-id")
                            if (inp.type === 'checkbox') {
                                inp.checked ? filterObj.setSelected(inp, filterSelected) : filterObj.removeSelected(id, filterSelected)
                            } else if (inp.type === 'radio') {
                                filt.querySelectorAll(`input[name='${inp.name}']`).forEach(r => filterObj.removeSelected(r.getAttribute("data-id"), filterSelected))
                                filterObj.setSelected(inp, filterSelected)
                            }
                        }
                    })
                }
            })

            filterSelected.addEventListener("click", e => filterObj.selectedOnClick(e, filt, filterSelected))
        }
    })
}

const datepickersMap = new WeakMap();

const datepickerNodes = document.querySelectorAll(".datepicker");
if (datepickerNodes && datepickerNodes.length) {
    datepickerNodes.forEach(node => {
        const filterForm = node.closest('.filter__form');
        const field = filterForm ? filterForm.querySelector('input[data-datepicker-value]') : null;

        const picker = new AirDatepicker(node, {
            range: true,
            multipleDatesSeparator: ' - ',
            onSelect({ formattedDate }) {
                if (!field) return;
                field.value = formattedDate || '';
                field.setAttribute('data-datepicker-value', formattedDate || '');
                field.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        if (field) {
            field._picker = picker;
            datepickersMap.set(field, picker);
        }
    });
}


function clearDateField(field) {
    if (!field) return;
    const picker = field._picker || datepickersMap.get(field);
    if (picker && typeof picker.clear === 'function') {
        try { picker.clear(); } catch (err) { }
    }
    field.value = '';
    field.removeAttribute('data-datepicker-value');
    field.dispatchEvent(new Event('change', { bubbles: true }));
}


//intro
const introBg = document.querySelector(".intro .media-cover-bg")
if (introBg) {
    let introTl = gsap.timeline({
        ease: "none",
        duration: 1,
        scrollTrigger: {
            trigger: document.querySelector(".intro"),
            start: "top top",
            end: "bottom start",
            scrub: true,
            invalidateOnRefresh: true,
            scrubs: true
        },
    })
    introTl.to(introBg, {
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
const introAbout = document.querySelector(".about-intro")
const aboutLines = document.querySelector(".about-intro__lines")
if (introAbout && aboutLines) {
    aboutLines.querySelectorAll(".about-intro__lines-path").forEach(async (path, pathIdx) => {
        let pathLength = path.getTotalLength()
        path.style.strokeDasharray = pathLength + "px";
        path.style.strokeDashoffset = pathLength + "px"
        if (preloader && !preloader.classList.contains("loaded")) {
            await new Promise(resolve => setTimeout(resolve, preloaderHiddenTimeOut));
        }
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 2,
            scrollTrigger: {
                trigger: aboutLines,
                start: "top+=200 bottom",
                invalidateOnRefresh: true,
                onEnter: () => {
                    setTimeout(() => {
                        introAbout.classList.add("line-animated")
                    }, 1000);
                }
            },
        }, pathIdx * 0.2)
    })
}
//events
const eventsWrapper = document.querySelector(".events__wrapper")
const eventsMod = document.querySelector("#event-mod")
const eventsModContent = document.querySelector("[data-event-mod-content]")
const eventsCol = document.querySelectorAll(".events .swiper-slide")
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
                1200.98: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1030.98: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                767.98: {
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
        const itemEvents = eventsWrapper.querySelectorAll(".item-event")
        if (itemEvents.length) {
            itemEvents.forEach(item => {
                if (item.contains(e.target)) {
                    const itemModContent = item.querySelector(".item-event__mod")
                    if (itemModContent) {
                        let modTitle = itemModContent.getAttribute("data-title")
                        if (eventsMod && modTitle && eventsModContent) {
                            eventsMod.querySelector(".modal__title").innerHTML = modTitle
                            eventsModContent.innerHTML = itemModContent.innerHTML
                            readMoreFunc()
                            const itemMap = eventsMod.querySelector(".item-event__map")
                            let coords = item.getAttribute("data-coords")
                            if (itemMap && coords) {
                                let [lat, lng] = coords.split(',').map(coord => parseFloat(coord.trim()));
                                ymaps.ready(() => {
                                    itemMap.setAttribute("id", "event-map")
                                    let eventsMap = new ymaps.Map('event-map', {
                                        center: [lat, lng],
                                        zoom: 15
                                    });
                                    eventsMap.controls.remove('rulerControl');
                                    eventsMap.controls.remove('searchControl');
                                    eventsMap.controls.remove('trafficControl');
                                    eventsMap.controls.remove('typeSelector');
                                    eventsMap.controls.remove('rulerControl');
                                    eventsMap.geoObjects.add(new ymaps.Placemark([lat, lng], {}, {
                                        iconLayout: 'default#image',
                                        iconImageHref: 'html/img/svg/map-mark.svg',
                                        iconImageSize: [22, 28],
                                        iconImageOffset: [-14, -14],
                                        cursor: 'grab'
                                    }));
                                });
                            }
                            openModal(eventsMod)
                        }
                    }
                }
            })
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
//main-news swiper
const mainNewsSwiperEl = document.querySelector(".main-news__swiper")
if (mainNewsSwiperEl) {
    let mainNewsSwiper
    let isInitialized
    function initMainNewsSwiper() {
        if (window.innerWidth <= bp.laptop && !isInitialized) {
            isInitialized = true
            mainNewsSwiper = new Swiper(mainNewsSwiperEl.querySelector(".swiper"), {
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
                    el: mainNewsSwiperEl.querySelector(".swiper-pagination"),
                    type: "bullets",
                    clickable: true,
                },
                speed: 800,
            });
        } else if (window.innerWidth > bp.laptop && isInitialized) {
            isInitialized = false
            mainNewsSwiper.destroy()
        }
    }
    initMainNewsSwiper()
    window.addEventListener("resize", initMainNewsSwiper)
}
//main-news animation
const mainNewsSlide = document.querySelectorAll('.main-news__slide')
if (mainNewsSlide.length) {
    let mainNewsTl = gsap.timeline({
        scrollTrigger: {
            trigger: mainNewsSwiperEl,
            start: "top center",
            invalidateOnRefresh: true,
            toggleActions: "play none play none",
        },
    });
    mainNewsSlide.forEach((item, i) => {
        mainNewsTl.from(item, {
            y: 50,
            opacity: 0,
            ease: "back.out",
            duration: 1,
        }, i * 0.1);

    })
}
//gallerySwiper
const gallerySwiper = document.querySelectorAll(".gallery__swiper")
if (gallerySwiper.length) {
    gallerySwiper.forEach(item => {
        new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 1,
            spaceBetween: 16,
            observer: true,
            observeParents: true,
            centeredSlides: true,
            watchSlidesProgress: true,
            loop: true,
            initialSlide: item.querySelectorAll(".swiper-slide").length > 2 ? 1 : 0,
            effect: "coverflow",
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 110,
                modifier: 1,
                slideShadows: true
            },
            navigation: {
                prevEl: item.querySelector(".nav-btn--prev"),
                nextEl: item.querySelector(".nav-btn--next"),
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
                767.98: {
                    slidesPerView: 1,
                    spaceBetween: 60,
                },
            },
            speed: 800
        })
    })

}
// actual news popup
const newsPopup = document.querySelector(".news-popup")
if (newsPopup) {
    newsPopup.querySelector(".news-popup__close").addEventListener("click", () => newsPopup.classList.add("hidden"))
}
//fan-shop swiper
const fanShopSwiper = document.querySelector('.fan-shop__swiper')
if (fanShopSwiper) {
    new Swiper(fanShopSwiper.querySelector(".swiper"), {
        slidesPerView: "auto",
        spaceBetween: 16,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: fanShopSwiper.querySelector(".nav-btn--prev"),
            nextEl: fanShopSwiper.querySelector(".nav-btn--next"),
        },
        breakpoints: {
            1450.98: {
                slidesPerView: fanShopSwiper.classList.contains("fan-shop__swiper--sm") ? 3 : 4,
                spaceBetween: 30,
            },
            1200.98: {
                slidesPerView: fanShopSwiper.classList.contains("fan-shop__swiper--sm") ? 3 : 4,
                spaceBetween: 20,
            },
            1030.98: {
                slidesPerView: fanShopSwiper.classList.contains("fan-shop__swiper--sm") ? 3 : 4,
                spaceBetween: 16,
            },
            767.98: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
        speed: 800,
    });
}
//swiper 1el
const swiper1 = document.querySelectorAll(".swiper1")
if (swiper1.length) {
    swiper1.forEach(item => {
        new Swiper(item.querySelector(".swiper"), {
            slidesPerView: 1,
            observer: true,
            observeParents: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: item.querySelector(".swiper-pagination"),
                type: "bullets",
                clickable: true,
            },
            speed: 300,
        })
    })
}
//club achieve items count
const clubAchieveList = document.querySelectorAll('.club-achieve__list')
if (clubAchieveList.length) {
    clubAchieveList.forEach(list => {
        const items = list.querySelectorAll("li")
        if (items.length > 2) {
            list.classList.add("col-2")
        }
    })
}
//print
const dataPrintBtn = document.querySelectorAll("[data-print-btn]")
function convertImagesToBase64WithTransparency(block) {
    return new Promise((resolve) => {
        const images = block.querySelectorAll('img');
        let converted = 0;
        if (images.length === 0) resolve();
        images.forEach(img => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.src = img.src;
            newImg.onload = () => {
                canvas.width = newImg.width;
                canvas.height = newImg.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(newImg, 0, 0);
                try {
                    const base64 = canvas.toDataURL('image/png');
                    img.src = base64;
                    converted++;
                } catch (error) {
                    console.warn('Cannot convert image:', img.src);
                    converted++;
                }
                if (converted === images.length) resolve();
            };
            newImg.onerror = () => {
                console.warn('Failed to load image:', img.src);
                converted++;
                if (converted === images.length) resolve();
            };
        });
    });
}
if (dataPrintBtn.length) {
    dataPrintBtn.forEach(btn => {
        btn.addEventListener("click", async () => {
            const printBlock = document.querySelector(`[data-print-block='${btn.getAttribute("data-print-btn")}']`)
            let printName = btn.getAttribute("data-print-name")
            if (printBlock) {
                const opt = {
                    filename: printName ? printName + ".pdf" : 'document.pdf',
                    pagebreak: { avoid: ['.col-schedule', '.schedule__month'] },
                    html2canvas: {
                        scale: 4,
                        useCORS: true,
                        letterRendering: true,
                        logging: false,
                        scrollY: 0,
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'portrait'
                    }
                };
                await convertImagesToBase64WithTransparency(printBlock)
                html2pdf().set(opt).from(printBlock).save();
            }
        })
    })
}
let daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];
function setScheduleDate() {
    const colSchedule = document.querySelectorAll(".col-schedule")
    colSchedule.forEach(col => {
        let thisDate = col.getAttribute("data-date")
        let date = new Date(thisDate).getDate()
        let day = new Date(thisDate).getDay()
        const dateEl = col.querySelector(".col-schedule__date")
        const dayEl = col.querySelector(".col-schedule__day")
        if (thisDate) {
            if (dateEl) {
                dateEl.innerHTML = date
            }
            if (dayEl) {
                dayEl.innerHTML = daysOfWeek[day]
                col.classList.add('col-schedule--' + day)
            }
        }
    })
}
setScheduleDate()
const scrollDownBtn = document.querySelector(".intro .scrollDown-btn")
if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
        window.scrollTo({
            top: document.querySelector(".intro").scrollHeight, behavior: 'smooth'
        })
    })
}
//member popup
const members = document.querySelector(".members")
const memberMod = document.querySelector("#member-mod")
const memberModContent = document.querySelector("[data-member-mod-content]")
let mainMemberColPos
if (members) {
    const memberItems = members.querySelectorAll(".item-member")
    if (memberItems.length) {
        const mainMemberCol = members.querySelector(".members__col--main")
        const memFirstColLastIt = members.querySelector(".members__col--first .item-member:last-child")
        const memSecColFirstIt = members.querySelector(".members__col--second .item-member:first-child")
        const memThirdColFirstIt = members.querySelector(".members__col--third .item-member:first-child")
        const memFirstColItLines = members.querySelectorAll(".members__col--first .item-member__line")
        const memLeftLine = members.querySelector(".members__line--left")
        const memRightLine = members.querySelector(".members__line--right")
        function getMemMainColPos() {
            return {
                height: mainMemberCol.clientHeight,
                top: mainMemberCol.getBoundingClientRect().top,
                left: mainMemberCol.getBoundingClientRect().left,
                right: mainMemberCol.getBoundingClientRect().right,
            }
        }
        function setMemLeftLine() {
            if (memFirstColLastIt && memLeftLine) {
                let memFirstColLastItPos = {
                    width: memFirstColLastIt.clientWidth,
                    height: memFirstColLastIt.clientHeight,
                    top: memFirstColLastIt.getBoundingClientRect().top,
                    right: memFirstColLastIt.getBoundingClientRect().right
                }
                let memLeftLineW = mainMemberColPos.left - memFirstColLastItPos.right
                let memLeftLineH = memFirstColLastItPos.top - mainMemberColPos.top - (memFirstColLastItPos.height / 2)
                let memLeftLineMobH = memSecColFirstIt.getBoundingClientRect().top - mainMemberColPos.top + mainMemberColPos.height / 2 - (memSecColFirstIt.getBoundingClientRect().height / 2)
                memLeftLine.style.width = memLeftLineW + 'px'
                memLeftLine.style.height = window.innerWidth > bp.laptop ? memLeftLineH + 'px' : memLeftLineMobH + "px"
                memLeftLine.style.top = mainMemberColPos.height / 2 + 'px'
                memLeftLine.style.left = memFirstColLastItPos.width + 'px'
                if (memFirstColItLines) {
                    memFirstColItLines.forEach(item => item.style.width = memLeftLineW / 3 + 'px')
                }
            }
        }
        function setMemRightLine() {
            if (memThirdColFirstIt && memRightLine) {
                let memThirdColFirstItPos = {
                    width: memThirdColFirstIt.clientWidth,
                    height: memThirdColFirstIt.clientHeight,
                    left: memThirdColFirstIt.getBoundingClientRect().left,
                    top: memThirdColFirstIt.getBoundingClientRect().top
                }
                let memRightLineW = memThirdColFirstItPos.left - mainMemberColPos.right
                let memRightLineH = memThirdColFirstItPos.top - mainMemberColPos.top + mainMemberColPos.height / 2 - (memThirdColFirstItPos.height / 2)
                memRightLine.style.width = memRightLineW + 'px'
                memRightLine.style.height = memRightLineH + 'px'
                memRightLine.style.top = mainMemberColPos.height / 2 + 'px'
                memRightLine.style.right = memThirdColFirstItPos.width + 'px'
            }
        }
        function adjustSizeToMultOf9(item) {
            item.style.width = null
            item.style.height = null
            setTimeout(() => {
                let widthSum = Math.round(item.offsetWidth)
                while (widthSum % 9 !== 0) {
                    widthSum--
                }
                item.style.width = widthSum + "px"
            }, 0);
            setTimeout(() => {
                let heightSumm = Math.round(item.offsetHeight)
                while (heightSumm % 9 !== 0) {
                    heightSumm++
                }
                item.style.height = heightSumm + "px"
            }, 0);
        }
        function callMemDashFunc() {
            memberItems.forEach(item => {
                if (!item.parentNode.classList.contains("members__team")) {
                    adjustSizeToMultOf9(item);
                } else {
                    adjustSizeToMultOf9(item.parentNode);
                }
            });
            setTimeout(() => {
                if (mainMemberCol) {
                    mainMemberColPos = getMemMainColPos()
                    setMemLeftLine()
                    setMemRightLine()
                }
            }, 0);
        }
        memberItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemModContent = item.querySelector(".item-member__mod")
                if (itemModContent) {
                    let modTitle = itemModContent.getAttribute("data-title")
                    if (memberMod && modTitle && memberModContent) {
                        memberMod.querySelector(".modal__title").innerHTML = modTitle
                        memberModContent.innerHTML = itemModContent.innerHTML
                        openModal(memberMod)
                    }
                }
            })
        })
        callMemDashFunc()
        let currWinW = window.innerWidth
        const handleResize = debounce(() => {
            if (currWinW != window.innerWidth) {
                callMemDashFunc()
                currWinW = window.innerWidth

            }
        }, 200);
        window.addEventListener("resize", handleResize);
    }
}




// Логика с cookie баннером

(function () {
    const COOKIE_NAME = 'site_cookie_consent';
    const COOKIE_VALUE = 'accepted';
    const COOKIE_DAYS = 999;

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        let cookieStr = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
        if (location.protocol === 'https:') cookieStr += '; Secure';
        document.cookie = cookieStr;
    }

    function getCookie(name) {
        if (!document.cookie) return null;
        const pref = name + '=';
        const parts = document.cookie.split('; ');
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].indexOf(pref) === 0) return decodeURIComponent(parts[i].substring(pref.length));
        }
        return null;
    }

    function hasConsent() {
        return getCookie(COOKIE_NAME) === COOKIE_VALUE;
    }

    const popupEl = document.querySelector('#cookie-popup');

    if (typeof window.showCookie !== 'function') {
        window.showCookie = function () {
            if (popupEl) {
                popupEl.classList.add('show');
                popupEl.setAttribute('aria-hidden', 'false');
            }
        };
    }
    if (typeof window.unshowCookie !== 'function') {
        window.unshowCookie = function () {
            if (popupEl) {
                popupEl.classList.remove('show');
                popupEl.setAttribute('aria-hidden', 'true');
            }
        };
    }

    function initCookiePopup() {
        if (!hasConsent()) {
            window.showCookie();
        } else {
            window.unshowCookie();
        }

        const acceptBtn = popupEl ? popupEl.querySelector('.cookie__btns button') : null;
        if (acceptBtn && !acceptBtn._cookieHandlerAttached) {
            acceptBtn.addEventListener('click', function () {
                setCookie(COOKIE_NAME, COOKIE_VALUE, COOKIE_DAYS);
                if (typeof window.unshowCookie === 'function') window.unshowCookie();
            });

            acceptBtn._cookieHandlerAttached = true;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookiePopup);
    } else {
        initCookiePopup();
    }
})();



// Фикс пагинации

(function paginationFixer() {
    const debounce = (fn, ms = 120) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    };

    function updateOne(nav) {
        if (!nav) return;

        const items = Array.from(nav.querySelectorAll('.pagination__link, .pagination__item'));
        const numbered = items
            .map(el => {
                const m = el.textContent.match(/\d+/);
                return m ? { el, num: parseInt(m[0], 10) } : null;
            })
            .filter(Boolean);

        if (numbered.length === 0) {
            nav.querySelectorAll('.js-pagination-hide-duplicate').forEach(x => x.classList.remove('js-pagination-hide-duplicate'));
            nav.classList.remove('js-pagination-fixed');
            return;
        }

        const total = Math.max(...numbered.map(n => n.num));

        let current = nav.querySelector('.pagination__link.current, .pagination__link.active, .pagination__item.current, .pagination__item.active');
        if (!current) {
            current = nav.querySelector('.pagination__link:nth-last-child(2), .pagination__item:nth-last-child(2)');
        }
        if (!current) return;

        current.setAttribute('data-total', String(total));
        const curNumMatch = current.textContent.match(/\d+/);
        const curNum = curNumMatch ? curNumMatch[0] : current.textContent.trim();
        current.setAttribute('aria-label', `Страница ${curNum} из ${total}`);

        let lastElem = null;
        for (let i = numbered.length - 1; i >= 0; i--) {
            if (numbered[i].num === total) { lastElem = numbered[i].el; break; }
        }

        nav.querySelectorAll('.js-pagination-hide-duplicate').forEach(el => {
            if (el !== lastElem) el.classList.remove('js-pagination-hide-duplicate');
        });

        if (lastElem && lastElem !== current) {
            lastElem.classList.add('js-pagination-hide-duplicate');
        } else if (lastElem) {
            lastElem.classList.remove('js-pagination-hide-duplicate');
        }

        nav.classList.add('js-pagination-fixed');
    }

    function updateAll() {
        document.querySelectorAll('.pagination').forEach(updateOne);
    }

    const debouncedUpdateAll = debounce(() => {
        try { updateAll(); } catch (e) { console.error('paginationFixer error', e); }
    }, 80);

    function injectStyle() {
        if (document.getElementById('js-pagination-fix-style')) return;
        const style = document.createElement('style');
        style.id = 'js-pagination-fix-style';
        style.textContent = `
        @media (max-width: 1200.98px) {
        .js-pagination-fixed .pagination__link.current:after,
        .js-pagination-fixed .pagination__link.active:after,
        .js-pagination-fixed .pagination__item.current:after,
        .js-pagination-fixed .pagination__item.active:after {
            content: " из " attr(data-total) !important;
            margin-left: 0.2em !important;
            white-space: nowrap !important;
        }

        .js-pagination-fixed .js-pagination-hide-duplicate {
            display: none !important;
            visibility: hidden !important;
        }

        .js-pagination-fixed .pagination__link.current,
        .js-pagination-fixed .pagination__item.current {
            padding-right: 10 !important;
        }
        }
    `;
        document.head.appendChild(style);
    }

    injectStyle();

    const mo = new MutationObserver(mutations => {
        for (const mut of mutations) {
            if (mut.addedNodes && mut.addedNodes.length) {
                for (const node of mut.addedNodes) {
                    if (node.nodeType !== 1) continue;
                    if (node.classList && node.classList.contains('pagination')) {
                        debouncedUpdateAll();
                        return;
                    }
                    if (node.querySelector && node.querySelector('.pagination')) {
                        debouncedUpdateAll();
                        return;
                    }
                }
            }
            const target = mut.target && mut.target.closest && mut.target.closest('.pagination');
            if (target) { debouncedUpdateAll(); return; }
        }
    });

    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });

    document.addEventListener('click', (e) => {
        const t = e.target.closest && e.target.closest('.pagination__btn, .pagination__link, .pagination__item');
        if (!t) return;

        setTimeout(debouncedUpdateAll, 60);
        setTimeout(debouncedUpdateAll, 300);
        setTimeout(debouncedUpdateAll, 800);
    }, true);

    window.addEventListener('popstate', () => {
        setTimeout(debouncedUpdateAll, 60);
        setTimeout(debouncedUpdateAll, 300);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', debouncedUpdateAll);
    } else {
        debouncedUpdateAll();
    }

    window.__paginationFixer = { updateAll, updateOne };
})();