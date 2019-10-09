$(function () {
    data.callLoadJson();
    animateContruction();
    spotLight(15);
    forward();
});

$(document).keyup(function (e) {
    switch (e.keyCode) {
        case 37:
            if (!G_IsSlide) {
                backward();
            }
            break;
        case 39:
            if (!G_IsSlide) {
                forward();
            }
            break;
    }
});

$(window).swipe({
    //Generic swipe handler for all directions
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == "left") {
            if (!G_IsSlide) {
                forward();
            }
        } else if (direction == "right") {
            if (!G_IsSlide) {
                backward();
            }
        }
    },
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        // scroll up
        if (!G_IsSlide) {
            backward();
        }
    }
    else {
        // scroll down
        if (!G_IsSlide) {
            forward();
        }
    }
});


// SLIDE REGION
function goto(id) {
    if (G_Page == id) {
        return;
    } else {
        G_TL = new TimelineMax({ onStart: prepareSlide, onComplete: afterSlide });
        var currentPageId = (G_Page == -1) ? 0 : G_Page;
        var currentPage = G_PageIDs[currentPageId].id;
        var nextPageId = id;
        var nextPage = G_PageIDs[nextPageId].id;

        setGlobalPageVariables(nextPageId, currentPage, nextPage);
        animateSlidePageDown(currentPageId, currentPage, nextPageId, nextPage);
    }
}

function forward() {
    G_TL = new TimelineMax({ onStart: prepareSlide, onComplete: afterSlide });
    var currentPageId = (G_Page == -1) ? 0 : G_Page;
    var currentPage = G_PageIDs[currentPageId].id;

    if (G_Page == G_PageIDs.length - 1) {
        return;
    } else if (G_Page == -1) {
        setGlobalPageVariables(currentPageId, currentPage, null);
        window[G_PageIDs[currentPageId].beginFunc]();
    } else {
        var nextPageId = currentPageId + 1;
        var nextPage = G_PageIDs[nextPageId].id;

        setGlobalPageVariables(nextPageId, currentPage, nextPage);
        animateSlidePageDown(currentPageId, currentPage, nextPageId, nextPage);
    }
}

function backward() {
    G_TL = new TimelineMax({ onStart: prepareSlide, onComplete: afterSlide });
    var currentPageId = (G_Page == -1) ? 0 : G_Page;
    var currentPage = G_PageIDs[currentPageId].id;

    if (G_Page == -1 || G_Page == 0) {
        return;
    } else {
        var nextPageId = currentPageId - 1;
        var nextPage = G_PageIDs[nextPageId].id;

        setGlobalPageVariables(nextPageId, currentPage, nextPage);
        animateSlidePageUp(currentPageId, currentPage, nextPageId, nextPage);
    }
}

function prepareSlide() {
    if (G_NextPage !== null) {
        $(G_NextPage).removeClass(G_SlideClass.inactive).addClass(G_SlideClass.preactive);
    }

    setSliderStatus();
}

function afterSlide() {
    if (G_CurrentPage !== null && G_NextPage !== null) {
        $(G_CurrentPage).removeClass(G_SlideClass.active).addClass(G_SlideClass.inactive);
        $(G_NextPage).removeClass(G_SlideClass.preactive).addClass(G_SlideClass.active);
    }

    reset();
    setSliderStatus();
    changeSlideStatus();
}

//ANIME SLIDE PAGE REGION
function animateSlidePageDown(currentPageId, currentPage, nextPageId, nextPage) {
    window[G_PageIDs[currentPageId].endFunc]();
    G_TL.to(currentPage, .5, { opacity: 0, ease: Power3.easeOut });
    if (!G_PageIDs[nextPageId].isSlide || nextPageId == 0 || nextPageId == G_PageIDs.length - 1)
        window[G_PageIDs[nextPageId].beginFunc]();
}

function animateSlidePageUp(currentPageId, currentPage, nextPageId, nextPage) {
    //window[G_PageIDs[currentPageId].endFunc]();
    G_TL.to(currentPage, .5, { opacity: 0, ease: Power3.easeOut });
    if (!G_PageIDs[nextPageId].isSlide || nextPageId == 0 || nextPageId == G_PageIDs.length - 1)
        window[G_PageIDs[nextPageId].beginFunc]();
}

