import './cart.css';
import './cart-media.css';

import EmptyCart from '../empty-cart/empty-cart';

const Cart = (props) => {

    const { selectedProduct, onAddCart, onRemoveCart, onDeleteProductCart } = props;
    const totalPrice = selectedProduct.reduce((a, c) => a + c.quantity * c.price, 0);

    return (
        <div className="content">
            {selectedProduct.length === 0 ? <EmptyCart /> :
                <ul className="cartList">
                    {selectedProduct.map(elt =>
                        <li key={elt.id}>
                            <div>
                                <img src={elt.imgUrl} alt=""></img>
                                <span>{elt.name}</span>
                            </div>
                            <div>
                                <h1>{elt.price} &euro;</h1>
                            </div>
                            <div>
                                <div className="counterItem">
                                    <div className="value-button" id="decrease" onClick={() => onRemoveCart(elt)}>-</div>
                                    <div className="m1">
                                        <span>{elt.quantity} </span>
                                    </div>
                                    <div className="value-button" id="increase" onClick={() => onAddCart(elt)}>+</div>
                                </div>
                                <div className="deleteItem" onClick={() => onDeleteProductCart(elt.id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </div>
                            </div>
                        </li>
                    )}
                    <div className="totalPrice">
                        <div>
                            <h2>ZWISCHENSUMME</h2>
                            <h1>{totalPrice.toFixed(1)} &euro;</h1>
                        </div>
                    </div>
                </ul>}
        </div >
    );
}

export default Cart;