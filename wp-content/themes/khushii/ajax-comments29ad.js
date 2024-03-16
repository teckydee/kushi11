/*
 * Let's begin with validation functions
 */
 jQuery.extend(jQuery.fn, {
	/*
	 * check if field value lenth more than 3 symbols ( for name and comment ) 
	 */
	validate: function () {
		if (jQuery(this).val() == "") {jQuery(this).addClass('error');return false} else {jQuery(this).removeClass('error');return true}
	},
	/*
	 * check if email is correct
	 * add to your CSS the styles of .error field, for example border-color:red;
	 */
	validateEmail: function () {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
		    emailToValidate = jQuery(this).val();
		if (!emailReg.test( emailToValidate ) || emailToValidate == "") {
			jQuery(this).addClass('email_error');return false
		} else {
			jQuery(this).removeClass('email_error');return true
		}
	},
});
 
jQuery(function($){
 
	/*
	 * On comment form submit
	 */
	$( '#commentform' ).submit(function(){

//debugger;
 		$("#cmt_err").text("");
 		$("#author_err").text("");
 		$("#auth_email_err").text("");
		// define some vars
		var button = $('#comment-submit'), // submit button
		    respond = $('#respond'), // comment form container
		    commentlist = $('.comment-list'), // comment list container
		    cancelreplylink = $('#cancel-comment-reply-link');

		// validate comment in any case
		$( '#comment' ).validate();
 
		// if user is logged in, do not validate author and email fields
		$( '#author' ).validate();

		if ($( '#email' ).val() == "" ) {
			$( '#email' ).validate();
		}else{
			$( '#email' ).removeClass('error');
			$( '#email' ).validateEmail();
		}
 		
 		if ($( '#author' ).hasClass( 'error' )) {
 			$("#author_err").text("Please enter name");
 		}
 		if ($( '#comment' ).hasClass( 'error' )) {
 			$("#cmt_err").text("Please enter comment");
 		}
 		if ($( '#email' ).hasClass( 'error' )) {
 			$("#auth_email_err").text("Please enter email");
 		}
 		if ($( '#email' ).hasClass( 'email_error' )) {
 			$("#auth_email_err").text("Please enter valid email");
 		}
		
 
		// if comment form isn't in process, submit it
		if ( !button.hasClass( 'loadingform' ) && !$( '#author' ).hasClass( 'error' ) && !$( '#email' ).hasClass( 'error' ) && !$( '#email' ).hasClass( 'email_error' ) && !$( '#comment' ).hasClass( 'error' ) ){
 
			// ajax request
			$.ajax({
				type : 'POST',
				url : misha_ajax_comment_params.ajaxurl, // admin-ajax.php URL
				data: $(this).serialize() + '&action=ajaxcomments', // send form data + action parameter
				beforeSend: function(xhr){
					// what to do just after the form has been submitted
					button.addClass('loadingform').val('Loading...');
				},
				error: function (request, status, error) {
					if( status == 500 ){
						alert( 'Error while adding comment' );
					} else if( status == 'timeout' ){
						alert('Error: Server doesn\'t respond.');
					} else {
						// process WordPress errors
						var wpErrorHtml = request.responseText.split("<p>"),
							wpErrorStr = wpErrorHtml[1].split("</p>");
 
						alert( wpErrorStr[0] );
					}
				},
				success: function ( addedCommentHTML ) {
 
					// if this post already has comments
					if( commentlist.length > 0 ){
 
						// if in reply to another comment
						if( respond.parent().hasClass( 'comment' ) ){
 
							// if the other replies exist
							if( respond.parent().children( '.children' ).length ){	
								respond.parent().children( '.children' ).append( addedCommentHTML );
							} else {
								// if no replies, add <ol class="children">
								addedCommentHTML = '<ol class="children">' + addedCommentHTML + '</ol>';
								respond.parent().append( addedCommentHTML );
							}
							// close respond form
							cancelreplylink.trigger("click");
						} else {
							// simple comment
							commentlist.append( addedCommentHTML );
						}
					}else{
						// if no comments yet
						addedCommentHTML = '<ol class="comment-list">' + addedCommentHTML + '</ol>';
						respond.before( $(addedCommentHTML) );
					}
					// clear textarea field
					$('#comment').val('');
				},
				complete: function(){
					// what to do after a comment has been added
					jQuery('#commentform')[0].reset();
					jQuery('#comment_msg').show();
					jQuery('#comment_msg').text("Your comment has been submitted");
					button.removeClass( 'loadingform' ).val( 'Post Comment' );
					setTimeout(function() {
	                  // location.reload();
	                  jQuery('#comment_msg').hide();
	                }, 5000);
				}
			});
		}
		return false;
	});
});
