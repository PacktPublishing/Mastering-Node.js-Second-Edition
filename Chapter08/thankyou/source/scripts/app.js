(() => {

    let scrollSpeed = 300;
    let $htmlbody = $('html,body');
    let $document = $(document);

    $document.on('keydown', ev => {
        ev.which === 40 ? scrollTo(1) : ev.which === 38 ? scrollTo(-1) : 1;
    });

    $('div#timeline_container').on('click','li', function() {
        showNext($(this));
    });

    // When item is clicked scroll it into view.
    //
    function showNext(targItem) {
        let $items = $('div#timeline_container li');
        let $item = $(targItem);
        $items.removeClass('active');
        $item.addClass('active');
        $htmlbody.stop().animate({ scrollTop: $item.offset().top - $item.height()}, scrollSpeed, $htmlbody.stop);
    }

    // Handler for up/down arrow scrolling
    //
    function scrollTo(delta) {
        let $items = $('div#timeline_container li');
        let current = $items.index($('div#timeline_container li.active'));
        let idx = current + delta;
        let _idx;
        let $curr = $($items[idx]);
        let len = $items.length;

        // If in bounds highlight, otherwise wrap and highlight first || last
        //
        if ((idx > 0) && (idx < len) && !$curr.hasClass('hidden')) {
            $items.removeClass('active');
            $curr.addClass('active');
            $htmlbody.stop().animate({ scrollTop: $curr.offset().top - $curr.height()}, scrollSpeed);
        } else {
            $items.removeClass('active');
            _idx = (idx < 0) ? (len -1) : 0;
            $($items[_idx]).addClass('active');
            if(_idx === 0) {
                $htmlbody.stop().animate({ scrollTop: 0}, scrollSpeed);
            } else {
                $htmlbody.stop().animate({ scrollTop: $document.height()}, scrollSpeed);
            }
        }
    }

})();