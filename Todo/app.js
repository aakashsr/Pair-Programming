// 1. Create two modules
// 2. Add event listener
// 3. create addListItem function
// 4. Get data from fields
// 5. clear the fields
// 6. add event listener to delete btn
// 7. create function to delete the item
// 8. create function to clear tasks.
// 9. create function to filter tasks.

const newTask = document.querySelector("#task");
const list = document.querySelector(".collection");
const filterTask = document.querySelector("#filter");
const clearTaskBtn = document.querySelector(".clear-tasks");
const addTaskBtn = document.querySelector("button");

var UIController = (function () {
  return {
    inputData: function () {
      return {
        inputValue: newTask.value,
      };
    },

    displayInput: function (value) {
      // creating placeholder
      var html = `<li class="collection-item">%description%<a href="#" class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`;

      // replacing placeholder with actual data
      var newHTML = html.replace("%description%", value);

      // inserting the element into the DOM.
      list.insertAdjacentHTML("beforeend", newHTML);
    },
    clearInput() {
      // 3. clear input field and refocus
      newTask.value = "";
      newTask.focus();
    },
  };
})();

var controller = (function (UICtrl) {
  // Add event listeners
  addTaskBtn.addEventListener("click", (e) => ctrlAddListItem(e));
  list.addEventListener("click", (e) => ctrlDeleteListItem(e));
  clearTaskBtn.addEventListener("click", (e) => clearListItems(e));
  filterTask.addEventListener("input", (e) => ctrlFilterItems(e));

  // function  add and display item
  var ctrlAddListItem = function (e) {
    var data;
    e.preventDefault();

    // 1. Get input data
    data = UICtrl.inputData();

    // 2. Display input data
    if (data.inputValue !== "") {
      UICtrl.displayInput(data.inputValue);
    }

    UICtrl.clearInput();
  };

  // function to delete item
  var ctrlDeleteListItem = function (e) {
    var parent = e.target.parentNode.parentNode;
    const mainParent = parent.parentNode;
    if (parent.className === "collection-item") {
      mainParent.removeChild(parent);
    }
  };

  // function to clear all items
  var clearListItems = function (e) {
    e.preventDefault();
    var listParent = list;
    var listItemsArray = document.querySelectorAll(".collection-item");
    listItemsArray.forEach(function (cur) {
      listParent.removeChild(cur);
    });
    UICtrl.clearInput();
  };

  // function to filter items
  var ctrlFilterItems = function (e) {
    var listItemsArray = document.querySelectorAll(".collection-item");
    console.log(listItemsArray);
    listItemsArray.forEach(function (cur) {
      var content = cur.textContent.toLowerCase();
      if (content.includes(e.target.value)) {
        cur.style.display = "block";
      } else if (!content.includes(e.target.value)) {
        cur.style.display = "none";
      }
    });
  };
})(UIController);
