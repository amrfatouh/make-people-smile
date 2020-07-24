var actionCount = 0;
var actionCountText = document.getElementById('action-count');
var smile = '<i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>';
var frown = '<i class="fa fa-frown-o fa-lg" aria-hidden="true"></i>';

// make even distribution of smiles and frowns
var btnArray = document.getElementsByName('btn');
var smileCounter = 0, frownCounter = 0;
for(var i = 0; i < 9; i++) {
  if (smileCounter < 5 && frownCounter < 5) {
    if (Math.random() > 0.5) {
      btnArray[i].value = smile;
      smileCounter++;
    } else {
      btnArray[i].value = frown;
      frownCounter++;
    }
  } else if (smileCounter >= 5) {
    btnArray[i].value = frown;
  } else if (frownCounter >= 5) {
    btnArray[i].value = smile;
  }
}

// change '?' to smile or frown upon clicking once
function handleClick(num) {
  var changedBtn = document.getElementById('btn' + num);
  if (changedBtn.innerHTML === '?') {
    changedBtn.innerHTML = changedBtn.value;
    changedBtn.className = (changedBtn.innerHTML === smile) ? 'btn-green' : 'btn-red';
  }
  actionCount += 1;
  actionCountText.innerHTML = 'actions: ' + actionCount;
  check();
}

// toggling smiles or frowns upon double-clicking
function handleDblClick(num) {
  var changedBtn = document.getElementById('btn' + num);
  if (changedBtn.innerHTML === frown) {
    changedBtn.innerHTML = smile;
    changedBtn.className = 'btn-green';
  } else if (changedBtn.innerHTML === smile) {
    changedBtn.innerHTML = frown;
    changedBtn.className = 'btn-red';
  }
  actionCount -= 1;
  actionCountText.innerHTML = 'actions: ' + actionCount;
  check();
}

//checking if all faces are smiling
var resultText = document.getElementById('result');
var bestAttemptText = document.getElementById('best-attempt');
function check () {
  var success = true;
  for (var i = 0; i < 9; i++) {
    var testBtn = document.getElementsByName('btn')[i];
    if (testBtn.innerHTML === smile) {
      success = true;
    } else {
      success = false;
      break;
    }
  }
  if(success) {
    resultText.innerHTML = 'congrats, all people are happy now!';
    if(bestAttemptText.innerHTML == "" || actionCount < parseInt(bestAttemptText.innerHTML) ) {
      bestAttemptText.innerHTML = actionCount + ' actions';
    }
    for (var i = 0; i< 9; i++) {
      btnArray[i].disabled = true;
    }
    var resetBtn = document.createElement('button');
    resetBtn.innerHTML = 'reset';
    resetBtn.onclick = reset;
    resetBtn.name = 'reset-btn';
    document.body.appendChild(resetBtn);
  } else {
    resultText.innerHTML = 'not yet';
  }
}

// reset the game
function reset() {
  for(var i = 0; i < 9;i++) {
    btnArray[i].className = 'btn';
    btnArray[i].innerHTML = '?';
    btnArray[i].disabled = false;
  }
  resultText.innerHTML = 'result';
  actionCount = 0;
  actionCountText.innerText = 'actions: 0';
  smileCounter = frownCounter = 0;
  document.getElementsByName('reset-btn')[0].remove();
}