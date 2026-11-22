const categories = [
        {
            category_id : 1,
            products :[
                {
                    name : "Bolt Headphone",
                    price: 2999,
                    rate:4.5,
                    file:"./img/bolt.jpg"
                },
                {
                    name : "Smart watch",
                    price: 4999,
                    rate:4.6,
                    file:"./img/watch.jpg"
                },
                {
                    name : "Noise Cancelling Headphones",
                    price: 5999,
                    rate:3.4,
                    file:"./img/headphone.jpg"
                }
            ]
        },
        {
            category_id : 2,
            products : [ {
                    name : "Shoulder Bag",
                    price: 1999,
                    rate:4.4,
                    file:"./img/bag.jpg"
                },  
                {
                    name : "Sports Shoes",
                    price: 3499,
                    rate:4.7,
                    file:"./img/shoe.jpg"
                }
            ]
        },
        {
            category_id : 3,
            products:[
                {
                name:"Water Bottle",
                price:100,
                rate:4.5,
                file:"./img/bottle.jpg"
            }]
        }
    
    ]

let loadProducts = (categories)=>{
    const div = document.querySelector("#products");
    let rows = "";
    let count = 0;
    categories.forEach(i=>{
        i.products.forEach(j=>{
            const template = `
                <article class="product">
                    <img src="${j.file}" alt="${j.name}">
                    <h3>${j.name}</h3>
                    <p class="rating">★★★★★ <span>${j.rate}</span></p>
                    <h3>₹${j.price}</h3>
                </article>
        `;
        rows += template;
        count++;
        })
    });
    div.innerHTML = rows;
    document.getElementById("count").textContent=`Showing ${count} products`;
}


// input values
let input = document.getElementById('search');

// input search change Event
input.addEventListener('input', (event) => {
    const item = searchProduct(input.value);
    loadProducts(item);
});

let searchProduct = (value) => {
  const searchItem = value.toLowerCase().replace(/\s+/g, " ").trim();

  return categories.map((category) => ({
      ...category,
      products: category.products.filter((product) => {
        const item = product.name.toLowerCase().replace(/[-_]/g, " ");
        return item.includes(searchItem);
      }),
    }))
    .filter((category) => category.products.length > 0);
};

// category filter
const checkboxes = document.querySelectorAll(
    'input[name="category"]'
);

checkboxes.forEach(item => {
    item.addEventListener('change', () => {

        const checkedValues = [...document.querySelectorAll(
            'input[name="category"]:checked'
        )].map(item => Number(item.value));

        const categ = filterByCategoryIds(checkedValues);
        loadProducts(categ);
    });
});

const filterByCategoryIds = (selectedIds)=> {
  if (!selectedIds || selectedIds.length === 0) {
    return categories;
  }
    const result = categories.filter(category =>{
        return selectedIds.includes((category.category_id))
    });
    return result;
}

// filter by price
const priceRadioBtn = document.querySelectorAll('input[name="price"]');

  priceRadioBtn.forEach(btn => {
    btn.addEventListener('change', (event) => {
        const value = event.target.value;
        let filterByPrice = categories.map(category => ({
        ...category,
        products: category.products.filter(product => {
            if (value === "1000") return product.price <= 1000;
            if (value === "5000") return product.price > 1000 && product.price <= 5000;
            if (value === "5001") return product.price > 5000;

            return true;
    })
    })).filter(category => category.products.length > 0);
    loadProducts(filterByPrice);
    });
  });

// filter by rate
const rateRadioBtn = document.querySelectorAll('input[name="rating"]');

  rateRadioBtn.forEach(btn => {
    btn.addEventListener('change', (event) => {
        const value = event.target.value;
        let filterByRate = categories.map(category => ({
        ...category,
        products: category.products.filter(product => {
            if (value === "4") return product.rate >= 4;
            if (value === "3") return product.rate >=3;

            return true;
    })
    })).filter(category => category.products.length > 0);
    loadProducts(filterByRate);
    });
  });


loadProducts(categories);
