import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { addItem, selectCartItems } from "./CartSlice.jsx";

const plants = [
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    category: "Statement Plants",
    price: 32,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    category: "Statement Plants",
    price: 45,
    image: "https://images.unsplash.com/photo-1597055181449-b9b97f5b5f1f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    category: "Low Light Favorites",
    price: 24,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    category: "Low Light Favorites",
    price: 28,
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    category: "Succulents",
    price: 18,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "jade-plant",
    name: "Jade Plant",
    category: "Succulents",
    price: 20,
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=600&q=80",
  },
];

const categories = [...new Set(plants.map((plant) => plant.category))];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartIds = new Set(cartItems.map((item) => item.id));

  return (
    <main className="page-shell">
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
                  <article className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <div className="product-body">
                      <h3>{plant.name}</h3>
                      <p className="price">${plant.price.toFixed(2)}</p>
                      <button
                        className="cart-button"
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
