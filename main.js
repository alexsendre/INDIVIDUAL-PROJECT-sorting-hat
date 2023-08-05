// * DATA
const studentArr = [
  {
    id: 1,
    name: 'Harry Potter',
    house: 'Gryffindor'
  },
  {
    id: 2,
    name: 'Ron Weasley',
    house: 'Gryffindor'
  }
];

// EXPELLED STUDENT ARRAY
const expelledArr = [];
const sortStart = document.querySelector("#sort-start");

// * UTILITY FUNCTION
const renderToDom = (divId, htmlRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlRender;
};

// * FORM FUNCTION
const entryForm = () => {
  let formString = `
    <form>
      <div class="mb-2">
        <label for="name" class="form-label"><h4>Enter Name:</h4></label>
        <input type="text" class="form-control" id="name" placeholder="Harry Potter" required>
        <button type="submit" id="show-form" class="btn btn-outline-light sort-btn">SORT!</button>
      </div>
    </form>
    `;
  renderToDom("#createForm", formString);
  document.querySelector("form").addEventListener('submit', formInput)
  document.querySelector("form").addEventListener('submit', filters);
};

// GATHERING USER INPUT DATA IN A FORM FUNCTION
const formInput = (e) => {
  e.preventDefault();
  const houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];

  const newbie = {
    id: studentArr.length + 1,
    name: document.querySelector("#name").value,
    house: randomHouse
  }

  studentArr.push(newbie);
  studentOnDom(studentArr);
  document.querySelector("form").reset();
}

// DOM MANIPULATOR FUNCTIONS



const studentOnDom = (array) => {
  let domString = "";
  array.forEach(student => {
    domString += `
      <div class="card text-center student-child overflow-auto" 
      style="width: 200px;
      background-color:${student.house == "Gryffindor" ? "#540b0e" : student.house == "Slytherin" ? "#b4ff43" : student.house == "Ravenclaw" ? "#748bff" : "#57fff9"};
      color:${student.house == "Gryffindor" ? "#fff3b0" : student.house == "Slytherin" ? "black" : student.house == "Ravenclaw" ? "black" : "black"}">
        <div class="card-body flex-wrap">
          <h4 class="card-title"><strong>${student.name}</strong></h4>
          <p class="card-text">${student.house} </p>
          <button type="button" id="expel-btn--${student.id}" class="btn btn-danger">EXPEL</button>
        </div>
      </div>
    `;
  });
  // WILL DISPLAY THE INFO ABOVE INTO THE FIRST YEAR'S DIV
  renderToDom("#students", domString);
};

const expelledOnDom = (array) => {
  let domString = "";
  array.forEach(student => {
    domString += `
      <div class="card text-center expel-child" style="width: 225px;height: auto;background-color:black;color:white;">
        <div class="card-body">
          <h4 class="card-title">Oh, no!</h4>
          <p class="card-text"><strong>${student.name}</strong> has joined the <strong style="color: red;font-weight: bold;">Dark Army</strong>!</p>
        </div>
      </div>
    `
  });
  // WILL DISPLAY THE INFO ABOVE INTO THE DARK ARMY DIV
  renderToDom("#expelled-students", domString);
}

// FILTER BUTTON TO SORT BY CATEGORY
const filters = () => {
  let domString = "";
  domString += `
  <div class="filter-btns">
    <button type="button" id="gryffindor" class="btn btn-outline gryf-btn">Gryffindor</button>
    <button type="button" id="slytherin" class="btn btn-outline sly-btn">Slytherin</button>
    <button type="button" id="hufflepuff" class="btn btn-outline huff-btn">Hufflepuff</button>
    <button type="button" id="ravenclaw" class="btn btn-outline rave-btn">Ravenclaw</button>
    <button type="button" id="show-all" class="btn btn-outline all-btn">Show All</button>
  </div>
  `
  renderToDom('#filter-container', domString)
}

// EVENT LISTENERS

const eventListeners = () => {

  sortStart.addEventListener('click', entryForm);
  
  document.querySelector("#filter-container").addEventListener('click', (e) => {
    if (e.target.id === 'show-all') {
      studentOnDom(studentArr);
    } else if (e.target.id === 'gryffindor') {
      const gryfArr = studentArr.filter(student => student.house === "Gryffindor")
      studentOnDom(gryfArr);
    } else if (e.target.id === 'slytherin') {
      const slythArr = studentArr.filter(student => student.house === "Slytherin")
      studentOnDom(slythArr);
    } else if (e.target.id === 'hufflepuff') {
      const huffArr = studentArr.filter(student => student.house === "Hufflepuff")
      studentOnDom(huffArr);
    } else if (e.target.id === 'ravenclaw') {
      const ravArr = studentArr.filter(student => student.house === "Ravenclaw")
      studentOnDom(ravArr);
    };
  })
  
  document.querySelector("#students").addEventListener('click', (e) => {
    if (e.target.id.includes('expel-btn')) {
      const [, expelId] = e.target.id.split('--');
      const index = studentArr.findIndex(e => e.id === Number(expelId));
      
      let expelled = studentArr.splice(index, 1)[0];
      expelledArr.push(expelled);
      studentOnDom(studentArr);
      expelledOnDom(expelledArr);
    };
  });
}
  
// INITIALIZATION 
  const startApp = () => {
    eventListeners();
  }

startApp();
