// Slider

let slideout = new Slideout({
  'panel': document.querySelector('#panel'),
  'menu': document.querySelector('#menu'),
  'padding': 350,
  'tolerance': 70,
  'side': 'right'
});

document.querySelector('.menu-btn').addEventListener('click', function() {
  slideout.toggle();
});

let menuLinks = document.querySelectorAll('.menu__link')
for (let i = 0; i < menuLinks.length; i++) {

  menuLinks[i].addEventListener('click', function() {
    slideout.close();
  });
};

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

function slideClose(event) {
  event.preventDefault();
  slideout.close();
}

// /Slider

const smoothScrollElems = document.querySelectorAll('.smooth-scroll');
for (let i = 0; i < smoothScrollElems.length; i++) {
	smoothScrollElems[i].addEventListener('click', function(event) {
		event.preventDefault();
    const elem = event.target;
    const href = elem.getAttribute('href');
    const anchorElem = document.querySelector(href);
    const offsetTop = anchorElem.offsetTop; 
    smoothScroll(anchorElem);
	});
};

// Calculator
  function calculate() {
    const rangeElem = document.querySelector('.calculator__range'),
        selectedBtn = document.querySelector('.calculator__btn-input:checked'),
        areaElem      = document.querySelector('.calculate__info-area'),
        costAvgElem   = document.querySelector('.calculate__info-cost-avg'),
        costSumElem   = document.querySelector('.calculate__info-cost-sum'),
        costRadioArr  = [{
          area: 100,
          cost: 1350
        }, {
          area: 10000,
          cost: 58500
        }, {
          area: 25000,
          cost: 92500
        }, {
          area: 50000,
          cost: 152500
        }],
        costInputArr = [0.75, 1, 1.25];
      
    const rangeSelectedIndex = getCheckpointIndex(+rangeElem.value);    
    const selectedBtnIndex = selectedBtn.id.slice(-1);	

    const rangeInfo = costRadioArr[rangeSelectedIndex];
    const selectedBtnInfo = costInputArr[ selectedBtnIndex - 1 ];

    areaElem.innerHTML    = numberWithSpaces( rangeInfo.area );
    costAvgElem.innerHTML	= numberWithSpaces( (rangeInfo.cost * selectedBtnInfo / rangeInfo.area).toFixed(2) );
    costSumElem.innerHTML = numberWithSpaces( rangeInfo.cost * selectedBtnInfo );
  };

  function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }


  let inputElems = document.querySelectorAll('.calculator__range, .calculator__btn-input')
  for (let i = 0; i < inputElems.length; i++) {
  	inputElems[i].addEventListener('change', calculate);
  };
  calculate();	
// /Calculator


document.querySelector('.calculator__range').addEventListener('change', function(e) {
  const range = e.target,
        checkPoints = [0, 32, 66.5, 100];
  let checkPointIndex,
      currentPos = +range.value;
    
  checkPointIndex = getCheckpointIndex(currentPos)
  range.value = checkPoints[checkPointIndex];  
});








function getCheckpointIndex(pos) {
  const checkPoints = [0, 32, 66.5, 100],
        distances = [];
  let filteredDistances;
  
  for (let i = 0; i < checkPoints.length; i++) {
    distances.push( Math.abs(checkPoints[i] - pos) );
  };
  filteredDistances = Array.from(distances);
  filteredDistances.sort( function(a, b) { return a - b } );
  
  return distances.indexOf( filteredDistances[0] );
}




let portfolioImgs = document.querySelector('.portfolio__img-wrap');
imagesLoaded( portfolioImgs, function() {
  let iso;

  // init Isotope after all images have loaded
  // iso = new Isotope( portfolioImgs, {
  //   itemSelector: '.portfolio__img',
  //   layoutMode: 'fitRows',
  //   filter: '.z-in' 
  // });  
  function buildIsoGrid() {
    if (window.matchMedia("(max-width: 575px)").matches) {
      iso = new Isotope( portfolioImgs, {
        itemSelector: '.portfolio__img',
        layoutMode: 'vertical',
        vertical: {
          horizontalAlignment: 0.5,
        },
        filter: '.z-in' 
      });  
    } else {
      iso = new Isotope( portfolioImgs, {
        itemSelector: '.portfolio__img',
        layoutMode: 'fitRows',
        filter: '.z-in' 
      });
    }
  }

  buildIsoGrid();

  window.addEventListener("resize", buildIsoGrid);
  
  // bind filter button click
  let filtersElem = document.querySelector('.portfolio__btn-wrap');
  filtersElem.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    
    let filterValue = event.target.getAttribute('data-filter');
    
    // use matching filter function
    iso.arrange({ filter: filterValue });
  });
    
  // change is-checked class on buttons
  let buttonGroups = document.querySelectorAll('.portfolio__btn-wrap');
  for (let i = 0, len = buttonGroups.length; i < len; i++) {
    let buttonGroup = buttonGroups[i];
    radioButtonGroup( buttonGroup );
  }
  
  function radioButtonGroup( buttonGroup ) {
    buttonGroup.addEventListener( 'click', function( event ) {
      // only work with buttons
      if ( !matchesSelector( event.target, 'button' ) ) {
        return;
      }
      buttonGroup.querySelector('.portfolio__btn_active').classList.remove('portfolio__btn_active');
      event.target.classList.add('portfolio__btn_active');
    });
  }
});







const inputmask = new Inputmask('+7 (999) 999-9999');
inputmask.mask(document.querySelector('.header__input_tel'));
inputmask.mask(document.querySelector('.contacts-form__input_tel'));


      




function ibg(){
  let ibg = document.querySelectorAll(".ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
    }
  }
}
ibg();