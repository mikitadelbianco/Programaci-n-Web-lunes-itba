document.addEventListener("DOMContentLoaded", function() {
    //const addToCartButtons = document.querySelectorAll('.add-to-cart');
     const cartCount = document.getElementById('cart-count');
     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     const cartList = document.getElementById('cartItems');

    // Function to display cart items
    function displayCartItems() {
      cartList.innerHTML = '';
      cartItems.forEach(product => {
        //console.log("Producto ForEach",product)
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
                                        <td><img src="${product.image}" alt="obra" style="width:100px; height:100px" class="img-fluid" id="image-${product.id}"></td>
                                        <td>${product.name}</td>
                                        <td><input type="number" class="form-control quantity" value="${product.qty}" min="1" data-id="${product.id}"></td>
                                        <td class="unit-price" id="price-${product.id}">$${product.price}</td>
                                        <td class="total-price" id="total-${product.id}">$${product.total_price}</td>
					<td class=" text_center"><button class="btn btn-danger btn-sm remove-from-cart" data-id="${product.id}"> X</button></td>
        `;
        cartList.appendChild(listItem);
     let numberInputs = document.querySelectorAll('input[type="number"]');
	numberInputs.forEach(input => {
   	 input.addEventListener('input', function() {
        // Guardar el nuevo valor en LocalStorage
        const dataid = input.getAttribute('data-id');
	const value = input.value;
	    updateValues(dataid, value);
    });
		updateTotal();
});
      });

    }

      

    // Function to remove item from cart
    function removeFromCart(productId) {
      const index = cartItems.findIndex(item => item.id === productId);
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); 
      }
    }
  
    function updateValues(productId, qty) {
      const index = cartItems.findIndex(item => item.id == productId);
	if (index !== -1){
		cartItems[index].qty = qty;
		cartItems[index].total_price = cartItems[index].qty * cartItems[index].price;
        	localStorage.setItem('cartItems', JSON.stringify(cartItems));
		
		displayCartItems();
	}
	}

    function updateTotal(){
	let tdList = document.querySelectorAll('td.total-price');
	let    valorTotal = 0;
tdList.forEach(td => {
    // Obtener el valor dentro del <td>
    	let value = td.textContent.trim();
	value = parseFloat(value.replace("$",""));
	valorTotal += value;

    // Aquí puedes agregar cualquier lógica adicional que necesites
});
	// Recorrer la lista y acceder al valor dentro de cada <td>
   	 
	 const montoTotal = document.getElementById('grandTotal');
	    montoTotal.innerText = "$" + valorTotal; 
	}
    // Event listener for remove from cart buttons
    cartList.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.getAttribute('data-id');
        removeFromCart(productId);
      }
    });

	console.log(cartItems.length);
	if (cartItems.length > 0){
	displayCartItems();	
	}

   document.getElementById('btn-finalizarCompra').addEventListener('click', function(event){
	   cartItems = [];
           localStorage.setItem('cartItems', JSON.stringify(cartItems));
	   window.location.href = 'index.html';
   });
});