//WELCOME REGION
function animateWelcomeBegin() {
    G_TL.from("#welcome .slider-container > .welcome-text-header", 1, { opacity: 0, ease: Bounce.easeOut, y: -200 })
        .from("#welcome .slider-container > .welcome-text", 1, { opacity: 0, ease: Bounce.easeOut, x: -200 })
        .from("#welcome .moon", 1, { opacity: 0, x: -200 }, '-=1')
        .to("#welcome .earth", 1, { opacity: 1, y: 0 }, '-=1')
        ;

    G_AnimeMoon.play();
    G_AnimeEarth.play();
    G_AnimeAstronaut.play();
    G_Spaceship.play();

}

function animateWelcomeEnd() {
    G_TL.to("#welcome .slider-container > .welcome-text", 0, { opacity: 0 })
        .to("#welcome .slider-container > .welcome-text-header", .5, { scale: 0, opacity: 0 })
        ;
    G_AnimeMoon.pause();
    G_AnimeEarth.pause();
    G_AnimeAstronaut.pause();
    G_Spaceship.pause();
}

//WELCOME REGION
function animateOverviewBegin() {
    anime({
        targets: '#overview .background-behind .svg path',
        strokeDashoffset: [-2000, 0],
        easing: 'easeInOutCubic',
        duration: 6000,
        //delay: function (el, i) { return i * 250 },
    });

    //anime({
    //    targets: '#overview .background-behind .svg circle',
    //    opacity: [0, 1],
    //    easing: 'easeInOutCubic',
    //    duration: 1000,
    //    loop: true,
    //    direction: 'alternate',
    //    delay: anime.stagger(100)
    //});

    G_TL.from("#overview .slider-container .profile .welcome-text-header", .5, { opacity: 0, scale: 0 })
        .from("#overview .slider-container .profile .title", .5, { opacity: 0, ease: Power0.easeNone, x: -100 })
        .from("#overview .slider-container .profile .summary", .5, { opacity: 0, ease: Power0.easeNone })
        .from("#overview .outlook .avatar .avatar-img", .5, { opacity: 0, ease: Power0.easeNone, x: 100 }, '-=1')
        .staggerFrom("#overview .hashtag .hashtag-item", .5, { opacity: 0, scale: 10 }, 0.1)
        .from("#overview .outlook .quote", .5, { opacity: 0, ease: Bounce.easeOut, y: 100 })
        ;
}

function animateOverviewEnd() {

}

