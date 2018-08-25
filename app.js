const answer = document.getElementById('answer');
const search = document.getElementById('search');
document.addEventListener('DOMContentLoaded', function () {
  let options = {
    data: {
      "Carnes y parrillas": null,
      "Chifa": null,
      "Comida criolla": null,
      "Comida de la selva": null,
      "Comida japonesa": null,
      "Comida peruana internacional": null,
      "Fusión": null,
      "Pescados y mariscos": null,
      "Panadería y pasteleria": null,
      "Sanwichería y café": null,
    },
    onAutocomplete: function (texto) {
      answer.innerHTML = `<h4>Hoy disfrutarás de: ${texto}</h4>
      `;
    }
  }
  const elems = document.querySelectorAll('.autocomplete');
  const instances = M.Autocomplete.init(elems, options);
});

const allRestaurants = (name, image, address, typeFood, phone) => {
  answer.innerHTML += `<div class="col s12 m7">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="${image}" alt="img">
        <span class="card-title">${name}</span>
        </div>
    </div>
</div>
<a href="#idModal" class="btn modal-trigger">Ver más</a>
 <div id="idModal class="modal">
  <div class="modal-content">
  <h3>${typeFood}</h3>
  <h4>${name}</h4>
  <p>Diección: ${address}</p>
  <p>Reservaciones: ${phone}</p>
</div>
<div class="modal-footer">
 <a href="" class="btn modal-close">Cerrar</a>
</div>
  </div>
    </div> `
};
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.modal');
  const instances = M.Modal.init(elems);
});

let allFoodData = [];

fetch('data/restaurantes.json')
  .then(response => response.json())
  .then(data => {
    allFoodData = data;
    allFoodData.map(mF => {
      allRestaurants(mF.name, mF.image, mF.address, mF.typeFood, mF.phone);
    });
  })
search.addEventListener('keyup', (event) => {
  const searchFood = search.value;
  restaurantChoose(allFoodData, searchFood);
});