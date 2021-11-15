$(function () {

    var sliderModule = {

        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.functions.getData();
        },

        cacheDom: function () {
            this.self = this;
            this.$tabItem = $('.tabs-root .tabs-wrapper .tab-item');
            this.$tabItemContainer = $('.tabs-root .tabs-wrapper');
        },

        bindEvents: function () {
            $(document).on('click', $('.tabs-root .tabs-wrapper .tab-item'), this.functions.changeTab.bind(this));
        },

        functions: {
            getData: function() {
                $.ajax({
                    url: "../../static/data.json",
                    success: function (res) {
                        let data = res.responses[0].params.userCategories;
                        // Serve Menu list
                        data.map((item, index) => {
                            let dataTitle = item.indexOf('>') > 0 ? item.slice(0, item.indexOf('>')) : item;
                            $('.tabs-root .tabs-wrapper').append('<a href="javascript:;" class="tab-item " id="' + (index + 1) + '"><div class="text-item" >' + dataTitle + '</div></a>');
                            index == 0 ? $('.tabs-root .tabs-wrapper').find('.tab-item').first().addClass('active') : false;
                        });

                        //Serve Slider Data
                        let Sliderdata = res.responses[0].params.recommendedProducts;
                        Object.values(Sliderdata).map((item, index) => {
                            $('.tabs-content-root .tabs-content-wrapper').append('<div class="tabs-content-item owl-carousel owl-theme " data-id="' + (index+1) + '"></div>');
                            item.map((value, key) => {
                                $($('.tabs-content-item')[index]).append('<a href="' + value.url + '" class="tab-item"> ' +
                                '<div class="img-block">' + 
                                    '<img src="' + value.image + '" alt="'+ value.name +'">' +
                                '</div>' +
                                '<div class="title-block">' +
                                    '<p>'+ value.name +'</p>' +
                                '</div>' +
                                '<div class="price-block">' +
                                    '<p>' + value.priceText + '</p>' +
                                '</div>' +
                                '<div class="cargo-info">' +
                                   '<p><i class="fas fa-truck"></i> Ücretsiz Kargo</p>' +
                                '</div>' +
                            '</a>');
                            });
                            index == 0 ? $('.tabs-content-root .tabs-content-wrapper').find('.tabs-content-item').first().addClass('active') : false;
                            // run Slider Lib.
                            $('.owl-carousel').owlCarousel({
                                margin: 20,
                                nav: true,
                                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                                responsive: {
                                    0: {
                                        items: 2
                                    },
                                    600: {
                                        items: 3
                                    },
                                    1000: {
                                        items: 4
                                    }
                                }
                            })
                        });
                    }
                });
            },
            changeTab: function (e) {
                if($(e.target).hasClass('text-item')) {
                    this.functions.removeActiveTabs();
                    $(e.target).parent('.tab-item').addClass('active');
                    this.functions.openSelectedTabContent($(e.target).parent('.tab-item').prop('id'));
                }
                
            },
            removeActiveTabs: function () {
                $('.tabs-root .tabs-wrapper .tab-item').map(function (item, key) {
                    $(this).removeClass('active');
                });
            },
            openSelectedTabContent: function (e) {
                $('.tabs-content-item').map(function () {
                    if ($(this).data('id') == e) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }
                });
            }
        }
    };

    sliderModule.init();
});