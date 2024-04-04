$(document).ready(function () {
    // change color when select
    $("select").change(function () {
        $(this).css("color", "#000");
        $(this).css("font-style", "inherit");
    });

    $(".nav-login").click(function () {
        controller.close("slidebar");
        $(".slidebar").remove("open-slidebar");
        $(".fk-layer").removeClass("active");
        $("html,body").removeClass("overflow");
    });

    // }

    $(".menu-icon").click(function () {
        $("html").addClass("overflow-hidden");
        $(this).addClass("is-active");
        $(".menu-pc, .menu-mb").addClass("is-active");
        menu.play();
    });
    $(".close-menu").click(function () {
        $("html").removeClass("overflow-hidden");
        $(this).removeClass("is-active");
        $(".menu-pc, .menu-mb").removeClass("is-active");
        menu.reverse();
    });

    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 50) {
            $(".menu-mb").addClass("onscroll");
        } else {
            $(".menu-mb").removeClass("onscroll");
        }
    });

    var menu = gsap.timeline({
        paused: true,
    });
    menu.from(".menu-pc  li", { duration: 0.7, alpha: 0, stagger: 0.1, delay: 0.2, x: 40, ease: "back.out(3)" });
    menu.from(".menu-pc  .footer img ", { duration: 0.8, alpha: 0, scale: 1.05, ease: "power1.out()" }, "-=.8");

    var ani = gsap.timeline({
        paused: true,
    });
    ani.from(".ani", { duration: 1.2, alpha: 0, stagger: 0.1, delay: 0.2, y: 30, ease: "back.out(1.5)" });

    var gallery = gsap.timeline({});
    gallery.from(".gallery .item", {
        duration: 1.2,
        alpha: 0,
        stagger: 0.1,
        delay: 0.5,
        scale: 0.8,
        ease: "back.out(1.5)",
    });
    gallery.from(
        ".gallery .bl-action",
        {
            duration: 1.2,
            alpha: 0,
            stagger: 0.1,
            scale: 0.8,
            ease: "back.out(1.5)",
        },
        "-=1"
    );
    function loadingF() {
        setTimeout(function () {
            $(".loading").addClass("is-hide");
            ani.play();

            setTimeout(function () {
                $(".loading").hide();
            }, 500);
        }, 1000);
    }
    loadingF();
});

$(window).on("load", function () {
    $("html, body").animate(
        {
            scrollTop: 0,
        },
        100
    );
});
