let slideout = new Slideout({
	'panel': document.querySelector('#panel'),
	'menu': document.querySelector('#menu'),
	'padding': 350,
	'tolerance': 70,
});

document.querySelector('.menu-btn').addEventListener('click', function() {
	slideout.toggle();
});

document.querySelectorAll('.menu__link').forEach(function(elem) {
	elem.addEventListener('click', function() {
		slideout.close();
	});
});

slideout
	.on('beforeopen', function() {
		this.panel.classList.add('panel-open');
	})
	.on('open', function() {
		this.panel.addEventListener('click', slideClose);
	})
	.on('close', function() {
		this.panel.classList.remove('panel-open');
		this.panel.removeEventListener('click', slideClose);
	});

function slideClose(eve) {
	eve.preventDefault();
	slideout.close();
}



document.querySelectorAll('.smooth-scroll').forEach(elem, function() {
	addEventListener('click', function(event) {
		event.preventDefault();
	});
});