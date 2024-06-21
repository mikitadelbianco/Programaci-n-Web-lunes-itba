document.addEventListener("DOMContentLoaded", function() {
  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartList = document.getElementById('cart-items');
     
    // Function to display cart items
    function displayCartItems() {
      // Clear previous cart items
      cartList.innerHTML = '';
  
      // Display each cart item
      cartItems.forEach(product => {
        console.log("Producto ForEach",product)
        const listItem = document.createElement('li');
        listItem.className = 'dropdown-item';
        listItem.innerHTML = `
          <span>${product.name} - $${product.price} - cantidad: ${product.qty} - Total: $${product.total_price}</span>
          <button class="btn btn-danger btn-sm remove-from-cart" data-id="${product.id}"> X</button>
        `;
        cartList.appendChild(listItem);
      });
	    const objButton = document.createElement('li');
	    objButton.className= 'dropdown-item';
	    objButton.innerHTML = `<a class="btn btn-success" href="finishshop.html">Finalizar Compra</a>`
	cartList.appendChild(objButton);
    }

    // Update cart count in navbar
    function updateCartCount() {
      cartCount.innerText = cartItems.length;
    }
  
    // Add product to cart
    function addToCart(productId,productName,productPrice, dataImage) {
      const index = cartItems.findIndex(item => item.id == productId);
	if (index !== -1){
		cartItems[index].qty +=1;
		cartItems[index].total_price = cartItems[index].qty * cartItems[index].price
	}
	    else{
	const product = {
        id: productId,
        name: productName,
        price: productPrice,
	qty: 1,
	total_price : productPrice,
	image : dataImage
      }
 
      cartItems.push(product);
	    }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      displayCartItems();
      updateCartCount();
    }
  
    // Function to remove item from cart
    function removeFromCart(productId) {
      const index = cartItems.findIndex(item => item.id === productId);
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); 
        updateCartCount();
      }
    }
  
    // Event listener for remove from cart buttons
    cartList.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.getAttribute('data-id');
        removeFromCart(productId);
      }
    });
  
    // Add event listeners to add to cart buttons
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
	const productImage = button.getAttribute('data-image'); 
        addToCart(productId,productName,productPrice, productImage);
      });
    });
  
    displayCartItems();
    updateCartCount();
  });
  
