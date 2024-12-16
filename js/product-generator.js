// Product data structure
const productData = [
	{
		id: 1,
		name: "Bamboo Toothbrush",
		price: 5.99,
		image:
			"https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		alt: "Eco-friendly Bamboo Toothbrush",
		category: "Personal Care",
		description: "Sustainable bamboo toothbrush for eco-conscious oral care",
	},
	{
		id: 2,
		name: "Reusable Water Bottle",
		price: 15.99,
		image:
			"https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
		alt: "Eco-friendly Reusable Water Bottle",
		category: "Hydration",
		description: "Durable stainless steel water bottle to reduce plastic waste",
	},
	{
		id: 3,
		name: "Organic Cotton Tote Bag",
		price: 9.99,
		image:
			"https://images.unsplash.com/photo-1597831753759-3e76ad6c0eed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		alt: "Eco-friendly Organic Cotton Tote Bag",
		category: "Accessories",
		description: "Versatile organic cotton bag for sustainable shopping",
	},
];

// Function to generate product HTML
function generateProductHTML(product) {
	return `
        <div class="product-item" data-id="${product.id}" data-category="${
		product.category
	}">
            <img src="${product.image}" alt="${product.alt}"/>
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="btn add-to-cart" data-id="${
							product.id
						}">Add to Cart</button>
        </div>
    `;
}

// Render products to the DOM
function renderProducts(products) {
	const productGrid = document.querySelector(".product-grid");
	if (!productGrid) {
		console.error("Product grid container not found");
		return;
	}

	// Clear existing products
	productGrid.innerHTML = "";

	// Generate and append new products
	const productsHTML = products.map(generateProductHTML).join("");
	productGrid.innerHTML = productsHTML;
}

// Render products when page loads
document.addEventListener("DOMContentLoaded", () => {
	renderProducts(productData);
});