//LIFE REGION
function animateLifeBegin() {
    G_TL.fromTo("#life-story #life-1 .line", 0.5, { opacity: 0, height: '0%' }, { opacity: 1, height: '50%' })
        .addLabel("1", "-=0.5")
        .from("#life-story #life-1 .circle-out", 1, { scale: 0, opacity: 0 }, "1")
        .from("#life-story #life-1 .circle", 1, { scale: 0, opacity: 0 }, "1")
        .from("#life-story #life-1 .year", 1, { opacity: 0 }, "1+=0.5")
        .from("#life-story #life-1 .break", 1, { opacity: 0, width: '0%' }, "1")
        .from("#life-story #life-1 .dot", 1, { opacity: 0 }, "1+=0.5")
        .from("#life-story #life-1 .title", 1, { y: -100, opacity: 0 }, "1+=0.5")
        .from("#life-story #life-1 .detail", 1, { y: 100, opacity: 0 }, "1+=0.5")
        .fromTo("#life-story #life-1 .line", 0.5, { height: '50%' }, { height: '100%', ease: Linear.easeNone }, "1+=1")
        //2
        .fromTo("#life-story #life-2 .line", 0.5, { opacity: 0, height: '0%' }, { opacity: 1, height: '50%', ease: Linear.easeNone })
        .addLabel("2", "-=0.5")
        .from("#life-story #life-2 .circle-out", 1, { scale: 0, opacity: 0 }, "2")
        .from("#life-story #life-2 .circle", 1, { scale: 0, opacity: 0 }, "2")
        .from("#life-story #life-2 .year", 1, { opacity: 0 }, "2+=0.5")
        .from("#life-story #life-2 .break", 1, { opacity: 0, width: '0%' }, "2")
        .from("#life-story #life-2 .dot", 1, { opacity: 0 }, "2+=0.5")
        .from("#life-story #life-2 .title", 1, { y: -100, opacity: 0 }, "2+=0.5")
        .from("#life-story #life-2 .detail", 1, { y: 100, opacity: 0 }, "2+=0.5")
        .fromTo("#life-story #life-2 .line", 0.5, { height: '50%' }, { height: '100%', ease: Linear.easeNone }, "2+=1")
        //3
        .fromTo("#life-story #life-3 .line", 0.5, { opacity: 0, height: '0%' }, { opacity: 1, height: '50%', ease: Linear.easeNone })
        .addLabel("3", "-=0.5")
        .from("#life-story #life-3 .circle-out", 1, { scale: 0, opacity: 0 }, "3")
        .from("#life-story #life-3 .circle", 1, { scale: 0, opacity: 0 }, "3")
        .from("#life-story #life-3 .year", 1, { opacity: 0 }, "3+=0.5")
        .from("#life-story #life-3 .break", 1, { opacity: 0, width: '0%' }, "3")
        .from("#life-story #life-3 .dot", 1, { opacity: 0 }, "3+=0.5")
        .from("#life-story #life-3 .title", 1, { y: -100, opacity: 0 }, "3+=0.5")
        .from("#life-story #life-3 .detail", 1, { y: 100, opacity: 0 }, "3+=0.5")
        .fromTo("#life-story #life-3 .line", 0.5, { height: '50%' }, { height: '100%', ease: Linear.easeNone }, "3+=1")
        //4
        .fromTo("#life-story #life-4 .line", 0.5, { opacity: 0, height: '0%' }, { opacity: 1, height: '50%', ease: Linear.easeNone })
        .addLabel("4", "-=0.5")
        .from("#life-story #life-4 .circle-out", 1, { scale: 0, opacity: 0 }, "4")
        .from("#life-story #life-4 .circle", 1, { scale: 0, opacity: 0 }, "4")
        .from("#life-story #life-4 .year", 1, { opacity: 0 }, "4+=0.5")
        .from("#life-story #life-4 .break", 1, { opacity: 0, width: '0%' }, "4")
        .from("#life-story #life-4 .dot", 1, { opacity: 0 }, "4+=0.5")
        .from("#life-story #life-4 .title", 1, { y: -100, opacity: 0 }, "4+=0.5")
        .from("#life-story #life-4 .detail", 1, { y: 100, opacity: 0 }, "4+=0.5")
        .fromTo("#life-story #life-4 .line", 0.5, { height: '50%' }, { height: '100%', ease: Linear.easeNone }, "4+=1")
        //5
        .fromTo("#life-story #life-5 .line", 0.5, { opacity: 0, height: '0%' }, { opacity: 1, height: '50%', ease: Linear.easeNone })
        .addLabel("5", "-=0.5")
        .from("#life-story #life-5 .circle-out", 1, { scale: 0, opacity: 0 }, "5")
        .from("#life-story #life-5 .circle", 1, { scale: 0, opacity: 0 }, "5")
        .from("#life-story #life-5 .year", 1, { opacity: 0 }, "5+=0.5")
        .from("#life-story #life-5 .break", 1, { opacity: 0, width: '0%' }, "5")
        .from("#life-story #life-5 .dot", 1, { opacity: 0 }, "5+=0.5")
        .from("#life-story #life-5 .title", 1, { y: -100, opacity: 0 }, "5+=0.5")
        .from("#life-story #life-5 .detail", 1, { y: 100, opacity: 0 }, "5+=0.5")
        .fromTo("#life-story #life-5 .line", 0.5, { height: '50%' }, { height: '100%' }, "5+=1")
        //6
        .fromTo("#life-story #life-6 .line", 0.5, { opacity: 0, height: '0%' }, { opacity: 1, height: '50%', ease: Linear.easeNone })
        .addLabel("6", "-=0.5")
        .from("#life-story #life-6 .circle-out", 1, { scale: 0, opacity: 0 }, "6")
        .from("#life-story #life-6 .circle", 1, { scale: 0, opacity: 0 }, "6")
        .from("#life-story #life-6 .year", 1, { opacity: 0 }, "6+=0.5")
        .from("#life-story #life-6 .break", 1, { opacity: 0, width: '0%' }, "6")
        .from("#life-story #life-6 .dot", 1, { opacity: 0 }, "6+=0.5")
        .from("#life-story #life-6 .title", 1, { y: -100, opacity: 0 }, "6+=0.5")
        .from("#life-story #life-6 .detail", 1, { y: 100, opacity: 0 }, "6+=0.5")
        .fromTo("#life-story #life-6 .line", 0.5, { height: '50%' }, { height: '100%' }, "6+=1")
        ;
}

function animateLifeEnd() {

}

