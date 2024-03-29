(function($) {
    var $this = $(this);
    var methods = {
        init: function(args) {
            $(this).data('tutorial.settings', args);
            $(this).data('tutorial.total', args.length);
            $('body').append('<div id="shadow"></div>');
            $('#shadow').css({
                'background': '#333',
                'opacity': '0.8',
                'position': 'absolute',
                'left': 0,
                'top': 0,
                'z-index': 2147483641,
                'width': '100%',
                'height': $(document).height()
            }).hide();
            $('html').css({
                'overflow': 'hidden'
            });
            methods['start'].apply(this);
        },
        tooltip: function() {
            c = $(this).data('tutorial.current');
            $('#tutorial').remove();
            title = '';
            if (c['title']) {
                title = '<div class="title"><h3>'+ c['title'] + '</h3><a id="tutorial-close" href="#close"></a></div>';
            }
            $('body').append('<div id="tutorial"><div id="tutorial-content">' + title + '<div class="description">' + c['description'] + '</div><p></p></div></div>');
            if ($(c['element']).length) {
                eOffset = $(c['element']).offset();
                if (c['position'] == 'right') {
                    xOffset = eOffset.top;
                    yOffset = eOffset.left + $(c['element']).width();
                }
                else if (c['position'] == 'left') {
                    xOffset = eOffset.top;
                    yOffset = eOffset.left - $('#tutorial').width();
                }
                else if (c['position'] == 'bottom') {
                    xOffset = eOffset.top + ($(c['element']).height() + 10);
                    yOffset = eOffset.left;
                }
                else if (c['position'] == 'top') {
                    xOffset = eOffset.top - ($(c['element']).height() + 10);
                    yOffset = eOffset.left;
                }
                else if (c['position'] == 'overlay') {
                    xOffset = eOffset.top + 50;
                    yOffset = eOffset.left + 50;
                }
            }
            else {
                xOffset = $('#tutorial').height() * 2;
                yOffset = ($(document).width() - $('#tutorial').width()) / 2;
            }
            $('#tutorial').css({
                'top':  xOffset + 'px',
                'left': yOffset + 'px',
                'position': 'absolute',
                'z-index': 2147483646
            }).fadeIn('fast');
            $('#tutorial').attr('class', 'position-' + $(this).data('tutorial.current')['position']);
            $('#tutorial-close').click(function() {
                $('body').tutorial('close');
                return false;
            });
            if ($(this).data('tutorial.i') > 0) {
                $('#tutorial p').append($('<a id="tutorial-prev" href="#prev"></a>'));
                $('#tutorial-prev').click(function() {
                    $('body').tutorial('previous');
                    return false;
                });
            }
            if ($(this).data('tutorial.i') < ($(this).data('tutorial.total') - 1)) {
                $('#tutorial p').append($('<a id="tutorial-next" href="#next"></a>'));
                $('#tutorial-next').click(function() {
                    $('body').tutorial('next');
                    return false;
                });
            }
            return $this;
        },
        show: function() {
            c = $(this).data('tutorial.current');
            i = $(this).data('tutorial.i');
            if ($($(this).data('tutorial.previous')).length) {
                $($(this).data('tutorial.previous')['element']).css({
                    'position': $($(this).data('tutorial.previous')['element']).data('tutorial.position'),
                    'z-index': $($(this).data('tutorial.previous')['element']).data('tutorial.z-index')
                });
                if ($(this).data('tutorial.previous')['element'] == '#login-pane') {
                    $('.header').css('z-index', 2147483639);
                    $('.search').show();
                }

            }
            $('#shadow').show();
            if ($(c['element']).length) {
                $(c['element']).data('tutorial.position', $(c['element']).css('position'));
                $(c['element']).data('tutorial.z-index', $(c['element']).css('z-index'));
                $(c['element']).css({
                    'position': 'relative',
                    'z-index': 2147483643
                });
                if (c['element'] == '#login-pane') {
                    $('.header').css('z-index', 2147483644);
                    $('.search').hide();
                }
            }
            methods['tooltip'].apply(this);
            return $(this);
        },
        start: function() {
            $(this).data('tutorial.i', 0);
            $(this).data('tutorial.current', $(this).data('tutorial.settings')[0]);
            methods['show'].apply(this);
        },
        next: function() {
            i = $(this).data('tutorial.i');
            i = i + 1;
            s = $(this).data('tutorial.settings');
            $(this).data('tutorial.i', i);
            $(this).data('tutorial.previous', $(this).data('tutorial.current'));
            $(this).data('tutorial.current', s[i]);
            methods['show'].apply(this);
        },
        previous: function() {
            i = $(this).data('tutorial.i');
            i = i - 1;
            s = $(this).data('tutorial.settings');
            $(this).data('tutorial.i', i);
            $(this).data('tutorial.previous', $(this).data('tutorial.current'));
            $(this).data('tutorial.current', s[i]);
            methods['show'].apply(this);
        },
        close: function() {
            $('#tutorial').remove();
            $('#shadow').remove();
            c = $(this).data('tutorial.current');
            if ($(c['element']).length) {
                $(c['element']).css({
                    'position': $($(this).data('tutorial.current')['element']).data('tutorial.position'),
                    'z-index': $($(this).data('tutorial.current')['element']).data('tutorial.z-index')
                });
            }
            $('html').css({
                'overflow': 'auto'
            });
        }
    };
    $.fn.tutorial = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.tutorial');
        }
    };
})(jQuery);
