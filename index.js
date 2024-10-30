import {menuArray} from './data.js'

const contentContainer = document.getElementById('content-container')
const orderedItems = document.getElementById('ordered-items')
const totalPriceEl = document.getElementById('total-price')
const orderSection = document.getElementById('order-section')
const orderBtn = document.getElementById('order-btn')
const modalOverlay = document.getElementById('modal-overlay')
const closeModalBtn = document.getElementById('close-modal-btn')
const userInfoForm = document.getElementById('userInfoForm')
const afterPurchaseText = document.getElementById('after-purchase-text')

let htmlToBeRendered = ''

menuArray.forEach(item => {
    htmlToBeRendered += `
        <div class="menu-item">
            <div class="emoji-details">
                <span class="emoji-pic">${item.emoji}</span>
                <div class="item-details">
                    <h2 class="item-text">${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <h3 class="price-tag">$${item.price}</h3>
                </div>
            </div>
            <button -item" data-item="${item.name}" id="add-btn" class="add-btn">+</button> 
        </div>
    `
})

render(htmlToBeRendered)

function render(html) {
    contentContainer.innerHTML = html
}



let orders = []
let orderHtml = ''

document.addEventListener('click', (e) => {
    if (e.target.dataset.item === 'Pizza') {
        orders.push( menuArray.filter(selected => selected.name === e.target.dataset.item)[0])
        renderOrderList(orders)
        calculateTotalPrice(orders)
    } 
    else if (e.target.dataset.item === 'Hamburger') {
        orders.push( menuArray.filter(selected => selected.name === e.target.dataset.item)[0])
        renderOrderList(orders)
        calculateTotalPrice(orders)
    } 
    else if (e.target.dataset.item === 'Beer') {
        orders.push( menuArray.filter(selected => selected.name === e.target.dataset.item)[0])
        renderOrderList(orders)
        calculateTotalPrice(orders)
        
    }  
    else if (e.target.dataset.remove) {
        orders = orders.filter(order => order.name !== e.target.dataset.remove)
        renderOrderList(orders)
        calculateTotalPrice(orders)
        
    }

    if (orders) {
        orderSection.style.visibility = 'visible'
    } 
    
})

function renderOrderList(orderList) {
    let orderListHtml = ''
    orderList.forEach(order => {
        orderListHtml += `
            <div class="order-list-item">
                <div class="order-list-item-left">
                    <h3 class="item-text">${order.name}</h3>
                    <p class="remove-btn" id="remove-btn" data-remove="${order.name}">remove</p>
                </div>
                <p class="price-tag">$${order.price}</p>
            </div>
        `
    })
    document.getElementById('ordered-items').innerHTML = orderListHtml
}

function calculateTotalPrice(orderList) {
    let total = 0
    orderList.forEach(order => {
        total += order.price
    })
    totalPriceEl.textContent = `$${total}`
} 

// Order button event listener
orderBtn.addEventListener('click', () => {
    modalOverlay.classList.toggle('hidden')
})

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden')
})

userInfoForm.addEventListener('submit', function(e) {
    e.preventDefault()
    modalOverlay.classList.toggle('hidden')
    const formData = new FormData(this)
    orderSection.classList.add('hidden')
    afterPurchaseText.classList.remove('hidden')
    afterPurchaseText.textContent = `Thanks, ${formData.get('name')}! your order is on it's way!`
})

const removeBtn = document.getElementById('remove-btn')