//COMPETENCY REGION
function animateCompetencyBegin() {
    G_TL.call(drawChart, ["#technical-chart", "Programing Languages", G_TechDataSet])
        .from("#competency .slider-container .row", 1, { opacity: 0 })
        .from("#competency .slider-container .box", 1, { opacity: 0, y: -100 })
        .addLabel("number", "-=2")
        .call(faceNumber, ['#competency .year', G_Year, '', '+'], "number")
        .call(faceNumber, ['#competency .project', G_Project, '', '+'], "number")
        .call(faceNumber, ['#competency .role', G_Role], "number")
        .call(faceNumber, ['#competency .toeic', G_TOEIC, '', '+'], "number")
        .call(faceNumber, ['#competency .jlpt', G_JLPT, 'N'], "number")
        .call(faceNumber, ['#competency .cert', G_CERT], "number")
        .addLabel("work")
        .from("#competency .framework", 1, { opacity: 0 }, "work")
        .from("#competency .achievement", 1, { opacity: 0 }, "work")
        .from("#competency .other", 1, { opacity: 0 }, "work")
        .staggerFrom("#competency .background-behind div", .5, { opacity: 0 }, 0.1, "work")
        ;
}

function animateCompetencyEnd() {

}

//ABOUT REGION
function animateAboutBegin() {
    G_BackgroundTL.play();
    G_TL.staggerFrom("#about .conclude .item", 1, { opacity: 0, x: -100 }, 0.5)
        .staggerFrom("#about .contact-infor .contact", 1, { opacity: 0, y: -100 }, 0.5)
        .from("#about .background-behind-other .powered-by", 1, { opacity: 0 })
        .staggerFrom("#about .background-behind-other img", 3, { opacity: 0 }, 0.5)
        ;
}

function animateAboutEnd() {

}
//GOODBYE REGION
function animateGoodbyeBegin() {

}

function animateGoodbyeEnd() {

}

//ANIME CONSTRUCTION REGION
function animateContruction() {
    G_AnimeMoon = anime({
        targets: '#welcome .moon img',
        translateY: 10,
        easing: 'linear',
        duration: 1000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
    });

    G_AnimeEarth = anime({
        targets: '#welcome .earth img',
        rotate: 1.5,
        easing: 'linear',
        duration: 1000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
    });

    G_AnimeAstronaut = anime({
        targets: '#welcome .astronaut',
        keyframes: [
            { translateX: '115vw' },
            { translateY: '-10vh' },
            { translateX: '-115vw' },
        ],
        rotate: { value: '+= 10turn' },
        easing: 'linear',
        duration: 50000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
    });

    G_SpaceshipPath = anime.path('#welcome path');

    G_Spaceship = anime({
        targets: '#welcome .spaceship',
        translateX: G_SpaceshipPath('x'),
        translateY: G_SpaceshipPath('y'),
        rotate: G_SpaceshipPath('angle'),
        scale: 10,
        easing: 'linear',
        duration: 100000,
        loop: true,
        autoplay: false,
    });

    backgroundConstruction('#about .background-behind', G_XItem, G_YItem);
    animeBackground('#about .background-behind .background-item .circle');
}

// CHART REGION
function drawChart(object, title, data) {
    var ctx = $(object);
    var myChart = new Chart(ctx, {
        type: 'pie',
        easing: 'easeOutQuad',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'dataset',
                data: data.data,
                backgroundColor: data.backgroundColor
            }],
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'bottom',
                fullWidth: true,
                labels: {
                    boxWidth: 1.7,
                    boxUnit: 'vmin',
                    fontSize: 1.7,
                    fontUnit: 'vmin',
                    fontColor: 'rgba(255,255,255,1)',
                    padding: 5,
                }
            },
            title: {
                display: false,
                position: 'top',
                text: title,
                fontColor: 'rgb(16, 82, 107)',
                fontSize: 2.5,
                fontUnit: 'vmin',
            },
        },

    });
}

function faceNumber(obj, num, before = '', after = '') {
    var selector = document.querySelector(obj);
    var temp = {
        number: 0,
    }
    anime({
        targets: temp,
        number: num,
        round: 1,
        easing: 'linear',
        update: function () {
            selector.innerHTML = before + anime.random(0, num) + after;
        },
        complete: function () {
            selector.innerHTML = before + num + after;
        }
    });
}

//BACKGROUND REGION
function backgroundConstruction(selector, xItem = 10, yItem = 10) {
    $(selector).empty();

    for (i = 0; i < (yItem * xItem); i++) {
        $(selector).prepend('<div class="background-item"><div class="circle"></div></div>');
    }
}

