import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { addItem, selectCartItems } from "./CartSlice.jsx";

const plants = [
  {
    id: "snake-plant",
    name: "Snake Plant",
    category: "Air Purifying Plants",
    price: 24,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    category: "Air Purifying Plants",
    price: 30,
    image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    category: "Low Maintenance Plants",
    price: 32,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    category: "Low Maintenance Plants",
    price: 28,
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lavender",
    name: "Lavender",
    category: "Aromatic Fragrant Plants",
    price: 22,
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "jasmine",
    name: "Jasmine",
    category: "Aromatic Fragrant Plants",
    price: 26,
    image: "https://images.unsplash.com/photo-1612363148951-15f16817648f?auto=format&fit=crop&w=600&q=80",
  },
];

const categories = [...new Set(plants.map((plant) => plant.category))];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartIds = new Set(cartItems.map((item) => item.id));

  return (
    <main className="page-shell product-list">
      <section className="page-heading">
        <p className="eyebrow">Shop the greenhouse</p>
        <h1>Choose Your Houseplants</h1>
      </section>

      {categories.map((category) => (
        <section className="category-section" key={category} aria-labelledby={`${category}-heading`}>
          <h2 id={`${category}-heading`}>{category}</h2>
          <div className="product-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const isAdded = cartIds.has(plant.id);

                return (
                  <article className="product-card plant-card" key={plant.id}>
                    <img className="plant-image" src={plant.image} alt={plant.name} />
                    <div className="product-body">
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="price plant-price">${plant.price.toFixed(2)}</p>
                      <button
                        className="cart-button add-to-cart-button"
                        type="button"
                        disabled={isAdded}
                        onClick={() => dispatch(addItem(plant))}
                      >
                        <ShoppingBag aria-hidden="true" />
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
