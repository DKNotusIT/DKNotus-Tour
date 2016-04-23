var Tour = (function(){
  var t, o, cur;

  function step(n)
  {
    cur = n;
    $('.tourStep, .tourBg').remove();

    if (!t[n])
    {
      return;
    }

    for (var k in o) {
      if (typeof t[n][k] == 'undefined')
      {
        t[n][k] = o[k];
      }
    };

    $('body').append([
      '<div class="tourStep popover" step="' + n + '">',
        '<div class="arrow"></div>',
        '<div class="panel-default">',
          !t[n].close ? '' : '<button class="tourClose close pull-right">&times;&nbsp;</button>',
          '<div class="panel-body">',
            t[n].content,
          '</div>',
          '<div class="panel-footer">',
            '<div class="pull-right">',
              '<div class="tourPrev btn btn-default btn-sm">Previous</div> ',
              '<div class="tourNext btn btn-primary btn-sm">Next</div>',
            '</div>',
            '<h6>step ' + (n + 1) + ' / ' + t.length + '</h6>',
          '</div>',
        '</div>',
      '</div>'
    ].join(''));

    if (true)
    {
      $('body').append(Array(5).join('<div class="tourBg"></div>'));
    }

    var el = $('.tourStep')
          .addClass(t[n].position)
          .css({
            minWidth: 250
          }),
        x = 0,
        y = 0;

    if (t[n].element && !!t[n].element.length)
    {
      var x1 = 0xffff,
          y1 = 0xffff,
          x2 = 0,
          y2 = 0;

      t[n].element.each(function(k, v){
        var ofs = $(v).offset();
        x1 = Math.min(x1, ofs.left);
        y1 = Math.min(y1, ofs.top);
        
        x2 = Math.max(x2, ofs.left
          + parseInt($(v).css('border-left-width'))
          + parseInt($(v).css('padding-left'))
          + $(v).width()
          + parseInt($(v).css('padding-right'))
          + parseInt($(v).css('border-right-width'))
        );

        y2 = Math.max(y2, ofs.top
          + parseInt($(v).css('border-top-width'))
          + parseInt($(v).css('padding-top'))
          + $(v).height()
          + parseInt($(v).css('padding-bottom'))
          + parseInt($(v).css('border-bottom-width'))
        );
      });

      switch (t[n].position)
      {
        case 'top':
          y = y1 - el.height();
          x = ((x1 + x2) >> 1) - (el.width() >> 1);
          break;

        case 'right':
          y = ((y1 + y2) >> 1) - (el.height()>> 1);
          x = x2;
          break;

        case 'left':
          y = ((y1 + y2) >> 1) - (el.height()>> 1);
          x = x1 - el.width();
          break;

        case 'bottom':
          y = y2;
          x = ((x1 + x2) >> 1) - (el.width() >> 1);
          break;
      };
    };

    el
      .css({
        position: 'absolute',
        left: x,
        top: y
      })
      .show();

    if (true)
    {
      var p = t[n].padding;

      var pos = [
        {bottom: 'auto', height: y1 - p},
        {top: y2 + p, height: $(document).height() - y2 - p},
        {right: 'auto', bottom: 'auto', top: y1 - p, width: x1 - p, height: 2 * p + y2 - y1},
        {left: x2 + p, bottom: 'auto', top: y1 - p, height: 2 * p + y2 - y1}
      ];

      $('.tourBg')
        .css({
          position: 'absolute',
          zIndex: 1000,
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background: '#000',
          opacity: 0.3
        }).each(function(k, v){
          $(v).css(pos[k]);
        });
    }

    if (!n)
    {
      $('.tourPrev').remove();
    }

    if (n > t.length - 2)
    {
      $('.tourNext').text('Finish');
    }

    $('.tourNext').click(Tour.next);
    $('.tourPrev').click(Tour.prev);

    $('.tourClose').click(function(){
      step(-1);
    });
  }

  return {
    run: function(tour, options)
    {
      try {
        t = [];
        cur = 0;

        o = {
          close: true,
          position: 'right',
          padding: 5
        };

        $(tour).each(function(k, v){
          if (v.element && !!v.element.length)
          {
            t.push(v);
          }
        });

        $(options).each(function(k, v){
          o[k] = v;
        });

        step(cur);
      } catch(e) {}
    },

    next: function(){
      step(cur + 1);
    },

    prev: function(){
      step(cur - 1);
    },

    current: function(){
      return cur;
    }
  };
})();
