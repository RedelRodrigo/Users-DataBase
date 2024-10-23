const API_URL = 'http://localhost:8000';

// Fetch all items
async function fetchItems() {
    const response = await fetch(`${API_URL}/items/`);
    const items = await response.json();
    displayItems(items);
}

// Display items in the list
function displayItems(items) {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Welcome ${item.title}</span>
            <button class="delete-btn" data-id="${item.id}">Close Sesion</button>
        `;
        itemList.appendChild(li);
    });
}

// Add new item
async function addItem(title, description) {
    const response = await fetch(`${API_URL}/items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });
    const newItem = await response.json();
    fetchItems();
}

// Delete item
async function deleteItem(id) {
    await fetch(`${API_URL}/items/${id}`, {
         method: 'DELETE',
    });
    fetchItems();
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchItems);

const itemForm = document.getElementById('item-form');
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    await addItem(title, description);
    itemForm.reset();
});

const itemList = document.getElementById('item-list');
itemList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        await deleteItem(id);
    }
});