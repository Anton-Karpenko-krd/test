// ########################### обратный отсчёт ###########################
// ~~~~~~~~~~~~~~~~~~   функция обратного отсчёта  ~~~~~~~~~~~~~~~~~~
let number_of_minutes = 29; // количество минут
let minutes_0 = ''; // добавления нуля перед количеством минут
let number_of_seconds = 59; // количество секунд
let seconds_0 = ''; // добавления нуля перед количеством секунд

function countdown_function() {

	if(number_of_minutes == 0 && number_of_seconds == 0){ // обновляем счётчик если минут и секунд осталось 0
		number_of_minutes = 29;
		number_of_seconds = 59;
		minutes_0 = '';
		seconds_0 = '';
	}

	if(number_of_seconds > 0){
		number_of_seconds --; // уменьшаем количество секунд
		if(number_of_seconds < 10){ // если число меньше 10 добавляем ноль перед ним
			seconds_0 = '0';
		}else{
			seconds_0 = '';
		}
	}else{
		number_of_minutes --; // уменьшаем количество минут
		if(number_of_minutes < 10){ // если число меньше 10 добавляем ноль перед ним
			minutes_0 = '0';
		}else{
			minutes_0 = '';
		}
		number_of_seconds = 59; 
		seconds_0 = ''; // убираем ноль перед числом секунд
	}
	
	document.querySelector(".order-form-countdown > p > span").innerText = minutes_0+number_of_minutes+" : "+seconds_0+number_of_seconds; //изменяем таймер обратного отсчёта на странице
}

setInterval(function() {
  countdown_function()
}, 1000)





// ########################### карусель переключения отзывов ###########################
let number_pixels = 0; // на сколько пискселей смешать
let sum_blending_pixels = 0; //сумма пикселей смешения
let mixing_promotions_and_discounts_p = 0; // количество пикселей отцтупа
let moving_position_promotions_and_discounts_p = 0; // позиция перемешения
let quantity_per_page = 3; //количество видимых отзывов на странице

resize_info(); // функция определение размера экрана

// ~~~~~~~~~~~~~~~~~~   функция определение размера экрана SYSTEM ~~~~~~~~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", function(event){
    window.onresize = function() {
        resize_info();
    };
});

// ~~~~~~~~~~~~~~~~~~   функция определение размера экрана ~~~~~~~~~~~~~~~~~~
function resize_info(){
	if(document.documentElement.scrollWidth > 1200){ // пк весия больше 1200 px
		number_pixels = 380;
		quantity_per_page = 3;
	}
	if(document.documentElement.scrollWidth < 1201){ // пк версия меньши 1201 px
		number_pixels = 315;
		quantity_per_page = 3;
	}
	if(document.documentElement.scrollWidth < 1025){ // пк версия меньши 1025 px
		number_pixels = 370;
		quantity_per_page = 2;
	}
	if(document.documentElement.scrollWidth < 769){ // мобильная версия версия меньши 769 px
		number_pixels = 300;
		quantity_per_page = 1;
	}	
	mixing_promotions_and_discounts_p = number_pixels * moving_position_promotions_and_discounts_p;
	document.querySelector(".feedback-line > div").setAttribute("style", "margin-left: -"+mixing_promotions_and_discounts_p+"px;"); // смешение
}

// ~~~~~~~~~~~~~~~~~~   функция смишения блока  ~~~~~~~~~~~~~~~~~~

function block_offset(offset_side) {
	if(offset_side == 'right'){
		if((moving_position_promotions_and_discounts_p + quantity_per_page - 1) < document.querySelector('.feedback-line > div').children.length - 1){
			mixing_promotions_and_discounts_p = Number (mixing_promotions_and_discounts_p) + Number (number_pixels); //слажение
			moving_position_promotions_and_discounts_p ++;
			sum_blending_pixels = mixing_promotions_and_discounts_p; // заливаем в сумму пикселей результат сложения
			document.querySelector('.feedback-line > div').setAttribute("style", "margin-left: -"+sum_blending_pixels+"px; transition-duration: 500ms;"); // смешение
		}else{
			sum_blending_pixels = Number (mixing_promotions_and_discounts_p) + Number (100); //слажение
			document.querySelector('.feedback-line > div').setAttribute("style", "margin-left: -"+sum_blending_pixels+"px; transition-duration: 500ms;");
			setTimeout(() => document.querySelector('.feedback-line > div').setAttribute("style", "margin-left: -"+mixing_promotions_and_discounts_p+"px; transition-duration: 500ms;"), 500);
		}
	}else{
		if(moving_position_promotions_and_discounts_p > 0){
			mixing_promotions_and_discounts_p = Number (mixing_promotions_and_discounts_p) - Number (number_pixels); //вычитание
			moving_position_promotions_and_discounts_p --;
			sum_blending_pixels = mixing_promotions_and_discounts_p; // заливаем в сумму пикселей результат сложения
			document.querySelector('.feedback-line > div').setAttribute("style", "margin-left: -"+sum_blending_pixels+"px; transition-duration: 500ms;"); // смешение
		}else{
			document.querySelector('.feedback-line > div').setAttribute("style", "margin-left: 100px; transition-duration: 500ms;"); 
			setTimeout(() => document.querySelector('.feedback-line > div').setAttribute("style", "margin-left: 0px; transition-duration: 500ms;"), 500);
		}
	}
}




// ########################### удаления всего кроме цифр в инпут "номер" ###########################
// ~~~~~~~~~~~~~~~~~~   функция которая срабатывает при вводе чего либо в инпут номер ~~~~~~~~~~~~~~~~~~

input_phone.onkeyup = function() {
	document.querySelector("#input_phone").value = document.querySelector("#input_phone").value.replace(/[^0-9]/g,"");
};




// ########################### всплывающие подсказки при вводе в форму данных ###########################
// ~~~~~~~~~~~~~~~~~~   подсказки для инпут "имя" ~~~~~~~~~~~~~~~~~~
input_name.onblur = function() {
  document.querySelector(".hint-name").setAttribute("style", "display: none");
};
input_name.onfocus = function() {
  document.querySelector(".hint-name").setAttribute("style", "display: flex");
};

// ~~~~~~~~~~~~~~~~~~   подсказки для инпут "номер" ~~~~~~~~~~~~~~~~~~
input_phone.onblur = function() {
  document.querySelector(".hint-phone").setAttribute("style", "display: none");
};
input_phone.onfocus = function() {
  document.querySelector(".hint-phone").setAttribute("style", "display: flex");
};





// ########################### плавный скроллинг ###########################
$(".button").click(function() {
 $('html, body').animate({
 scrollTop: $(".scroll").offset().top
 }, 1000);
});