function animeBackground(selector, times = 2) {
    G_BackgroundTL = anime.timeline({
        easing: 'easeInOutQuad',
        autoplay: false,
    });
    var total = G_XItem * G_YItem;
    var num = anime.random(0, total);

    G_BackgroundTL.add(
        {
            targets: selector,
            width: '2.5vmin',
            height: '2.5vmin',
            rotate: '1turn',
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,1) 8%, rgba(211,205,198,1) 100%)',
            borderRadius: ['0%', '50%'],
            duration: 1000,
            delay: anime.stagger(80, { grid: [G_XItem, G_YItem], start: 0, from: 'center' }),
        }
    )

    for (i = 0; i <= times; i++) {
        num = anime.random(0, total);
        G_BackgroundTL.add(
            {
                targets: selector,
                scale: [
                    { value: 0.75, easing: 'easeOutSine', duration: 225 },
                    { value: 2, easing: 'easeOutSine', duration: 225 },
                    { value: 1, easing: 'easeInOutQuad', duration: 1200 }
                ],
                //translateX: anime.stagger([0, '1vmin', 0], { grid: [G_XItem, G_YItem], from: num, axis: 'x' }),
                //translateY: anime.stagger([0, '1vmin', 0], { grid: [G_XItem, G_YItem], from: num, axis: 'y' }),
                delay: anime.stagger(80, { grid: [G_XItem, G_YItem], start: 0, from: num }),
            }
        )
    }

    G_BackgroundTL.add(
        {
            targets: selector,
            scale: 2,
            translateX: 0,
            translateY: 0,
            rotate: '1turn',
            opacity: 0,
            borderRadius: ['50%', '0%'],
            duration: 1000,
            delay: anime.stagger(80, { grid: [G_XItem, G_YItem], start: 0, from: 'center' }),
        }
    )
}

//SPOTLIGHT REGION
function spotLight(spotNumber) {
    var top, left, width, height, delay, duration;
    var spotString = '<div class="spot" style="top: $top; left: $left; width: $width; height: $height; animation-delay: $delay; animation-duration: $duration;"></div>';
    var $spotLight = $('.spot-light');
    for (i = 0; i < spotNumber; i++) {
        top = (Math.random() * 100) + '%';
        left = (Math.random() * 100) + '%';
        width = Math.floor(Math.random() * 3) + 1 + 'px';
        height = width;
        delay = Math.floor(Math.random() * 3) + 's';
        duration = Math.floor(Math.random() * 3) + 1 + 's';
        var string = spotString.replace('$top', top).replace('$left', left).replace('$width', width).replace('$height', height).replace('$delay', delay).replace('$duration', duration);

        $spotLight.append(string);
    }
}

//OBJECT INTERACTION REGION
$(".astronaut").click(function () {
    G_AnimeAstronaut.pause();
    anime({
        delay: 500,
        targets: '#welcome .astronaut',
        translateY: '50vh',
        rotate: { value: '+=5turn' },
        easing: 'linear',
        duration: 1000,
        complete: function () { G_AnimeAstronaut.seek(0); },
    });
});

$(".spaceship").click(function () {
    G_Spaceship.pause();
    anime({
        delay: 500,
        targets: '#welcome .spaceship',
        translateY: '-100vh',
        translateX: '100vw',
        rotate: { value: '5turn' },
        scale: 1,
        easing: 'linear',
        duration: 2000,
        complete: function () { G_Spaceship.seek(0); },
    });
});

//COMMON REGION
function setGlobalPageVariables(pageId, currentPage, nextPage) {
    if (pageId !== undefined) {
        G_Page = pageId;
    }
    if (currentPage !== undefined) {
        G_CurrentPage = currentPage;
    }
    if (nextPage !== undefined) {
        G_NextPage = nextPage;
    }
}
function setSliderStatus() {
    if (G_IsSlide)
        G_IsSlide = false;
    else
        G_IsSlide = true;
}

function changeSlideStatus() {
    if (G_PageIDs[G_Page].isSlide == 0) {
        G_PageIDs[G_Page].isSlide = 1;
    }
}

function nextPage() {
    if (G_Page == G_PageIDs.length - 1) {
        return;
    } else {
        G_Page++;
        changeSlideStatus();
    }
}

function nextPage() {
    if (G_Page == 0) {
        return;
    } else {
        G_Page--;
        changeSlideStatus();
    }
}

function getPageID() {
    return G_PageIDs[G_Page].id;
}

function reset() {
    TweenMax.set(".slider", { clearProps: 'all' });
    TweenMax.set(".anime", { clearProps: 'all' });
}
