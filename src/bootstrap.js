module.exports = function(jQuery) {
  jQuery(document).ready(function(){
      jQuery('.search-form>form').find('input').focusin(function(){
          jQuery(this).parents('.search-input:last').addClass('focused');
          if (jQuery(this).attr('pre-value') == jQuery(this).val())
              jQuery(this).val('');
      });
      jQuery('.search-form>form').find('input').focusout(function(){
          jQuery(this).parents('.search-input.focused').removeClass('focused');
          if (jQuery(this).val() == '')
              jQuery(this).val(jQuery(this).attr('pre-value'));
      });

      jQuery('.search-form-promo>form').find('input').focusin(function(){
          jQuery(this).parents('.search-input:last').addClass('focused');
          if (jQuery(this).attr('pre-value') == jQuery(this).val())
              jQuery(this).val('');
      });
      jQuery('.search-form-promo>form').find('input').focusout(function(){
          jQuery(this).parents('.search-input.focused').removeClass('focused');
          if (jQuery(this).val() == '')
              jQuery(this).val(jQuery(this).attr('pre-value'));
      });

      jQuery('.corner-title').rotate({
                                  deg: -38
                                  });


      /*jQuery('a.popup').fancybox({
                                  margin: 0,
                                  padding: 0,
                                  overlayColor: '#869ac4'
                                  });*/

      //jQuery('.jNice').jNice();
      jQuery('#promo_subscribe').focusin(function(){
          jQuery(this).parents('.search-input:last').addClass('focused');
          if (jQuery(this).attr('pre-value') == jQuery(this).val())
              jQuery(this).val('');
      });
      jQuery('#promo_subscribe').focusout(function(){
          jQuery(this).parents('.search-input.focused').removeClass('focused');
          if (jQuery(this).val() == '')
              jQuery(this).val(jQuery(this).attr('pre-value'));
      });
  });
}
