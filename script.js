const bar = document.querySelector('.resizable-bar');
const left = document.querySelector('.left');
const leftBox = document.querySelector('.left-box');

let isResizing = false;

bar.addEventListener('mousedown', function (e) {
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (isResizing) {
        const newWidth = e.pageX - left.getBoundingClientRect().left;
        left.style.width = newWidth + 'px';
        leftBox.style.width = `calc(100% - ${newWidth}px)`;
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
}

function showContent(section) {
    // Hide all content elements
    var contentElements = document.querySelectorAll('.right > div');
    for (var i = 0; i < contentElements.length; i++) {
        contentElements[i].style.display = 'none';
    }
    
    // Show the content of the selected section
    document.querySelector('.' + section).style.display = 'block';
}

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.left').style.left = "0";
  });
  
  document.querySelector('.cross').addEventListener('click', () => {
    document.querySelector('.left').style.left = "-350px";  
  });

  let cartItems = [];

  function addToCart(name, price) {
    cartItems.push({ name: name, price: price });
    updateCart();
  }

  function formatPrice(price) {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakhs`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(2)} K`;
    } else {
      return `₹${price.toFixed(2)}`;
    }
  }

  function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${formatPrice(item.price)}`;
      cartContainer.appendChild(li);
      total += item.price;
    });

    document.getElementById("cart-items-count").textContent = cartItems.length;
    document.getElementById("cart-total").textContent = formatPrice(total);
  }