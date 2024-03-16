/*contact ajax*/
jQuery(document).ready(function($){
	jQuery('#contactusform').on('submit', function(e){
	   e.preventDefault();

	  jQuery('#subject').removeClass('border_focus_eror');
      jQuery('#name').removeClass('border_focus_eror');
      jQuery('#email').removeClass('border_focus_eror');
      jQuery('#message').removeClass('border_focus_eror');

      jQuery('#field_error_contact_subject').text('');
      jQuery('#field_error_contact_name').text('');
      jQuery('#field_error_contact_email').text('');
      jQuery('#field_error_contact_message').text('');

	   jQuery("#form-status").hide();
	   jQuery(".pls_wait_contact").text('Please Wait....');
	   jQuery('#submitbtn').addClass('click_btn');
	   var subject = jQuery('#subject').val();
	   var name = jQuery('#name').val();
	   var email = jQuery('#email').val();
	   var message = jQuery('#message').val();
	   jQuery.ajax({
	      url: shcontactAjax.ajaxurl,
	      type: "POST",
		  dataType:'json',
	      data: {
	         action:'set_form',
	         name:name,
	         email:email,
	         subject:subject,
	         message:message,
	    },   success: function(response){
				// alert(response.type)
				jQuery("#form-status").show();
				if(response.type == "success"){
					//alert(response.type)
					jQuery(".pls_wait_contact").text('');
					jQuery("#form-status").show();
					jQuery("#form-status").addClass("success");
					jQuery('#submitbtn').removeClass('click_btn');
					jQuery('#contactusform')[0].reset();
					jQuery("#form-status").html(response.text);	
					setTimeout(function() {
	                  location.reload();
	                }, 7000);							
				}
				else if(response.type == "error") {
					//jQuery("#form-status").attr("class","error");	
					jQuery(".pls_wait_contact").text('');			
					//jQuery("#form-status").addClass("error");

					var c_errors_fields = response.text;
	                var c_errors_fields_ar = c_errors_fields.split(', '); // split string on comma space
	                console.log( c_errors_fields_ar );
	                
	                if (c_errors_fields_ar.includes("c_name")) {
	                    jQuery("#field_error_contact_name").text('Name is required');
	                    jQuery('#name').addClass('border_focus_eror');
	                }
	                if (c_errors_fields_ar.includes("c_Email")) {
	                    jQuery("#field_error_contact_email").text('Email is required');
	                    jQuery('#email').addClass('border_focus_eror');
	                }
	                if (c_errors_fields_ar.includes("c_invalid_email")) {
	                    jQuery("#field_error_contact_email").text('Please enter valid email address');
	                    jQuery('#email').addClass('border_focus_eror');
	                }
	                if (c_errors_fields_ar.includes("c_Subject")) {
	                    jQuery("#field_error_contact_subject").text('Subject is required');
	                    jQuery('#subject').addClass('border_focus_eror');
	                }
	          
	                if (c_errors_fields_ar.includes("c_Message")) {
	                    jQuery("#field_error_contact_message").text('Message is required');
	                    jQuery('#message').addClass('border_focus_eror');
	                }

					jQuery('#submitbtn').removeClass('click_btn');				
				}  
				
			},error: function(){} 
	   });
		
		//jQuery('#contactusform')[0].reset();
  	});
});