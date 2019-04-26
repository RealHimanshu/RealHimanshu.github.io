'use strict';

$(document).ready(function(){
  var body = $("#rss-feeds");
  if (body.length > 0) {
    $.ajax('./blogs/posts/blogs.json', {
      type: 'GET',
      dataType: 'json',
      success: function(blogs) {
        for (var i = 0 ; i < blogs.all.length && i < 3 ; i++) {
            console.log(blogs.all[i]);
          $('#rss-feeds').append(`<div class="col-md-4">
            <a href="/blogs/#${blogs.all[i].md}">
              <div class="post-cards__card">
                <div class="post-cards__info">
                  <p class="post-cards__date">${blogs.all[i].create}</p>
                  <h3 class="post-cards_title">${blogs.all[i].title}</h3>
                </div>
              </div>
            </a>
          </div>`);
        }
      }
    });
  }
});

//Animate headers of .section
var hideHeader = function(header) {
    header.css('text-indent', '-9999px');
};

var showHeader = function(header) {
    header.css('text-indent', '0px');
};

var animateHeader = function(header, text) {
    //clear header text
    header.text("");
    //and animate it
    var nextAnimationStep = function() {
        if (text.length > 0) {
            header.text(header.text() + text.substr(0,1));
            text = text.substr(1);
            setTimeout(nextAnimationStep, 100);
        }
    };
    nextAnimationStep();
};

var animateHeaders = function(headers) {
    return Object.keys(headers).map(function(key, index) {
        var elementSelector = key;
        var offset = headers[key];
        var header = $(elementSelector);
        hideHeader(header);
        var waypoint = {};
        waypoint[key] = header.waypoint({
            handler: function() {
                showHeader(header);
                animateHeader(header, header.text());
                this.destroy();
            },
            offset: offset
        })[0];
        return waypoint;
    }).reduce(Object.assign, {});
};

//All ids of titles should be written here to animation work
var animatedHeaders = animateHeaders({
    "#hello_header": '90%',
    "#resume_header": '70%',
    "#portfolio_header": '70%',
    "#testimonials_header": '70%',
    "#blog_header": '70%',
    "#contacts_header": '70%',
    "#other_posts": '70%'
});
