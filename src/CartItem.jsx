import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  removeItem,
  selectCartItems,
  selectCartQuantity,
  selectCartTotal,
  updateQuantity,
} from "./CartSlice.jsx";

function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartQuantity);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <main className="page-shell cart-page cart-container">
      <section className="page-heading cart-heading">
        <div>
          <p className="eyebrow">Your selection</p>
          <h1>Shopping Cart</h1>
        </div>
        <div className="cart-summary" aria-label="Cart totals">
          <span>Total plants: {cartQuantity}</span>
          <strong>Total: ${cartTotal.toFixed(2)}</strong>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Find the right plant for your light, space, and care style.</p>
          <Link className="primary-button" to="/plants">
            Continue Shopping
          </Link>
        </section>
      ) : (
        <>
          <section className="cart-list cart-items" aria-label="Plants in cart">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">Unit price: ${item.price.toFixed(2)}</p>
                  <p className="line-total cart-item-total">
                    Item total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="quantity-controls cart-item-quantity" aria-label={`${item.name} quantity controls`}>
                  <button
                    className="decrease-button"
                    type="button"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  <span aria-label={`${item.name} quantity`}>{item.quantity}</span>
                  <button
                    className="increase-button"
                    type="button"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus aria-hidden="true" />
                  </button>
                </div>
                <button
                  className="delete-button remove-button"
                  type="button"
                  onClick={() => dispatch(removeItem(item.id))}
                  aria-label={`Delete ${item.name} from cart`}
                >
                  <Trash2 aria-hidden="true" />
                  Delete
                </button>
              </article>
            ))}
          </section>

          <section className="cart-actions" aria-label="Cart actions">
            <Link className="secondary-button" to="/plants">
              Continue Shopping
            </Link>
            <button type="button" className="primary-button checkout-button" onClick={() => alert("Coming Soon")}>
              Checkout
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default CartItem;
