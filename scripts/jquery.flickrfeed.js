 /**
 * Plug-in: flickrFeed
 * A plug-in to pull and display a flickr feed.
 */

/*globals jQuery */
"use strict";
(function ($) {
 
    $.fn.flickrFeed = function (options) {
     
        var settings = $.extend({
            id: "14610894@N03",
            name: "jonahlyng"
        }, options);
         
        return this.each(function () {
            var container = $(this);
            
            container.html('<span class="flickr-loader"><img src="images/ajax-loader.gif" /></span>');
            
            $.ajax({
                type: 'GET',
                url: 'http://api.flickr.com/services/feeds/photos_public.gne',
                data: 'id=' + settings.id + '&lang=en-us&format=json&jsoncallback=?',
                success: function (feed) {
                    var thumbs = [], fullurls = [], img, i, l = feed.items.length, j;
                    
                    for (i = 0, j = 1; i < l && i < 16; i += 1, j += 1) {
                        img = feed.items[i].media.m.replace(/^(.*?)_m\.jpg$/, '<a rel="lightbox" href="$1.jpg"><img id="img' + j + '" src="$1_s.jpg" alt="" /></a>');
                        thumbs.push(img);
                        fullurls.push(feed.items[i].link);
                    }
                    
                    container.html(thumbs.join(''));
                },
                error: function (xhr, error) {
                    container.html("An error occurred.".error);
                },
                dataType: 'jsonp'
            });

        });
     
    };
 
}(jQuery));
