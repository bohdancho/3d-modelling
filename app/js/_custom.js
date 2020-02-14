let slideout = new Slideout({
	'panel': document.querySelector('#panel'),
	'menu': document.querySelector('#menu'),
	'padding': 350,
	'tolerance': 70,
});

document.querySelector('.menu-btn').addEventListener('click', function() {
	slideout.toggle();
});

document.querySelector('.menu__link').addEventListener('click', slideClose);

slideout
	.on('beforeopen', function() {
		this.panel.classList.add('panel-open');
	})
	.on('open', function() {
		this.panel.addEventListener('click', slideClose);
	})
	.on('beforeclose', function() {
		this.panel.classList.remove('panel-open');
		this.panel.removeEventListener('click', slideClose);
	});

function slideClose(eve) {
	eve.preventDefault();
	slideout.close();
}