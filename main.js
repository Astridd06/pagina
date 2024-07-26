/* breakpoints.js v1.0 | @ajlkn | MIT licensed */
var breakpoints=function(){"use strict";function e(e){t.init(e)}var t={list:null,media:{},events:[],init:function(e){t.list=e,window.addEventListener("resize",t.poll),window.addEventListener("orientationchange",t.poll),window.addEventListener("load",t.poll),window.addEventListener("fullscreenchange",t.poll)},active:function(e){var n,a,s,i,r,d,c;if(!(e in t.media)){if(">="==e.substr(0,2)?(a="gte",n=e.substr(2)):"<="==e.substr(0,2)?(a="lte",n=e.substr(2)):">"==e.substr(0,1)?(a="gt",n=e.substr(1)):"<"==e.substr(0,1)?(a="lt",n=e.substr(1)):"!"==e.substr(0,1)?(a="not",n=e.substr(1)):(a="eq",n=e),n&&n in t.list)if(i=t.list[n],Array.isArray(i)){if(r=parseInt(i[0]),d=parseInt(i[1]),isNaN(r)){if(isNaN(d))return;c=i[1].substr(String(d).length)}else c=i[0].substr(String(r).length);if(isNaN(r))switch(a){case"gte":s="screen";break;case"lte":s="screen and (max-width: "+d+c+")";break;case"gt":s="screen and (min-width: "+(d+1)+c+")";break;case"lt":s="screen and (max-width: -1px)";break;case"not":s="screen and (min-width: "+(d+1)+c+")";break;default:s="screen and (max-width: "+d+c+")"}else if(isNaN(d))switch(a){case"gte":s="screen and (min-width: "+r+c+")";break;case"lte":s="screen";break;case"gt":s="screen and (max-width: -1px)";break;case"lt":s="screen and (max-width: "+(r-1)+c+")";break;case"not":s="screen and (max-width: "+(r-1)+c+")";break;default:s="screen and (min-width: "+r+c+")"}else switch(a){case"gte":s="screen and (min-width: "+r+c+")";break;case"lte":s="screen and (max-width: "+d+c+")";break;case"gt":s="screen and (min-width: "+(d+1)+c+")";break;case"lt":s="screen and (max-width: "+(r-1)+c+")";break;case"not":s="screen and (max-width: "+(r-1)+c+"), screen and (min-width: "+(d+1)+c+")";break;default:s="screen and (min-width: "+r+c+") and (max-width: "+d+c+")"}}else s="("==i.charAt(0)?"screen and "+i:i;t.media[e]=!!s&&s}return t.media[e]!==!1&&window.matchMedia(t.media[e]).matches},on:function(e,n){t.events.push({query:e,handler:n,state:!1}),t.active(e)&&n()},poll:function(){var e,n;for(e=0;e<t.events.length;e++)n=t.events[e],t.active(n.query)?n.state||(n.state=!0,n.handler()):n.state&&(n.state=!1)}};return e._=t,e.on=function(e,n){t.on(e,n)},e.active=function(e){return t.active(e)},e}();!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.breakpoints=t()}(this,function(){return breakpoints});

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);
function showFloor(floor) {
	document.getElementById('first-floor').style.display = (floor === 'first') ? 'block' : 'none';
	document.getElementById('second-floor').style.display = (floor === 'second') ? 'block' : 'none';
}

function updateParkingStatus() {
	fetch('/data')
		.then(response => response.json())
		.then(data => {
			updateSpotStatus('A1', data.distanceA1, data.weightA1);
			updateSpotStatus('A2', data.distanceA2, data.weightA2);
			updateSpotStatus('A3', data.distanceA3, data.weightA3);
			updateSpotStatus('B1', data.distanceB1, data.weightB1);
			updateSpotStatus('B2', data.buttonStateB2);
			updateSpotStatus('B3', data.distanceB3, null, true);
		});
}

