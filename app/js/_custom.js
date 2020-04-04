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
    const selectedRadio = document.querySelector('.calculator__radio-input:checked'),
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

      
    const selectedRadioNum = selectedRadio.id.slice(-1);
    const selectedBtnNum = selectedBtn.id.slice(-1);	

    const selectedRadioInfo = costRadioArr[ selectedRadioNum - 1 ];
    const selectedBtnInfo = costInputArr[ selectedBtnNum - 1 ];

    areaElem.innerHTML    = selectedRadioInfo.text,
    costAvgElem.innerHTML	= (selectedRadioInfo.cost * selectedBtnInfo / selectedRadioInfo.area).toFixed(2);
    costSumElem.innerHTML = selectedRadioInfo.cost * selectedBtnInfo;
  };

  // document.querySelectorAll('.calculator__radio-input, .calculator__btn-input').forEach(function(elem) {
  // 		elem.addEventListener('change', calculate);
  // });
  // calculate();	
// /Calculator


document.querySelector('.calculator__range').addEventListener('change', e => {
  const range = e.target,
        checkPoints = [0, 32, 66.5, 100],
        distances = [];
  let   filteredDistances,
        checkPointIndex;
    
  
  checkPoints.forEach(e => {
    distances.push( Math.abs(e - range.value) );
  });
  filteredDistances = Array.from(distances);
  filteredDistances.sort( (a, b) => a - b );
  
  checkPointIndex = distances.indexOf( filteredDistances[0] );
  range.value = checkPoints[checkPointIndex];
});