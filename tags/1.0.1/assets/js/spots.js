var tb_position, current_spot, WPSetThumbnailHTML, WPSetThumbnailID, WPRemoveThumbnail;
(function($) {

	tb_position = function() {
		var tbWindow = $('#TB_window'), width = $(window).width(), H = $(window).height(), W = ( 720 < width ) ? 720 : width, adminbar_height = 0;

		if ( $('body.admin-bar').length )
			adminbar_height = 28;

		if ( tbWindow.size() ) {
			tbWindow.width( W - 50 ).height( H - 45 - adminbar_height );
			$('#TB_iframeContent').width( W - 50 ).height( H - 75 - adminbar_height );
			tbWindow.css({'margin-left': '-' + parseInt((( W - 50 ) / 2),10) + 'px'});
			if ( typeof document.body.style.maxWidth != 'undefined' )
				tbWindow.css({'top': 20 + adminbar_height + 'px','margin-top':'0'});
		};

		return $('a.thickbox').each( function() {
			var href = $(this).attr('href');
			if ( ! href ) return;
			href = href.replace(/&width=[0-9]+/g, '');
			href = href.replace(/&height=[0-9]+/g, '');
			$(this).attr( 'href', href + '&width=' + ( W - 80 ) + '&height=' + ( H - 85 - adminbar_height ) );
		});
	};
	$(window).resize(function(){ tb_position(); });

} )(jQuery);

;(function($){

    if ( pagenow == "widgets" ) {

		$(document).ready(function() {

			// edit link
			$(".spot-select").live("change", function(){
				var widget = $(this).parents(".widget"),
					edit_link = widget.find(".edit-spot-link"),
					edit_href = edit_link.attr("href");
				if ( $( this ).val() == "" )
					edit_link.hide();
				else
					edit_link.attr("href", edit_href.replace(/post\=\d+/,'post=' + $(this).val())).show();
			});


			// filthy dirty way of handling tinyMCE instances in widgets

			// override media-upload.js click event and add our own event that looks at current editor id
			$('.widget[id*="spot"] a.thickbox').unbind('click').live('click.spots',function(){
				current_spot = $(this).parents('.widget');
				if ( typeof(edCanvas) != "undefined" )
					edCanvas = $(this).parents(".widget").find("textarea")[0];
				if ( typeof tinyMCE != 'undefined' && tinyMCE.activeEditor ) {
					tinyMCE.get(edCanvas.id).focus();
					tinyMCE.activeEditor.windowManager.bookmark = tinyMCE.activeEditor.selection.getBookmark('simple');
				}
			});

			// just the active ones
            $('.widget-liquid-right .widget[id*="spot"], .widget-holder.inactive .widget[id*="spot"]').live('mouseover.spots',function(){
                var	$w = $(this),
					$ta = $(this).find("textarea"),
                    $ta_id = $ta.attr("id");

				// should we run?
                if ( $ta.length && typeof( tinyMCE ) == "object" && typeof( tinyMCE.execCommand ) == "function" && !$ta.hasClass("mceEditor") ) {

					$( ".media-buttons a", $w ).each(function(){
						$(this).attr("href", $(this).attr("href").replace(/\?post_id=0/,'?post_id='+escape( $('.spot-select', $w).val() )+'&widget_id='+$w.attr("id")) );
					});
					edCanvas = $ta[0];

					// override default save control to save mce state before widget save
					$( ".widget-control-save", $w ).die('click').live('click', function(){
						if ( tinyMCE.getInstanceById( $ta_id ) ) {
							tinyMCE.triggerSave();
							tinyMCE.execCommand('mceFocus', false, $ta_id);
							tinyMCE.execCommand('mceRemoveControl', false, $ta_id);
						}
						wpWidgets.save( $(this).closest( 'div.widget' ), 0, 1, 0 );
						return false;
					});

					$ta.addClass( "mceEditor" );

					// hide row 2
					tinyMCE.settings.theme_advanced_buttons2 = "";
					tinyMCE.execCommand( "mceAddControl", false, $ta_id );

                }
            });

		});

		WPSetThumbnailHTML = function(html){
			$('.spot-featured-image', current_spot).html(html);
		};

		WPSetThumbnailID = function(id){
			var field = $('input[value="_thumbnail_id"]');
			if ( field.size() > 0 ) {
				$('#meta\\[' + field.attr('id').match(/[0-9]+/) + '\\]\\[value\\]').text(id);
			}
		};

		WPRemoveThumbnail = function( nonce, spot_id ) {
			$.post( ajaxurl, {
				action: "set-spot-thumbnail",
				post_id: spot_id,
				thumbnail_id: -1,
				_ajax_nonce: nonce,
				cookie: encodeURIComponent(document.cookie)
			}, function(str){
				if ( str == '0' ) {
					alert( setPostThumbnailL10n.error );
				} else {
					WPSetThumbnailHTML(str);
				}
			} );
		};

		// create spot handler
		$( '.create-spot' ).live( 'click', function() {
			current_spot = $(this).parents('.widget');

			// if no title then let them know
			if ( $( '.title-field', current_spot ).val() == '' ) {
				$( '.title-field', current_spot )
					.focus()
					.css( { backgroundColor: '#fee' } )
					.animate( { backgroundColor: '#fff' }, 4000 );
				return false;
			}

			// empty spot selection
			$( '.spot-select', current_spot ).val( '' );

			// click save button
			$( '.widget-control-save', current_spot ).click();

			return false;
		} );

    }

})(jQuery);

// use our own set as featured function
function WPSetAsThumbnail( c, b ) {
	var a = jQuery("a#wp-spot-thumbnail-"+c),
		spot_id = jQuery('.spot-select', current_spot).val();

	a.text( setPostThumbnailL10n.saving );
	jQuery.post( ajaxurl, {
		action: "set-spot-thumbnail",
		post_id: spot_id,
		thumbnail_id: c,
		_ajax_nonce: b,
		cookie: encodeURIComponent( document.cookie )
	},function(e){
		var d = window.dialogArguments || opener || parent || top;

		a.text( setPostThumbnailL10n.setThumbnail );

		if( e=="0" ) {
			alert( setPostThumbnailL10n.error );
		} else {
			jQuery("a.wp-post-thumbnail").show();
			a.text(setPostThumbnailL10n.done);
			a.fadeOut(2000);
			//d.WPSetThumbnailID(c);
			d.WPSetThumbnailHTML(e);
		}
	});
};