function updateSpotStatus(spotId, distance, weight, isUltrasonicOnly = false) {
	const spotElement = document.getElementById(spotId);
	let isOccupied;

	if (isUltrasonicOnly) {
		isOccupied = distance < 10; // Ejemplo, ajusta según tu necesidad
	} else {
		isOccupied = (distance < 10 || weight > 1); // Ejemplo, ajusta según tu necesidad
	}

	if (isOccupied) {
		spotElement.classList.remove('free');
		spotElement.classList.add('occupied');
	} else {
		spotElement.classList.remove('occupied');
		spotElement.classList.add('free');
	}
}

setInterval(updateParkingStatus, 2000);
updateParkingStatus();

let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const translateX = -currentIndex * 100;
    slides.style.transform = `translateX(${translateX}%)`;
}






document.addEventListener("DOMContentLoaded", function() {
	const catalogLinks = document.querySelectorAll('.catalogue');
	const categoryContents = document.querySelectorAll('.category-content');
	const storeItems = document.querySelectorAll('.store-item');
	const storeInfo = document.getElementById('store-info');
	const storeName = document.getElementById('store-name');
	const storeLogo = document.getElementById('store-logo');
	const storeHours = document.getElementById('store-hours');

	catalogLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const category = this.getAttribute('data-category');
			
			categoryContents.forEach(content => {
				if (category === 'all' || content.id === category) {
					content.classList.add('active');
				} else {
					content.classList.remove('active');
				}
			});
		});
	});

	storeItems.forEach(item => {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			const storeData = this.getAttribute('data-store');
			storeName.textContent = this.textContent;
			storeLogo.src = getLogo(storeData);
			storeHours.textContent = getHours(storeData);
			storeInfo.classList.add('active');
			window.scrollTo(0, document.body.scrollHeight);
		});
	});

	function getLogo(store) {
		const logos = {
			mcdonalds: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/2560px-McDonald%27s_logo.svg.png',
			burgerking: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcjv0wmeIzNl0MAwpCZ77X3qzKnyuufZZ0w&s',
			espressoamericano: 'https://eldorado.hn/wp-content/uploads/2020/02/espresso-americano.jpg',
			littlecaesars: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuhfyZNyX_iV5pGt2UraT__H5ZQ3zv6sBbKQ&s',
			wendys: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocuCXTlBNKBWUgxoWlrQJtv_1483vFK5Hfg&s',
			papajohns: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Papa_John%27s_Logo_2019.svg',
			pizzahut: 'https://pizzahutaruba.com/wp-content/uploads/2023/05/Pizza-hut-logo-1024x257.png',
			popeyes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Popeyes_logo.svg/1841px-Popeyes_logo.svg.png',
			churchschicken: 'https://cdn.worldvectorlogo.com/logos/church-s-chicken.svg',
			chuckecheese: 'https://i.pinimg.com/originals/d8/54/b5/d854b5506c4ab527672de42504425e03.jpg',
			subway: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Subway.logo.8.5.svg/2400px-Subway.logo.8.5.svg.png',
			powerchicken: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxZakuJMqToI4M1fY1SI8g7F3irAuCvxK4Q&s',
			kfc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbqjPqjigJwHu4VvBHRbIMuIO7TD9qgiE-kw&s',
			cafetini: 'https://www.corporacionladylee.com/wp-content/uploads/2021/12/logo-cafetini.jpg',
			dunkin: 'https://i.pinimg.com/originals/d2/b4/10/d2b410e76685551905d7725d2140d38d.png',
			sarita: 'https://www.dafont.com/forum/attach/orig/7/7/775874.jpg?1',
			aquisopas: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGEFuqMdGv__cNgUbHZNrTVN4THazS7s2PTA&s',
			cocobaleadas: 'https://cocobaleadas.com//public/uploads/1698437152_3f88286a6c01af36d39d.png',
			pollocampero: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8021e914877581.5628a153f265d.jpg',
			cinnabon: 'https://1000logos.net/wp-content/uploads/2020/09/Cinnabon-Logo-1998.jpg',
			tacobell: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn8eQY_5HKuIde6F58Lo4gPeecbRlt9Ds9-Q&s',
			ficohsa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ficohsa_logo.png/1200px-Ficohsa_logo.png',
			atlantida: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC8N1MHAmAUWLMrHWCdi_gM8Fgz0VODyK5Gg&s',
			bac: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/BAC_Credomatic_logo.svg/1280px-BAC_Credomatic_logo.svg.png',
			davivienda: 'https://soydatos.com/wp-content/uploads/2023/05/DAVIVIENDA-LOGO.jpg',
			banpais: 'https://www.banpais.hn/solicita-servicios-electronicos/img/logo.svg',
			occidente: 'https://linkdepagos.bancodeoccidente.hn/assets/images/logo-login-BO.png',
			mendels: 'https://eldorado.hn/wp-content/uploads/2020/02/mendels.jpg',
			charly: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8qgpPu2p0s7dxze7MNg1ebGfpeW5VMvNa5w&s',
			fashion: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJLyELpony55roGYgpMfMao3DMEJep9hOh3A&s',
			zara: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScmtrnCQdReCbWkr9VmdmfOSqtRm3CjzBuiA&s',
			shein: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntd5LOgePPfhjxtZpWqQFBCYNfmKus60mqQ&s',
			bershka: 'https://static.vecteezy.com/system/resources/previews/023/400/591/non_2x/bershka-brand-clothes-logo-symbol-black-design-sportwear-fashion-illustration-free-vector.jpg',
			lulu: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbX6Bq2NLUuJi4kHivv4OWDv9TmTPxIBRLw&s',
			hm: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png',
			pacer: 'https://eldorado.hn/wp-content/uploads/2020/02/pacer.png',
			carrion: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/LOGO_CARRION.png',
			payless: 'https://d3jky06km58rdx.cloudfront.net/assets/images/store/tegucigalpa/Tczb0QvVLy8J2AgxwOHurELGPyvxDgllJ0daYlf2.png',
			pull: 'https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-3-4.png',
			time: 'https://d3jky06km58rdx.cloudfront.net/assets/images/store/tegucigalpa/ffIX6SlRugApgppODNCFz3zefiY7IAFESzCrcyU9.png',
			acosa: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUAtiwp73K75Ih6Y9jmDXE0Wp89vh_CziaUA&s',
			cd: 'https://cdtechnologia.net/img/circuitos-y-desarrollo-en-tecnologia-cd-technologia-logo-1589751414.jpg',
			jetstereo: 'https://jetstereocorporativo.com/images/logos/corporativo-logo.png',
			radioshack: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/RadioShack_Logo_2013.png',
			tecnova: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeN-IEg84Y4QxAMj0wz7Jpt70v2z4g3GGLbg&s',
			sycom: 'https://sycomhn.com/wp-content/uploads/2023/08/logo-sycom.png',
			dior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/2560px-Dior_Logo.svg.png',
			sofia: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRloIgdvn5KcZePAqLy-sY89qUBC-4vHhVwKw&s',
			hush: 'https://hushnatural.com/assets/img/logos/logo.png',
			miniso: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9GoEQqfoPuVGGtHvXEEOCloLMJcEtl-Nc1g&s',
			diunsa: 'https://greatplacetoworkcarca.com/wp-content/uploads/2022/12/Logo_Diunsa_2022-1-300x91.png',
			walmart: 'https://www.shutterstock.com/image-vector/walmart-icon-logo-sign-symbol-260nw-2411098281.jpg',
			price: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwx9EYy2TAMZtVYR4cqqeDc7Q7lm4-Fry1Uw&s',
			lady: 'https://www.corporacionladylee.com/wp-content/uploads/2018/11/Logos-LadyLee.jpg',
			titan: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHEEG-ML4XZBpvschTchHcpciyVUZ4grDdLw&s',
			depot: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/640px-TheHomeDepot.svg.png',
			elektra: 'https://www.revistaporte.com/wp-content/uploads/2017/10/Elektra-1.jpg',
			mundial: 'https://www.encuentralo.hn/pictures/profile/pimage-1986-85-photo.png',
			gallo: 'https://yt3.googleusercontent.com/ytc/AIdro_nmAdnVtpK064hmf3IvDBggZVFTilQIu0_u2EC1RTUbnQ=s900-c-k-c0x00ffffff-no-rj',
			nike: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTVMpBQPksCaov0mEWu-iqaIfZAP8fejDKQ&s',
			adidas: 'https://ams3.digitaloceanspaces.com/graffica/2022/12/Adidas-Logo-1971-1024x576.jpeg',
			sport: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ84rKyW0loZpqWCitTPLviPiuMaoUKIguaA&s',
			palacio: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Y_Z2PAAQM3XwRl-ziFmhqj1w-7PXd0StbA&s',
			hasbro: 'https://assets-us-01.kc-usercontent.com/500e0a65-283d-00ef-33b2-7f1f20488fe2/cb3c80f7-16ae-4c45-84af-a1b44d5c5bc0/Artical1.png', 
			pacasa: 'https://www.pacasa.hn/wp-content/uploads/2020/12/pacasa_logo-1.png',
			utiles: 'https://utilesdehonduras.com/wp-content/uploads/2020/05/Logo-UDH-01.png',
			colonia: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kobPQVKIZ9dAyTd5imTN8WmmoBCuNn92sA&s',
			claro: 'https://posmart-test.myshopify.com/cdn/shop/products/CLARO_9265c64d-c2af-4869-b452-d90ba36313f2_800x.png?v=1528975107',
			tigo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Tigolatam.png',
			siman: 'https://portal.grupofarsiman.com/Farmacia/v2/logosiman.png',
			ahorro: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_P83LGKMmCFGyfdNyQl2B9RxhNFXRR3ll0Q&s',
			cine: 'https://cam.mastercard.com/content/dam/public/mastercardcom/lac/es-region-cam/home/consumidores/ofertas/priceless/costa-rica/cinemark/cmk-rojo-2023.png',
			game: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEu8ap3rEg5zi0IwuGIHuLsuXRfYsxmq52Fg&s',
			aguas: 'https://odeffinancierasa.hn/wp-content/uploads/2019/10/14_asps-01.png',
			cable: 'https://www.cablecolor.hn/assets/images/facebook-share.jpg',
			multi: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQDCt8T7yGr9YtFUNMsX6WRzAem3z7euR-MlJQeNbjqDPJmp_cNhHTMFXR1-ah0fzXVM&usqp=CAU',
			detodo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDC9zIiU05olnHX4h128zzq7QbZHaIfkSWnQ&s',
			academia: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-4gKGNXUmReBDF2UT3llAuhnikf4-8MCwg&s',
		};
		return logos[store] || '';
	}

	function getHours(store) {
		const hours = {
			mcdonalds: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
			burgerking: 'Lunes a Domingo: 8:00 AM - 11:00 PM',
			espressoamericano: 'Lunes a Viernes: 6:00 AM - 9:00 PM, Sábado y Domingo: 7:00 AM - 8:00 PM',
			littlecaesars: 'Lunes a Domingo: 10:00 AM - 10:00 PM',
			wendys: 'Lunes a Domingo: 9:00 AM - 10:00 PM',
			papajohns: 'Lunes a Domingo: 11:00 AM - 10:00 PM',
			pizzahut: 'Lunes a Domingo: 11:00 AM - 11:00 PM',
			popeyes: 'Lunes a Domingo: 10:00 AM - 10:00 PM',
			churchschicken: 'Lunes a Domingo: 10:00 AM - 10:00 PM',
			chuckecheese: 'Lunes a Domingo: 10:00 AM - 9:00 PM',
			subway: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
			powerchicken: 'Lunes a Domingo: 10:00 AM - 10:00 PM',
			kfc: 'Lunes a Domingo: 10:00 AM - 10:00 PM',
			cafetini: 'Lunes a Viernes: 7:00 AM - 8:00 PM, Sábado: 8:00 AM - 7:00 PM, Domingo: Cerrado',
			dunkin: 'Lunes a Domingo: 6:00 AM - 10:00 PM',
			sarita: 'Lunes a Domingo: 10:00 AM - 9:00 PM',
			aquisopas: 'Lunes a Viernes: 10:00 AM - 8:00 PM, Sábado: 11:00 AM - 7:00 PM, Domingo: Cerrado',
			cocobaleadas: 'Lunes a Domingo: 6:00 AM - 10:00 PM',
			pollocampero: 'Lunes a Domingo: 10:00 AM - 10:00 PM',
			cinnabon: 'Lunes a Domingo: 10:00 AM - 9:00 PM',
			tacobell: 'Lunes a Domingo: 10:00 AM - 11:00 PM',
			occidente: 'Lunes a Viernes: 10:00 AM - 7:00 PM, Sábado: 10:00 AM - 6:00 PM, Domingo: 10:00 AM - 4:00 PM',
			banpais: 'Lunes a Viernes: 10:00 AM - 06:00 PM, Sábado: 10:00 AM - 05:00 PM, Domingo: 01:00 PM - 05:00 PM',
			bac: 'Lunes a Viernes: 09:00 AM - 5:00 PM, Sábado: 09:00 AM - 12:00 PM, Domingo: Cerrado',
			ficohsa: 'Lunes a Domingo: 08:00 AM - 6:00 PM',
			davivienda: 'Lunes a Viernes: 09:00 AM - 6:00 PM, Sábado: 09:00 AM - 12:00 PM, Domingo: Cerrado',
			atlantida: 'Lunes a Domingo: 09:30 AM - 04:00 PM',
			mendels: 'Lunes a Domingo: 10:00 AM - 07:30 PM',
			charly: 'Lunes a Domingo: 10:00 AM - 05:00 PM',
			fashion: 'Lunes a Sábado: 10:00 AM - 08:00 PM, Domingo: 10:00 AM - 6:00 PM',
			zara: 'Lunes a Domingo: 10:00 AM - 07:00 PM',
			shein: 'Lunes a Domingo: 11:00 AM - 08:00 PM',
			bershka: 'Lunes a Domingo: 10:00 AM - 07:00 PM',
			lulu: 'Lunes a Domingo: 10:00 AM - 08:00 PM',
			hm: 'Lunes a Jueves: 10:00 AM - 09:00 PM, Viernes a Sábado: 10:00 AM - 9:30 PM, Domingo: 11:00 AM - 8:00 PM',
			pacer: 'Lunes a Sábado: 8:00 AM - 06:00 PM, Domingo: 09:00 AM - 5:00 PM',
			carrion: 'Lunes a Sabado 10:00 A.M - 9:00 P.M, Domingo: 11:00 A.M. - 8:00 P.M.',
			payless: 'Lunes a Domingo: 08:30 AM - 06:00 PM',
			pull: 'Lunes a Domingo: 10:00 AM - 07:00 PM',
			time: 'Lunes a Viernes: 09:00 AM - 05:00 PM, Sábado: 10:00 AM - 1:00 PM, Domingo: Cerrado',
			sycom: 'Lunes a Domingo: 09:00 AM - 03:00 PM',
			jetstereo: 'Lunes a Domingo: 10:00 AM - 04:00 PM',
			radioshack: 'Domingo a Viernes: 10:00 AM - 07:00 PM, Sábado: 10:00 AM - 08:00 PM',
			acosa: 'Lunes a Viernes: 08:00 AM - 07:00 PM, Sábado: 08:00 AM - 06:00 PM, Domingo: 10:00 AM - 05:00 PM',
			tecnova: 'Lunes a Viernes: 09:00 AM - 06:00 PM, Sábado: 09:00 AM - 1:00 PM, Domingo: Cerrado',
			cd: 'Lunes a Viernes: 08:30 AM - 05:30 PM, Sábado: 09:00 AM - 1:00 PM, Domingo: Cerrado',
			dior: 'Lunes a Sábado: 10:00 AM - 06:00 PM, Domingo: 12:00 AM - 06:00 PM,',
			sofia: 'Lunes a Domingo: 10:00 AM - 07:30 PM',
			hush: 'Lunes a Sábado: 09:00 AM - 07:00 PM , Domingo: Cerrado',
			miniso: 'Lunes a Viernes: 08:00 AM - 05:00 PM, Sábado: 07:00 AM - 11:00 AM, Domingo: Cerrado',
			diunsa: 'Lunes a Sábado: 08:00 AM - 07:00 PM, Domingo: 09:00 AM - 05:00 PM',
			walmart: 'Lunes a Viernes: 07:00 AM - 05:00 PM, Sábado a Domingo: Cerrado',
			price: 'Lunes a Sábado: 09:00 AM - 08:30 PM, Domingo: 09:00 AM - 08:00 PM',
			lady: 'Lunes a Domingo: 10:00 AM - 08:00 PM',
			titan: 'Lunes a Sábado: 09:00 AM - 08:00 PM, Domingo: 11:00 AM - 07:00 PM',
			depot: 'Lunes a Domingo: 09:00 AM - 07:00 PM',
			elektra: 'Lunes a Domingo: 08:00 AM - 08:00 PM',
			mundial: 'Lunes a Domingo: 07:00 AM - 07:00 PM',
			gallo: 'Lunes a Sábado: 09:00 AM - 03:00 PM, Domingo: Cerrado',
			nike: 'Domingo a Viernes: 10:00 AM - 7:00 PM, Sábado: 10:00 AM - 08:00 PM',
			adidas: 'Lunes a Viernes: 09:00 AM - 05:00 PM, Sábado: 10:00 AM - 07:00 PM, Domingo: Cerrado',
			sport: 'Lunes a Domingo: 10:00 AM - 07:00 PM',
			palacio: 'Lunes a Sábado: 10:00 AM - 08:00 PM, Domingo: 10:00 AM - 07:00 PM',
			hasbro: 'Lunes a Domingo: 11:00 AM - 07:00 PM',
			pacasa: 'Lunes a Sábado: 10:00 AM - 08:00 PM, Domingo: 10:00 AM - 05:00 PM',
			utiles: 'Lunes a Sábado: 10:00 AM - 08:00 PM, Domingo: 10:00 AM - 07:00 PM',
			colonia: 'Lunes a Domingo: 7:30 AM - 09:00 PM',
			claro: 'Lunes a Sábado: 10:00 AM - 07:00 PM, Domingo: Cerrado',
			tigo: 'Lunes a Viernes: 08:00 AM - 05:00 PM, Sábado: 09:00 AM - 05:00 PM, Domingo: Cerrado',
			siman: 'Lunes a Domingo: 7:00 AM - 10:00 PM',
			ahorro: 'Lunes a Sábado: 08:00 AM - 09:00 PM, Domingo: 09:00 AM - 07:00 PM',
			cine: 'Lunes a Domingo: 8:00 AM - 11:00 PM',
			game: 'Lunes a Sábado: 12:00 PM - 08:00 PM, Domingo: 12:00 PM - 06:00 PM',
			aguas: 'Lunes a Viernes: 08:00 AM - 04:30 PM, Sábado a Domingo: Cerrado',
			cable: 'Lunes a Sábado: 8:00 AM - 5:00 PM, Domingo: Cerrado',
			multi: 'Lunes a Sábado: 8:00 AM - 5:00 PM, Domingo: Cerrado',
			detodo: 'Lunes a Viernes: 09:00 AM - 08:00 PM, Sábado a Domingo: 09:00 AM - 05:00 PM',
			academia: 'Lunes a Domingo: 7:00 AM - 08:30 PM',
		};
		return hours[store] || 'Horario no disponible';
	}
});


