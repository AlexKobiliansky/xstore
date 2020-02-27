$(document).ready(function(){


    /** mobile-mnu customization */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: '',
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");



    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /** end mobile-mnu customization */

    $('#mnu-btn').click(function(){
        $('.main-mnu-wrap').toggleClass('active');
        $('#page-container').toggleClass('active');
    });

    $('.main-mnu a').click(function(){
        $('.main-mnu-wrap').toggleClass('active');
        $('#page-container').toggleClass('active');
    });

    $('.close-mnu-realm').click(function(){
        console.log('clicked');
        $('.main-mnu-wrap').removeClass('active');
        $('#page-container').removeClass('active');
    });

    $('.tabs-container-1').tabs();
    $('.tabs-container-2').tabs();


    $('.slider-1').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 15,
        dots: true,
        autoHeight: true,
        navText: ["",""],
    });

    $('.slider-2').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 15,
        dots: true,
        autoHeight: true,
        navText: ["",""],
    });

    $('.visuals-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 15,
        dots: false,
        autoHeight: true,
        navText: ["",""],
    });

    $('.heads-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 15,
        dots: false,
        autoHeight: true,
        navText: ["",""],
    });




    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.preloader').fadeOut();

    $('.stylistic-item').photoswipe();

    $(".tagline-img").twentytwenty();










    $(window).scroll(function() {
        if($(this).scrollTop() > 100) {
            $('.mnu-line').addClass('sticky');
            $('.s-first').addClass('spaced');
            $('#page-container').removeClass('spaced');
        } else {
            $('.mnu-line').removeClass('sticky');
            $('.s-first').removeClass('spaced');
            $('#page-container').addClass('spaced');
        }
    });




    /** PARALLAX */
    (function() {
        var Parallax, initMap, throttle;

        window.scrollList = [];

        throttle = function(fn, env, time) {
            if (((time + 30) - Date.now()) < 0) {
                fn.call(env);
                return true;
            } else {
                return false;
            }
        };

        Parallax = (function() {
            function Parallax(node) {
                var top;
                this.node = $(node);
                this.listed = this.node.find(' > *');
                this.coef = [0.1, 0.2, 0.3, 0.4, 0.5];
                top = this.node.offset().top;
                this.top = top + parseInt(this.node.data('totop') ? this.node.data('totop') : 0);
                this.bot = top + this.node.height() + parseInt(this.node.data('tobot') ? this.node.data('tobot') : 0);
                this.reverse = this.node.data('reverse') ? true : false;
                this.horizontal = this.node.data('horizontal') ? true : false;
                this.doc = document.documentElement;
                this.init();
            }

            Parallax.prototype.init = function() {
                if (this.reverse) {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.rscroll, this]);
                    } else {
                        return window.scrollList.push([this.hrscroll, this]);
                    }
                } else {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.scroll, this]);
                    } else {
                        return window.scrollList.push([this.hscroll, this]);
                    }
                }
            };

            Parallax.prototype.scroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((P.top - top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.rscroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((top - P.top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.hscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((this.top - top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            Parallax.prototype.hrscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((top - this.top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            return Parallax;
        })();

        $('document').ready(function() {
            var parallaxTime;
            $('[data-node="parallax"]').each(function(index, node) {
                new Parallax(node);
                return true;
            });
            parallaxTime = Date.now();
            $(document).on('scroll', function() {
                var fnwe, j, len, ref, reset;
                reset = false;
                ref = window.scrollList;
                for (j = 0, len = ref.length; j < len; j++) {
                    fnwe = ref[j];
                    if (throttle(fnwe[0], fnwe[1], parallaxTime)) {
                        reset = true;
                    }
                }
                if (reset) {
                    return parallaxTime = Date.now();
                }
            });
            setTimeout(function() {
                return $(document).trigger('scroll');
            }, 100);
        });

    }).call(this);
    /** end PARALLAX */




    /**
     * toTop functionality start
     */
    $(window).scroll(function() {
        if($(this).scrollTop() > 1000) {
            $('#totop').css('opacity', '1');
            $('#totop').css('pointer-events', 'initial');
        } else {
            $('#totop').css('opacity', '0');
            $('#totop').css('pointer-events', 'none');
        }
    });

    $('body').bind('touchmove', function (e)
    {
        if($(this).scrollTop() > 1000) {
            $('#totop').css('opacity', '1');
            $('#totop').css('pointer-events', 'initial');
        } else {
            $('#totop').css('opacity', '0');
            $('#totop').css('pointer-events', 'none');
        }
    });

    $('#totop').click(function() {
        $('body,html').animate({scrollTop:0},600);
    });
    /**
     * toTop functionality end
     */
});
