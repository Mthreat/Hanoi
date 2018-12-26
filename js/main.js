$(document).ready(function(){
/*
-----------------------------------
-----------------------------------
In The name Of God
Craete By : Alireza Parsam
Year : 1397 - spring
-----------------------------------
-----------------------------------
*/


// اضافه نمودن قابلیت درگ به دیسک
$("#disk-1 , #disk-2 , #disk-3").hover(function(){
    //alert('hi');
    $("#temp-disk").val($(this).attr('data'));
    $('#disk-1 , #disk-2 , #disk-3').draggable();
});



// ایجاد تایمر برای بررسی اینکه در هر برج آخرین دیسک کدام است
  setInterval(function(){
    setTimeout(function(){

      var select_disk = $('#temp-disk').val();
      var temp_last_tw1  = $('#last-li-tower-1').val();
      var temp_last_tw2  = $('#last-li-tower-2').val();
      var temp_last_tw3  = $('#last-li-tower-3').val();

      // ابتدا تعداد دیسک های درون برج ها محاسبه می گردد
      // قرار دادن مقدار اخرین دیسک در اینپوت ها
      count_disk_in_tw_1 = $('#tower-1 li').length ;
      var last_li_in_tower_1 = $('#tower-1 li').last().attr('data') ;
      if(count_disk_in_tw_1!=0){
        $('#last-li-tower-1').val(last_li_in_tower_1);
      }else {
        $('#last-li-tower-1').val('0');
      }


      count_disk_in_tw_2 = $('#tower-2 li').length ;
      var last_li_in_tower_2 = $('#tower-2 li').last().attr('data') ;
      if(count_disk_in_tw_2!=0){
        $('#last-li-tower-2').val(last_li_in_tower_2);
      }else {
        $('#last-li-tower-2').val('0');
      }

      count_disk_in_tw_3 = $('#tower-3 li').length ;
      var last_li_in_tower_3 = $('#tower-3 li').last().attr('data') ;
      if(count_disk_in_tw_3!=0){
        $('#last-li-tower-3').val(last_li_in_tower_3);
      }else {
        $('#last-li-tower-3').val('0');
      }


      // اگر در برج 3 ؛ تعداد 3 دیسک وجود داشت؛ کاربر برنده شده است
      if($('#user-winner').val()==''){
        if(count_disk_in_tw_3==3){
          $('#user-winner').val('finish');
        }
      }

      // زمانی ک کاربر برنده شد
      if($('#user-winner-msg').val()=='0'){
        if($('#user-winner').val()=='finish'){
          happy();
          $('#user-winner-msg').val('1');
        }
      }

         $('#disk-'+select_disk+'').draggable({revert: 'invalid'});

    },100);

  },100);



  // رویداد اینکه موس روی کدام یک از برج ها قرار گرقته است
$(document).on('mouseover','#tower-1 , #tower-2 , #tower-3',function(){
        $("#temp-tower").val($(this).attr('data'));
});



$(document).on('mouseover','#disk-1 , #disk-2 , #disk-3',function(){

    // متغییر های نگهدارنده اینکه در برج ها کدام دیسک اخر است
    var temp_last_tw1  = $('#last-li-tower-1').val();
    var temp_last_tw2  = $('#last-li-tower-2').val();
    var temp_last_tw3  = $('#last-li-tower-3').val();

    $("#temp-disk").val($(this).attr('data'));
    $('#disk-1 , #disk-2 , #disk-3').draggable();

    temp_disk = $("#temp-disk").val();
    temp_mouse_over = $("#temp-tower").val();

    temp_disk_in = $('#disk_in_tower').val();

    //اینکه موس روی کدام برج قرار گرفته

    temp_last_disk_tw = $('#last-li-tower-'+temp_mouse_over+'').val();

    // این کار برای این انجام می شود که در وصرت انتقال دیسک به برج اشتباه دوباره به سر جای اولیه خود برگردد
    // اجازه جابجایی به دیسک
    if(temp_disk_in=='true'){
    $('#select-disk-to-drag').val(temp_mouse_over)  ;
    }

        // اگر دیسک انتخاب شده بزرگ تر از اولین دیست بود و مساوی خودش نبود
        if(temp_disk > temp_last_disk_tw  ){
          $('#disk-'+temp_disk+'').draggable('disable');
        }else {
          $('#disk-'+temp_disk+'').draggable('enable');
        }

});



// بررسی اینکه آخرین دیسک درون برج چیست
function check_tower(id_tower){
  last_li = $('#'+id_tower+' li').last().attr('data') ;
  return last_li ;
}


// قابلیت دراپ کردن در برج ها
$('#tower-1 , #tower-2 , #tower-3').droppable({


  over: function(event , ui){
    temp_disk = $("#temp-disk").val();
    var droppableId = $(this).attr("id");

    // برگشت اینکه درون برج ها چه دیسکی قرار دارد
    var result_data = check_tower(droppableId);
    if(temp_disk > result_data ){
      $('#disk_in_tower').val('false');
    }else {
      $('#disk_in_tower').val('true');
    }


  },
  drop: function(event , ui){

     temp_disk = $("#temp-disk").val();
     temp_tower = $("#temp-tower").val();
     temp_last_disk_tw = $("#last-li-tower-1").val();
     //temp_true_op = $('#disk_in_tower').val();
     var droppableId = $(this).attr("id");

     if($('#disk_in_tower').val()=='true'){
     // اضافه کردن دیسک به برج مربوطه
     $('.temp-'+temp_disk+'').remove();
     var textbox = $('<li class="disk disk-'+temp_disk+' temp-'+temp_disk+' ui-draggable" id="disk-'+temp_disk+'"  data="'+temp_disk+'" ></li>');
     textbox.appendTo(this);
     $('.disk-'+temp_disk+'').draggable();
     // محسابه تعداد حرکات
     move_count = $('#move-count').val();
     $('#move-count').val(++move_count);

   }else {
     // در صورت اینکه دیسک اشتباه انتقال داده شود به جای اولیه خود برمیگردد
     old_tower = $('#select-disk-to-drag').val();
     $('.temp-'+temp_disk+'').remove();
     var textbox = $('<li class="disk disk-'+temp_disk+' temp-'+temp_disk+' ui-draggable" id="disk-'+temp_disk+'"  data="'+temp_disk+'" ></li>');
     textbox.appendTo('#tower-'+old_tower+'');
     $('.disk-'+temp_disk+'').draggable();
   }


  }




});



// تابع برنده عملیات نمایش برنده شدن کاربر
function happy(){
  $('#tower-1 , #tower-2').fadeOut();
  $('#confetti').fadeIn();
  $('.help-popup span').text('تبریک! برنده شدید... ♥');
  $('.help-popup').addClass('tower-animation-fadeout');
}

// $('#test').click(function(){
// happy();
// });


// دکمه رست بازی
$('#reset').click(function(){
 // حذف دیسک ها
 $('#disk-1 , #disk-2 , #disk-3').remove();
 $('#tower-1 , #tower-2').fadeIn();
 $('#confetti').fadeOut();
 $('#move-count').val('0');
 $('#user-winner').val('');
 $('#user-winner-msg').val('0');
 $('.help-popup span').text('دیسک ها را از میله 1 به میله 3 انتقال دهید');
 $('.help-popup').removeClass('tower-animation-fadeout');

 // ساختن دوباره دیسک ها و قرار دادن در میله 1
 for (var i = 3; i >= 1; i--) {
   var textbox = $('<li class="disk disk-'+i+' temp-'+i+' ui-draggable" id="disk-'+i+'"  data="'+i+'" ></li>');
   textbox.appendTo('#tower-1');
   $('.disk-'+i+'').draggable();

 }


});





});
