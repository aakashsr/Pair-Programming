var lists = document.querySelectorAll("ul li");
var current = 0;

console.log(lists);

hide(lists);
displayFirst(lists);

function hide(lists) {
  lists.forEach(function (cur) {
    cur.style.display = "none";
  });
}

function displayFirst(lists) {
  lists[0].style.display = "block";
}

function displaySlide(current) {
  hide(lists);
  lists[current].style.display = "block";
}

function slideLeft() {
  hide(lists);
  if (current === 0) {
    current = lists.length;
    current = current - 1;
    displaySlide(current);
  } else {
    current = current - 1;
    displaySlide(current);
  }
}

function slideRight() {
  hide(lists);
  if (current === lists.length - 1) {
    current = 0;
    displaySlide(current);
  } else {
    current = current + 1;
    displaySlide(current);
  }
}

document.querySelector(".btn-left").addEventListener("click", slideLeft);
document.querySelector(".btn-right").addEventListener("click", slideRight);
