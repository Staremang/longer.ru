if (typeof(ymaps) !== "undefined") {
	ymaps.ready(init);
	var yaMap;
	function init() {
		ymaps.geocode(addr, {
			results: 1
		}).then(function (res) {

			var coords = res.geoObjects.get(0).geometry.getCoordinates(),
				myPlacemark = new ymaps.Placemark(coords);
			yaMap = new ymaps.Map("map",{
				center: coords,
				zoom: 15,
				controls: ['zoomControl', 'fullscreenControl']
			});

			yaMap.geoObjects.add(myPlacemark);
		});
	}
}

$(document).ready(function () {
	$('.slider-hero').owlCarousel({
		loop:false,
		nav:true,
		navText: [ '<img src="img/arrow-left.svg" alt="Влево">', '<img src="img/arrow-right.svg" alt="Вправо">' ],
		items:1,
		animateOut: 'fadeOut',
		mouseDrag: false
//    animateIn: 'flipInX',
	//			autoplay:true,
	//			autoplayTimeout:5000,
	//			autoplayHoverPause:true
	})
	$('.product-gallary-slider').owlCarousel({
		loop:true,
		nav:true,
		navText: [ '<img src="img/arrow-left.png" alt="Влево">', '<img src="img/arrow-right.png" alt="Вправо">' ],
		items:3,
		center: true,
		margin: 10
//		animateIn: 'flipInX',
//		autoplay:true,
//		autoplayTimeout:5000,
//		autoplayHoverPause:true
	})
	$('.product-gallary-slider__item').click(function () {
		$('.product-gallary-full__item').removeClass('active');
		document.getElementById($(this).attr('data-pic')).classList.add('active');
	})
	$('.product-gallary-slider').on('changed.owl.carousel', function (event) {
		setTimeout(function() {
			$('.product-gallary-full__item').removeClass('active');
			document.getElementById($(event.target).find('.owl-item.center').children().attr('data-pic')).classList.add('active');
		}, 0)
	})
	var scroll = window.pageYOffset, 
		trigger = false;
	window.addEventListener('scroll', function() {
		scroll = window.pageYOffset;
		if (scroll > document.documentElement.clientHeight && !trigger) {
			trigger = true;
			document.querySelector('.up').classList.add('view');
		} else if (scroll <= document.documentElement.clientHeight && trigger) {
			trigger = false;
			document.querySelector('.up').classList.remove('view');
		}
	})
	document.querySelector('.up').addEventListener('click', function () {
        $('html, body').animate({scrollTop:0}, 'slow');
	})
})