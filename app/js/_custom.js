// Slider

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

// /Slider

// document.querySelectorAll('.smooth-scroll').forEach(elem, function() {
// 	addEventListener('click', function(event) {
// 		event.preventDefault();
    
// 	});
// });

// Calculator
  function calculate() {
    const rangeElem = document.querySelector('.calculator__range'),
        selectedBtn = document.querySelector('.calculator__btn-input:checked'),
        areaElem      = document.querySelector('.calculate__info-area'),
        costAvgElem   = document.querySelector('.calculate__info-cost-avg'),
        costSumElem   = document.querySelector('.calculate__info-cost-sum'),
        costRadioArr  = [{
          text: "100",
          area: 100,
          cost: 1350
        }, {
          text: "10 000",
          area: 10000,
          cost: 48500
        }, {
          text: "25 000",
          area: 250000,
          cost: 1000000
        }, {
          text: "50 000",
          area: 500000,
          cost: 2500000
        }],
        costInputArr = [0.75, 1, 1.25];
      
    const rangeSelectedIndex = getCheckpointIndex(+rangeElem.value);    
    const selectedBtnIndex = selectedBtn.id.slice(-1);	

    const rangeInfo = costRadioArr[rangeSelectedIndex];
    const selectedBtnInfo = costInputArr[ selectedBtnIndex - 1 ];

    areaElem.innerHTML    = rangeInfo.text,
    costAvgElem.innerHTML	= (rangeInfo.cost * selectedBtnInfo / rangeInfo.area).toFixed(2);
    costSumElem.innerHTML = rangeInfo.cost * selectedBtnInfo;
  };

  document.querySelectorAll('.calculator__range, .calculator__btn-input').forEach(function(elem) {
  		elem.addEventListener('change', calculate);
  });
  calculate();	
// /Calculator


document.querySelector('.calculator__range').addEventListener('change', e => {
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
  
  checkPoints.forEach(point => {
    distances.push( Math.abs(point - pos) );
  });
  filteredDistances = Array.from(distances);
  filteredDistances.sort( (a, b) => a - b );
  
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