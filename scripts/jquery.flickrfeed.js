 /**
 * Plug-in: flickrFeed
 * A plug-in to pull and display a flickr feed.
 */

/*globals jQuery */
"use strict";
(function ($) {
 
    $.fn.flickrFeed = function (options) {
     
        var settings = $.extend({
            uid: "14610894@N03",
            uname: "jonahlyng"
        }, options);       
         
        this.each(function () {
            var container = $(this);
            
            $(this).html('<span id="loader"><img src="images/ajax-loader.gif" /></span>');
            
            $.ajax({
                type: 'GET',
                url: 'http://api.flickr.com/services/feeds/photos_public.gne',
                data: 'id=' + settings.uid + '&lang=en-us&format=json&jsoncallback=?',
                success: function (feed) {
                    var thumbs = [], fullurls = [], img, i, l, j;
                    
                    for (i = 0, l = feed.items.length, j = 1; i < l && i < 16; i += 1, j += 1) {
                        img = feed.items[i].media.m.replace(/^(.*?)_m\.jpg$/, '<a rel="lightbox" href="$1.jpg"><img id="img' + j + '" src="$1_s.jpg" alt="" /></a>');
                        thumbs.push(img);
                        fullurls.push(feed.items[i].link);
                    }
                    
                    container.html(thumbs.join(''));
            
                },
                dataType: 'jsonp'
            });

        });

        return this;
     
    };
 
}(jQuery));
