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

var dataController = (function () {
  var data = [];

  return {
    addInput: function (item) {
      data.push(item);
    },

    removeData: function (item) {
      console.log(item);
      const itemIndex = data.indexOf(item);
      console.log(itemIndex);
      data.forEach(function (cur) {
        if (data.indexOf(cur) === itemIndex) {
          data.splice(itemIndex, 1);
        }
      });
    },

    // set data in local storage
    storeData: function () {
      localStorage.setItem("data", data);
    },

    // get local storage data
    getStoredData: function () {
      const localData = localStorage.getItem("data");
      return localData;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

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

  // functoin to be called at startup
  const loadData = function () {
    const storedData = dataController.getStoredData();
    const storedDataRefined = storedData.split(",");

    if (storedData) {
      storedDataRefined.forEach(function (cur) {
        dataController.addInput(cur);
        UICtrl.displayInput(cur);
      });
    }
  };

  // function  add and display item
  var ctrlAddListItem = function (e) {
    // var data;
    e.preventDefault();

    // 1. Get input data
    data = UICtrl.inputData();

    // 2. save to DS
    dataController.addInput(data.inputValue);

    // 3. Display input data
    if (data.inputValue !== "") {
      UICtrl.displayInput(data.inputValue);
    }
    // 4. Clear input fields
    UICtrl.clearInput();

    // 5. storing snapshot of data when item get added
    dataController.storeData();
  };

  function renderInit(lists) {
    lists.forEach(function (cur) {
      var html = `<li class="collection-item">%description%<a href="#" class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`;

      // replacing placeholder with actual data
      var newHTML = html.replace("%description%", cur);

      // inserting the element into the DOM.
      list.insertAdjacentHTML("beforeend", newHTML);
    });
  }

  // function to delete item
  var ctrlDeleteListItem = function (e) {
    var parentContent = e.target.parentNode.parentNode.textContent;
    const parentNode = e.target.parentNode.parentNode;
    // 1. removing data from DS
    dataController.removeData(parentContent);
    const mainParent = parentNode.parentNode;
    if (parentNode.className === "collection-item") {
      // 2. remove data from UI
      mainParent.removeChild(parentNode);
    }
    // 3. storing snapshot of data when item get deleted
    dataController.storeData();
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
    dataController.storeData();
  };

  // function to filter items
  var ctrlFilterItems = function (e) {
    var listItemsArray = document.querySelectorAll(".collection-item");
    listItemsArray.forEach(function (cur) {
      var content = cur.textContent.toLowerCase();
      if (content.includes(e.target.value)) {
        cur.style.display = "block";
      } else if (!content.includes(e.target.value)) {
        cur.style.display = "none";
      }
    });
  };

  return {
    init: function () {
      console.log("im init");
      loadData();
    },
  };
})(UIController);

controller.init();
