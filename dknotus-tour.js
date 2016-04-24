var Tour = (function(){
  var t = [],
      o, cur
      T = {
        step: {
          en: 'step',
          pl: 'krok'
        },
        next: {
          en: 'Next',
          pl: 'Nastepny'
        },
        prev: {
          en: 'Previous',
          pl: 'Poprzedni'
        },
        finish: {
          en: 'Finish',
          pl: 'Zakończ'
        },
      };

  function _t(s)
  {
    return typeof T[s][t[cur].language] == 'undefined' ? T[s]['en'] : T[s][t[cur].language];
  }

  function step(n)
  {
    cur = n;
    $('.tourStep, .tourBg').remove();

    if (!t[n])
    {
      return;
    }

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
              '<div class="tourPrev btn btn-default btn-sm">' + _t('prev') + '</div> ',
              '<div class="tourNext btn btn-primary btn-sm">' + _t('next') + '</div>',
            '</div>',
            '<h6>' + _t('step') + ' ' + (n + 1) + ' / ' + t.length + '</h6>',
          '</div>',
        '</div>',
      '</div>'
    ].join(''));

    var el = $('.tourStep')
          .addClass(t[n].position)
          .css({
            minWidth: 250
          }),
        x = 0,
        y = 0;

    if (t[n].element && !!t[n].element.length)
    {
      var x1 = 1e6,
          y1 = 1e6,
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

    if (t[n].spotlight)
    {
      var p = t[n].padding;
      $('body').append(Array(5).join('<div class="tourBg"></div>'));

      var pos = [
        {
          bottom: 'auto',
          height: y1 - p
        },
        {
          top: y2 + p,
          height: $(document).height() - y2 - p
        },
        {
          right: 'auto',
          bottom: 'auto',
          top: y1 - p,
          width: x1 - p,
          height: 2 * p + y2 - y1
        },
        {
          left: x2 + p,
          bottom: 'auto',
          top: y1 - p,
          height: 2 * p + y2 - y1
        }
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

    if (!!t[n].scroll)
    {
      var my = ((Math.min(y, y1) + Math.max(y + el.height(), y2)) >> 1) - ($(window).height() >> 1),
          mx = ((Math.min(x, x1) + Math.max(x + el.width(),  x2)) >> 1) - ($(window).width()  >> 1);

      $('html, body').animate({
        scrollTop:  Math.max(0, Math.min(y, y1, my)),
        scrollLeft: Math.max(0, Math.min(x, x1, mx))
      });
    }

    if (!n)
    {
      $('.tourPrev').remove();
    }

    if (n > t.length - 2)
    {
      $('.tourNext').text(_t('finish'));
    }

    $('.tourNext').click(Tour.next);
    $('.tourPrev').click(Tour.prev);
    $('.tourClose').click(Tour.close);
  }

  $(window).on('resize', function(){
    if (!!Tour.onresize)
    {
      Tour.onresize();
    }
  });

  return {
    run: function(tour, options){
      try
      {
        t = [];
        cur = 0;

        o = {
          close: true,
          content: '',
          language: 'en',
          padding: 3,
          position: 'right',
          scroll: true,
          spotlight: true
        };

        $(options).each(function(k, v){
          o[k] = v;
        });

        $(tour).each(function(k, v){
          for (var kk in o) {
            if (typeof v[kk] == 'undefined')
            {
              v[kk] = o[kk];
            }
          };

          if (v.element && !!v.element.length)
          {
            t.push(v);
          }
        });

        step(cur);

        if (!!Tour.onstart)
        {
          Tour.onstart();
        }
      }
      catch(e)
      {}
    },

    next: function(){
      step(cur + 1);

      if (cur < t.length)
      {
        if (!!Tour.onstep)
        {
          Tour.onstep(t[cur]);
        }
      }
      else if (cur == t.length)
      {
        if (!!Tour.onfinish)
        {
          Tour.onfinish();
        }
      }
    },

    prev: function(){
      step(cur - 1);

      if (cur >= 0)
      {
        if (!!Tour.onstep)
        {
          Tour.onstep(t[cur]);
        }
      }
    },

    current: function(){
      return cur;
    },

    close: function(){
      step(-1);

      if (!!Tour.onclose)
      {
        Tour.onclose();
      }
    },

    onstart: null,
    onfinish: null,
    onclose: null,
    onstep: null,

    onresize: function(){
      var n = cur - 1;
      step(-1);
      cur = n;

      setTimeout(function(){
        Tour.next();
      }, 20);
    }
  };
})();
