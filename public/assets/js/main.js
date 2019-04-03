

function prettySet() {
	jQuery( function($) {
		//#slider
		$( function(){
	        $('#slider.carousel').carousel({
				interval: 5000
		});

		$( '.centered' ).each( function( e ) {
			$(this).css('margin-top',  ($('#slider').height() - $(this).height())/2);
		});

		$( window ).resize( function(){
			$( '.centered' ).each( function( e ) {
				$(this).css('margin-top',  ($('#slider').height() - $(this).height())/2);
			});
		});
	});


		//services

    $.Isotope.prototype._getCenteredMasonryColumns = function() {
        this.width = this.element.width();
        var parentWidth = this.element.parent().width();
        // i.e. options.masonry && options.masonry.columnWidth
        var colW = this.options.masonry && this.options.masonry.columnWidth ||
        // or use the size of the first item
        this.$filteredAtoms.outerWidth(true) ||
        // if there's no items, use size of container
        parentWidth;
        var cols = Math.floor(parentWidth / colW);
        cols = Math.max(cols, 1);
        // i.e. this.masonry.cols = ....
        this.masonry.cols = cols;
        // i.e. this.masonry.columnWidth = ...
        this.masonry.columnWidth = colW;
    };

    $.Isotope.prototype._masonryReset = function() {
        // layout-specific props
        this.masonry = {};
        // FIXME shouldn't have to call this again
        this._getCenteredMasonryColumns();
        var i = this.masonry.cols;
        this.masonry.colYs = [];
        while (i--) {
            this.masonry.colYs.push(0);
        }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
        var prevColCount = this.masonry.cols;
        // get updated colCount
        this._getCenteredMasonryColumns();
        return (this.masonry.cols !== prevColCount);
    };

    $.Isotope.prototype._masonryGetContainerSize = function() {
        var unusedCols = 0,
            i = this.masonry.cols;
        // count unused columns
        while (--i) {
            if (this.masonry.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        return {
            height: Math.max.apply(Math, this.masonry.colYs),
            // fit container to columns that have been used;
            width: (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
    };


    var $container = $('#container'),
        $body = $('body'),
        colW = 50,
        columns = null;

    $container.isotope({
        // disable window resizing
        resizable: false,
        masonry: {
            columnWidth: colW
        }
    });

    //FILTERING
//services
	var $grid = $('.cardfilter').isotope({
    // options
        itemSelector: '.wrapperino',
        layoutMode: 'masonry',
    });


    $('.filter-button-group').on( 'click', 'button', function() {
        $(".filter-btn").removeClass("current-button");
        var filterValue = $(this).attr('data-filter');
        $(this).addClass("current-button");
        $grid.isotope({ filter: filterValue });
    });


});
}