// VARIABLES
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
const expelledArr = [];

const renderToDom = (divId, htmlRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlRender;
};

const entryForm = () => {
  let formString = `
    <form>
      <div class="mb-3">
        <label for="name" class="form-label"><h4>Enter Name:</h4></label>
        <input type="text" class="form-control" id="name" placeholder="Harry Potter" required>
        <button type="submit" id="show-form" class="btn btn-success">SORT!</button>
      </div>
    </form>
    `;
  renderToDom("#createForm", formString);
  document.querySelector("form").addEventListener('submit', formInput)
  document.querySelector('form').addEventListener('submit', filters);
};

const sortStart = document.querySelector("#sort-start");
sortStart.addEventListener('click', entryForm);

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

const studentOnDom = (array) => {
  let domString = "";
  array.forEach(student => {
    domString += `
      <div class="card text-center" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5>
          <p class="card-text">${student.house} </p>
          <button type="button" id="expel-btn--${student.id}" class="btn btn-danger">EXPEL</button>
        </div>
      </div>
    `;
  });
  renderToDom("#students", domString);
};

const expelledOnDom = (array) => {
  let domString = "";
  array.forEach(student => {
    domString += `<div class="card text-center" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Oh, no!</h5>
          <p class="card-text">${student.name} has joined the Dark Army!</p>
        </div>
      </div>
    `
  });
  renderToDom("#expelled-students", domString);
}

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
