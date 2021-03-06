let removeBtn = document.querySelector("button.remove"),
  addBtn = document.querySelector("button.add"),
  editBtn = document.querySelector("button.edit"),
  fakeBtn = document.querySelector("button.fake");

let popupEl = document.querySelector(".popup");
let popupBtn = document.querySelector(".popup button");
let popupBuffer = document.querySelector(".popup-buffer");

let textareaQuestionEl = document.querySelector("textarea#question");
let textareaAnswerEl = document.querySelector("textarea#answer");


// Slider START *************************************
let slider = new Splide(".splide", {
  type: "fade",
  speed: 1000,
  breakpoints: {
		768: {
      arrows: false,
		},
  }
});
slider.mount();
slider.on( 'moved', function () {
  checkInfo();
} );
slider.on( 'pagination:updated', function () {
  if (document.querySelectorAll('.splide__slide').length > 39) {
    document.querySelector('.splide__pagination').style.display = 'none';
  }
  else {
    document.querySelector('.splide__pagination').style.display = '';
  }
} );
// Slider END ***************************************

const cardRotateClassToggle = (e) => {
  e.target.parentElement.classList.toggle('active');
}

function cardRotate() {
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", cardRotateClassToggle);
  });
}

function cardRotateStop() {
  document.querySelectorAll(".card").forEach((el) => {
    el.removeEventListener("click", cardRotateClassToggle);
  });
}

function popupOpen() {
  document.querySelector(".popup").classList.add("active");
  document.querySelector(".popup-buffer").classList.add("active");
}

function popupClose() {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".popup-buffer").classList.remove("active");
}

function checkInfo() {
  document.querySelector(".info .info__which").innerHTML = 
  `${+document.querySelector('.splide__slide.is-active').id.slice(-2)}`;
  document.querySelector(".info .info__all").innerHTML = 
  `${+document.querySelectorAll('.splide__slide').length}`;
}

// Interactive card
function interactiveCards () {
  const {width, height} = document.querySelector('body').getBoundingClientRect();
  document.querySelectorAll('.card').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const { clientX, clientY} = e;
    
      el.style.setProperty('--cardXPos', (((clientX / width) - 0.5) * 100).toFixed(2) + 'deg');
      el.style.setProperty('--cardYPos', -1 * ((((clientY / height) - 0.5) * 100).toFixed(2) - 11) + 'deg');
    });
    el.addEventListener('mouseleave', (e) => {
      const { clientX, clientY} = e;
      
      el.style.setProperty('--cardXPos', '0deg');
      el.style.setProperty('--cardYPos', '0deg');
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelectorAll('.splide__slide').length > 39) {
    document.querySelector('.splide__pagination').style.display = 'none';
  }
  cardRotate();
  checkInfo();
  interactiveCards();
});

// *******************************************************************
[removeBtn, addBtn, editBtn].forEach((el) => {
  el.addEventListener("click", () => {
    if (document.querySelector('.dropdown.active')) {
      document.querySelector('.dropdown').classList.remove("active");
      document.querySelector('.back-shadow').classList.remove("active");
    }
  });
});
removeBtn.addEventListener("click", () => {
  if (document.querySelectorAll('.splide__slide').length == 2) removeBtn.disabled = true;
  slider.remove(".is-active");
  checkInfo();
});

addBtn.addEventListener("click", () => {
  textareaQuestionEl.value = "";
  textareaAnswerEl.value = "";
  popupEl.dataset.status = 'add';
  popupOpen();
});

editBtn.addEventListener("click", () => {
  let question = document.querySelector(".splide__slide.is-active .card__side--face").innerHTML.trim();
  let answer = document.querySelector(".splide__slide.is-active .card__side--back").innerHTML.trim();
  textareaQuestionEl.value = question;
  textareaAnswerEl.value = answer;
  popupEl.dataset.status = 'edit';
  popupOpen();
});

popupBuffer.addEventListener("click", () => {
  popupClose();
});

fakeBtn.addEventListener("click", () => {
  fakeBtn.cl
  document.querySelector('.dropdown').classList.toggle("active");
  document.querySelector('.back-shadow').classList.toggle("active");
});

popupBtn.addEventListener("click", () => {
  if (textareaQuestionEl.value && textareaAnswerEl.value) {
    if (popupEl.dataset.status == 'add') {
      let text = `<li class="splide__slide">
      <div class="card">
      <div class="card__side card__side--face">${textareaQuestionEl.value}</div>
      <div class="card__side card__side--back">${textareaAnswerEl.value}</div>
      </div>
      </li>`;
      slider.add(text);
      if (removeBtn.disabled == true) removeBtn.disabled = false;
      checkInfo();
      interactiveCards();
      popupClose();
    }
    else if (popupEl.dataset.status == 'edit') {
      document.querySelector('.splide__slide.is-active .card__side--face').innerHTML = textareaQuestionEl.value;
      document.querySelector('.splide__slide.is-active .card__side--back').innerHTML = textareaAnswerEl.value;
      popupClose();
    }
  }
  if (!textareaQuestionEl.value) {
    textareaQuestionEl.classList.add("empty");
    setTimeout(() => {
      textareaQuestionEl.classList.remove("empty");
    }, 3000);
  }
  if (!textareaAnswerEl.value) {
    textareaAnswerEl.classList.add("empty");
    setTimeout(() => {
      textareaAnswerEl.classList.remove("empty");
    }, 3000);
  }
  cardRotateStop();
  cardRotate();
});

document.querySelector(".splide__list").addEventListener("mousedown", (e) => {
  document.querySelector(".splide__list").classList.add("click");
});
document.querySelector(".splide__list").addEventListener("mouseup", (e) => {
  document.querySelector(".splide__list").classList.remove("click");
});
