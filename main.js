// VARIABLES
const students = []
const houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
const expelled = [];

const renderToDom = (divId, htmlRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlRender;
};

const entryForm = () => {
  let formString = `
    <form>
      <div class="mb-3">
        <label for="name" class="form-label"><h4>Enter Name:</h4></label>
        <input type="text" class="form-control" id="name" placeholder="Harry Potter">
        <button type="submit" id="show-form" class="btn btn-success">SORT!</button>
      </div>
    </form>
    `;
  renderToDom("#createForm", formString);
  document.querySelector("form").addEventListener('submit', formInput)
};

const sortStart = document.querySelector("#sort-start");
sortStart.addEventListener('click', entryForm);
