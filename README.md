# DK Notus Tour

#### This compact solution for guided tours has 27 languages support. It requires only two very common dependencies: **jQuery** and **Bootstrap**. Also has useful features like auto scroll and "spotlight". We hope you enjoy it.

![DK Notus Tour](DKNotusTour.png)

We tried to keep all data regarding usage as short as possible.
## 1. Features

Features that we considerble important:

 - **small requirements** - only jQuery and Bootstrap;
 - **simple usage** - one function for common usage - yes, it's that simple;
 - **events** - for advanced programmers usage;
 - **scroll** - and some more useful features;
 - **multi elements selection** - you can point more then one element for one tour step;
 - **translations** - 27 languages support.

## 2. Simple use case

Lets start with two step tour for elements below:

First of all we need to include two common libraries jQuery and Bootstrap. You ca use some CDN for that.

    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>

Then it's time tour library `dknotus-tour.js` or `dknotus-tour.min.js`.

    <script src="dknotus-tour.js"></script>

Finally we can define our own tour and run it with Tour.run(). Yes, it's that simple.

```javascript
  $(function(){
    $('#simpleBtn').click(function(){
      Tour.run([
        {
          element: $('#btn1'),
          content: 'first btn'
        },
        {
          element: $('#btn2'),
          content: 'and the second one<br>description might be <strong>HTML</strong>'
        },
      ]);
    });
  });
```

## 3. Different tour positions
```javascript
  $(function(){
    $('#positionsBtn').click(function(){
      Tour.run([
        {
          element: $('#posBtn'),
          content: 'by default tour is on the right'
        },
        {
          element: $('#posBtn'),
          content: 'but it can be on top',
          position: 'top'
        },
        {
          element: $('#posBtn'),
          content: 'bottom',
          position: 'bottom'
        },
        {
          element: $('#posBtn'),
          content: 'and finally on the left',
          position: 'left'
        }
      ]);
    });
  });
```

## 4. Global and local parameters

Tour may be run with two parameters: tour description (mandatory) and global options (optional) Tour.run(tourDescription, options). If for some tour hint some parameter is not set, then if it's possible it's taken from options.

Possible parameters for hints descriptions and for global options:

Parameter |	Default value | Description
--------- | ------------- | -----------
element | *none* | jQuery element (might be more then one), if it's not set then hint is skipped.
content | *empty string* | It's for contents of particular hints.
close | true | Defines if close button should be shown.
language | en | Defines interface language. Available languages:
|| en | English (default)
|| pl | Polish
|| be | Belarusian
|| ca | Catalan
|| cs | Czech
|| da | Danish
|| de | German
|| el | Greek
|| es | Spanish
|| et | Estonian
|| fi | Finnish
|| fr | French
|| hu | Hungarian
|| it | Italian
|| lt | Lithuanian
|| lv | Latvian
|| mk | Macedonian
|| nl | Dutch
|| no | Norwegian
|| pt | Portuguese
|| ru | Russian
|| sk | Slovak
|| sl | Slovenian
|| sq | Albanian
|| sv | Swedish
|| tr | Turkish
|| uk | Ukrainian
padding | 5 | Extra space around tour exposed elements. (Has only sense when spotlight option is true).
position | right | Determines where hint should be shown relatively to element it describes.
||| Possible values: right, left, top and bottom.
scroll | true | If true then scrolls window so selected element and hint would be as close as possible to the view center.
spotlight | true | If true then covers everything except selected element and hint with shadow.
forceCorrectionLeft | 0 | Useful if for some reason left offset needs to be modified.
forceCorrectionTop | 0 | Useful if for some reason top offset needs to be modified.
forceCorrectionWidth | 0 | Useful if for some reason width needs to be modified.
forceCorrectionHeight | 0 | Useful if for some reason height needs to be modified.

All above options can be used for both: single hint description and for global options. With global options previous example can be written like:

```javascript
  $(function(){
    $('#positionsShorterBtn').click(function(){
      var globalOptions = {
        element: $('#posBtn')
      };

      var tourDescription = [
        {
          content: 'by default tour is on the right'
        },
        {
          content: 'but it can be on top',
          position: 'top'
        },
        {
          content: 'bottom',
          position: 'bottom'
        },
        {
          content: 'and finally on the left',
          position: 'left'
        }
      ];

      Tour.run(tourDescription, globalOptions);
    });
  });
```

## 5. Events example

There are four events that can be used by developers:

 - **onstart()** - Triggered when new tour starts ( `Tour.run()` );
 - **onfinish()** - Triggered when Finish button is clicked;
 - **onclose()** - Triggered when Close button is pressed ( `Tour.close()` );
 - **onstep( currentStep )** - Triggered on every step shown ( `Tour.next()` or `Tour.prev()` );
 - **onresize()** - By default this one is set.

```javascript
  $(function(){
    $('#eventsBtn').click(function(){
      Tour.onstart = function(){
        console.log('We started!');
      };

      Tour.onfinish = function(){
        console.log('The End');
      };

      Tour.onclose = function(){
        console.log('Tour interupted');
      };

      Tour.onstep = function(currentStep){
        console.log('"That\'s one small step for a man ..."');
        console.log(currentStep);
      };

      Tour.run([
        {
          element: $('#eventBtn1').add('#eventBtn3'),
          content: 'You prefer photos?',
          position: 'top'
        },
        {
          element: $('#eventBtn3').add('#eventBtn4'),
          content: 'or videos?',
          onstep: function(currentStep) {
            console.log('Events defined in step, overwrites global definition');
          }
        }
      ]);
    });
  });
```

## 6. Tour interface

#### Methods

Method | Description
------ | -----------
**Tour.run( tourDescription, globlOptions )** | Function for running Tour.
**Tour.next()** | Goes to next tour step.
**Tour.prev()** | Goes to previous tour step.
**Tour.close()** | Interrupts tour and closes it.
**Tour.current()** | Returns current step description.

#### Events

By default all except `onresize` are set to null.

Event | Description
----- | -----------
**Tour.onstart()** | Triggered when new tour starts ( Tour.run() ).
**Tour.onfinish()** | Triggered when Finish button is clicked.
**Tour.onclose()** | Triggered when Close button is pressed ( Tour.close() ).
**Tour.onstep( currentEvent )** | Triggered on every step shown ( Tour.next() or Tour.prev() ).
**Tour.onresize()** | By default this one is set.

## 7. Contact

Jan Doleczek <jan@doleczek.pl>
