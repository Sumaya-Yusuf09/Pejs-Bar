// Objekt för Pejs Bar-menyn
const menu = {
    snacks: [
        { name: "Popcorn", price: 3.99, weight: "200g" },
        { name: "Churros", price: 4.49, weight: "150g" },
        { name: "Walnuts", price: 5.99, weight: "100g" },
        { name: "Chips", price: 2.99, weight: "100g" }
    ],
    drinks: [
        { name: "Whisky", price: 8.99, volume: "50ml" },
        { name: "Beer", price: 5.99, volume: "330ml" },
        { name: "Apple Juice", price: 3.49, volume: "300ml" },
        { name: "Orange Juice", price: 3.99, volume: "250ml" },
        { name: "Chai Latte", price: 4.49, volume: "350ml" },
        { name: "Green Tea", price: 2.99, volume: "200ml" },
        { name: "Cappuccino", price: 3.99, volume: "200ml" },
        { name: "Coffee Latte", price: 4.49, volume: "250ml" },
        { name: "Coca Cola", price: 1.99, volume: "500ml" },
        { name: "Fanta", price: 2.49, volume: "500ml" }
    ],
    receipts: []
};

// Funktion för att visa fält för anpassad vara när användaren väljer "Other" i snackmenyn
function showCustomSnackInput() {
    const customSnackInput = document.getElementById('custom-snack');
    if (document.getElementById('snack-menu').value === 'Other') {
        customSnackInput.style.display = 'block';
    } else {
        customSnackInput.style.display = 'none';
    }
}

// Funktion för att visa fält för anpassad vara när användaren väljer "Other" i drinkmenyn
function showCustomDrinkInput() {
    const customDrinkInput = document.getElementById('custom-drink');
    if (document.getElementById('drink-menu').value === 'Other') {
        customDrinkInput.style.display = 'block';
    } else {
        customDrinkInput.style.display = 'none';
    }
}

// Funktion för att placera en beställning
function placeOrder() {
    const selectedSnack = document.getElementById('snack-menu').value;
    const selectedDrink = document.getElementById('drink-menu').value;
    const quantity = document.getElementById('quantity').value;
    const delivery = document.getElementById('delivery').value; 
    let orderDetails = "";

    if (selectedSnack !== 'None') {
        if (selectedSnack !== 'Other') {
            const snack = menu.snacks.find(item => item.name === selectedSnack);
            orderDetails += `${snack.name}, Price: $${snack.price}, Weight: ${snack.weight}, Quantity: ${quantity}\n`;
        } else {
            const customSnackName = document.getElementById('custom-snack-name').value;
            const customSnackPrice = parseFloat(document.getElementById('custom-snack-price').value);
            const customSnackWeight = document.getElementById('custom-snack-weight').value;
            orderDetails += `${customSnackName}, Price: $${customSnackPrice}, Weight: ${customSnackWeight}, Quantity: ${quantity}\n`;
        }
    }

    if (selectedDrink !== 'None') {
        if (selectedDrink !== 'Other') {
            const drink = menu.drinks.find(item => item.name === selectedDrink);
            orderDetails += `${drink.name}, Price: $${drink.price}, Volume: ${drink.volume}, Quantity: ${quantity}\n`;
        } else {
            const customDrinkName = document.getElementById('custom-drink-name').value;
            const customDrinkPrice = parseFloat(document.getElementById('custom-drink-price').value);
            const customDrinkVolume = document.getElementById('custom-drink-volume').value;
            orderDetails += `${customDrinkName}, Price: $${customDrinkPrice}, Volume: ${customDrinkVolume}, Quantity: ${quantity}\n`;
        }
    }

    if (orderDetails !== "") {
        document.getElementById('order-details').textContent = orderDetails;
        const total = calculateTotal(selectedSnack, selectedDrink, quantity, delivery);
        document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
        menu.receipts.push({ order: orderDetails, total, delivery,});
    } else {
        alert("Please select a snack or a drink.");
    }
}

// Funktion för att räkna ut totalen
function calculateTotal(selectedSnack, selectedDrink, quantity, delivery) {
    let total = 0;

    if (selectedSnack !== 'None') {
        if (selectedSnack !== 'Other') {
            const snack = menu.snacks.find(item => item.name === selectedSnack);
            total += snack.price * quantity;
        } else {
            const customSnackPrice = parseFloat(document.getElementById('custom-snack-price').value);
            total += customSnackPrice * quantity;
        }
    }

    if (selectedDrink !== 'None') {
        if (selectedDrink !== 'Other') {
            const drink = menu.drinks.find(item => item.name === selectedDrink);
            total += drink.price * quantity;
        } else {
            const customDrinkPrice = parseFloat(document.getElementById('custom-drink-price').value);
            total += customDrinkPrice * quantity;
        }
    }

    return total;
}

// Funktion för att skriva ut kvitto
function printReceipt() {
    const receiptDiv = document.getElementById('receipt');
    receiptDiv.innerHTML = ''; // Rensa tidigare kvitto
    const receipts = menu.receipts;
    if (receipts.length === 0) {
        receiptDiv.textContent = 'No receipts available.';
    } else {
        receipts.forEach((receipt, index) => {
            const receiptItem = document.createElement('div');
            receiptItem.textContent = `Receipt ${index + 1}: ${receipt.order}, Delivery Method: ${receipt.delivery}, Total: $${receipt.total.toFixed(2)} `;
            receiptDiv.appendChild(receiptItem);
        });
    }
}
