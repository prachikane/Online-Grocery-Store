updateDateTime();
function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.getElementById('date').innerHTML = currentDateTime;
  }
setInterval(updateDateTime, 1000);

var item_lists = null;

function display_items(items, category){
console.log(items)
    if(category == 'Shop All'){
        item_lists = items;
    }
    else{
        item_lists = items.filter(function (item){
            return  item.category.includes(category);
        });
    }
    var item_html = '<section class="container">';
    if(category.includes("Rollbacks"))
    {
        item_lists.forEach(item => {
            item_html += `
                <div class="card">
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="discount">$${item.newPrice.toFixed(2)} <br> <span class="offer">($${item.price.toFixed(2)} - ${item.discount.toFixed(2)}$ Off)</span></p>
                    <br>
                    <div class="qtyTextBox">
                        <button type="submit" value="Add to Cart" onclick="addToCart('${item.name}',${item.newPrice},parseInt(document.getElementById('${item.name.toLowerCase()}Qty').value))">Add to Cart</button>
                        <input id="${item.name.toLowerCase()}Qty" type="text" placeholder="Quantity"/>
                    </div>
                </div>
            `;
        });
    }
    else
    {
        item_lists.forEach(item => {
            item_html += `
                <div class="card">
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <br>
                    <div class="qtyTextBox">
                        <button type="submit" value="Add to Cart" onclick="addToCart('${item.name}',${item.price},parseInt(document.getElementById('${item.name.toLowerCase()}Qty').value))">Add to Cart</button>
                        <input id="${item.name.toLowerCase()}Qty" type="text" placeholder="Quantity"/>
                    </div>
                </div>
            `;
        });            
    }
    item_html+='</section>';
    document.getElementsByClassName('maincontent')[0].innerHTML = item_html;
}

function addToCart(itemName, itemPrice, itemQuantity){
    if(itemQuantity == 0 || isNaN(itemQuantity)){
        alert("Min quantity needs to be 1");
    }
    else{
        var available = false;
        var item = item_lists.filter(function (item) {
            if (item.count >= itemQuantity && item.name == itemName) {
                available = true;
            }
        });

        if (available) {
            for (var i = 0; i < item_lists.length; i++) {
                if (item_lists[i].name === itemName && item_lists[i].count >= itemQuantity) {
                    item_lists[i].count -= itemQuantity;
                    var itemImg= item_lists[i].img;
                    break;
                }
            }
            if (item != null) {
                item = {
                    img : itemImg,
                    name: itemName,
                    price: itemPrice,
                    quantity: itemQuantity
                };
            }
            console.log(item);
            if (sessionStorage.getItem('cart')) {
                var cart = JSON.parse(sessionStorage.getItem('cart'));
                cart.push(item);
                sessionStorage.setItem('cart', JSON.stringify(cart));
            }
            else {
                var cart = [item];
                sessionStorage.setItem('cart', JSON.stringify(cart));
            }

            alert(itemName + " added to cart!");
        }
        else {
            alert(itemName + " not available, update the inventory!");
        }
    }
}

function checkInventory(items){
    var letters = /^[A-Za-z ]+$/;
    var search = document.getElementById("search").value;
    if (search.match(letters))
    {
        item_lists = items.filter(function (item)
        {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });
        if (item_lists.length > 0)
        {
            var item_html = '<section class="container">';
            item_lists.forEach(item => {
                item_html += `
                    <div class="card">
                        <img src="${item.img}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                        <br>
                        <div class="qtyTextBox">
                            <button type="submit" value="Add to Cart" onclick="addToCart('${item.name}',${item.price},parseInt(document.getElementById('${item.name.toLowerCase()}Qty').value))">Add to Cart</button>
                            <input id="${item.name.toLowerCase()}Qty" type="text" placeholder="Quantity"/>
                        </div>
                    </div>
                `;
            });
            item_html += '</section>';
            document.getElementsByClassName('maincontent')[0].innerHTML = item_html;
        }
        else
        {
            alert("Item not found");
        }
    }
    else
    {
        alert("Invalid input - only text allowed");
    }
}