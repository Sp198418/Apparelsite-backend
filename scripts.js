let allProduct = document.getElementById('allProduct');
let singleView = document.getElementById('singleView');

function addProduct(e){
  let product = {
    name: document.getElementById('name').value,
    image: document.getElementById('image').value,
    type: document.getElementById('type').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value,
    count: document.getElementById('count').value
  }
  fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(product)
  })
  .then(res => res.json())
  .then(getProduct)
  .catch(error => console.log(error))
}

function getProduct(){
  allProduct.innerHTML = '';

  fetch('http://localhost:5000/products', { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      res.forEach(product => {
        let card = document.createElement('div');
        let buttons = document.createElement('div');
        let delButton = document.createElement('button');
        let viewButton = document.createElement('button');

        card.setAttribute('id', product.id);
        card.setAttribute('class', 'card');
        card.setAttribute('style', `background-image: url(${product.image || ''})`);
        buttons.setAttribute('class', 'productButtonsContainer');
        delButton.setAttribute('class', 'button');
        viewButton.setAttribute('class', 'button');
        
        delButton.onclick = (event) => deleteProductById(event);
        viewButton.onclick = (event) => viewProductById(event);

        delButton.innerText = `Delete ${product.name}`;
        viewButton.innerText = `View ${product.name}`;

        buttons.appendChild(viewButton);
        buttons.appendChild(delButton);

        card.appendChild(buttons);
        
        allProduct.appendChild(card);
      });
    })
    .catch(error => console.log(error))
}

function deleteProductById(event){
  console.log(event.target.parentNode.parentNode.id);

  fetch(`http://localhost:5000/products/${event.target.parentNode.parentNode.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(getProduct)
  .catch(error => console.log(error))
}

function viewProductById(event){
  singleView.innerHTML = '<button id="closeButton" onclick=hidePopup(event)>X</button>';
  singleView.setAttribute('style', 'display: flex')


  fetch(`http://localhost:5000/products/${event.target.parentNode.parentNode.id}`, { method: 'GET' })
  .then(res => res.json())
  .then(product => {
    let name = document.createElement('div');
    let type = document.createElement('div');
    let price = document.createElement('div');
    let image = document.createElement('img');
    let category = document.createElement('div');
    let count = document.createElement('div');

    name.innerText = `${product[0].name}`
    type.innerText = `${product[0].type}`
    price.innerText = `${product[0].price}`
    image.src = `${product[0].image}`
    category.innerText = `${product[0].category}`
    count.innerText = `${product[0].count}`;

    singleView.appendChild(name);
    singleView.appendChild(type);
    singleView.appendChild(price);
    singleView.appendChild(image);
    singleView.appendChild(category);
    singleView.appendChild(count);
  })
  .catch(error => console.log(error))
}

function editProduct(){
  let id = document.getElementById('id').value;
    let product = {
    name: document.getElementById('name').value,
    image: document.getElementById('image').value,
    type: document.getElementById('type').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value,
    count: document.getElementById('count').value
  }
  
  fetch(`http://localhost:5000/products/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  .then(getProduct)
  .catch(error => console.log(error))
}


function hidePopup(){
  singleView.setAttribute('style', 'display: none')
}
