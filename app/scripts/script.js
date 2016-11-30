/* Misc universal scripts - mostly navigation related */

$(document).ready(function(){ 
// Toggle main nav
 $(".main-nav a").on("click", function(){
   $(".main-nav").find(".active").removeClass("active");
   $(".dropdown-menu").find(".active").removeClass("active");
   $(".dropdown-menu").find(".main-active").addClass("active");
   $(this).parent().addClass("active");
 })
// Toggle dropdown nav
  $(".dropdown-menu a").on("click", function(){
   $(".dropdown-menu").find(".active").removeClass("active");
   $(this).parent().addClass("active");
 })
// Hover drop - ipp user 
 $('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});
 
/* $('#show-scorecards-nav').click(function(){
	 $('#supp-score-filter').selectpicker('val', '2831');
	 
 
 })
 */
 /*
  $("#tbl-sidebar tr").on("click", function(){
	  $("#tbl-sidebar tr").addClass("current");
 $("#tbl-sidebar tr").find(".current").removeClass("current");
   $(this).parent().addClass("current");
 })
 */
})