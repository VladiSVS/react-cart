import './products-list.css'

const ProductsList = (props) => {

    const { dataProduct, onAddCart, checkStyle, onChangeProduct, onIdRem, sortByName, sortByPrice } = props

    return (
        <div className={checkStyle ? 'content' : 'custom'}>
            <div className="sort">
                <button onClick={() => sortByName()}>Name-Sort</button>
                <button onClick={() => sortByPrice()}>Preis-Sort</button>
            </div>
            <div className="contentItems">
                {dataProduct.map(elt =>
                    <figure
                        className="card"
                        key={elt.id}>
                        {checkStyle ? null :
                            <div className="editItem" onClick={() => onIdRem(elt.id)}>
                                <i className="fas fa-times"></i>
                            </div>}
                        <img src={elt.imgUrl} alt=""></img>
                        <figcaption>{elt.name}</figcaption>
                        <div className="toCart">
                            <h1>{elt.price} &euro;</h1>
                            {checkStyle
                                ?
                                <div onClick={() => onAddCart(elt)}>
                                    <i className="fas fa-cart-arrow-down"></i>
                                </div>
                                :
                                <div onClick={() => onChangeProduct(elt)}>
                                    <i className="far fa-edit"></i>
                                </div>
                            }
                        </div>
                    </figure>)}
            </div>
        </div>
    );
}

export default ProductsList;