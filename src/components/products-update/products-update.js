import './products-update.css';
import './products-update-media.css';

import ProductsList from '../products-list/products-list';
import { useState } from 'react';

const UpdateProducts = (props) => {

    const { dataProduct, onUpdateProducts, onRemoveProduct, sortByName, sortByPrice } = props;
    const [maxId, setMaxId] = useState(dataProduct.length);
    const [checkStyle, setCheckStyle] = useState(true);
    const [product, setProduct] = useState({
        id: maxId,
        name: '',
        imgUrl: '',
        price: ''
    });

    const onValueChange = (e) => {
        setProduct({
            ...product, [e.target.name]: e.target.value,
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (product.name.length < 3 || product.price.length === 0) {
            return console.log('error');
        } else {
            console.log('Form send');
            setMaxId(maxId + 1);
            setProduct({
                id: maxId,
                name: '',
                imgUrl: '',
                price: ''
            });
            onUpdateProducts(product);
            setCheckStyle(true);
        }
    }

    const onChangeProduct = (elt) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCheckStyle(!checkStyle);
        if (checkStyle) {
            setProduct(elt);
        } else {
            setProduct({
                id: elt.id,
                name: '',
                imgUrl: '',
                price: ''
            });
        }
    }

    const onIdRem = (id) => {
        onRemoveProduct(id);
    }

    return (
        <div className="content" >
            <div className="contentForm">
                <form className="submitForm" onSubmit={onSubmit}>
                    <input type="text"
                        placeholder="Name"
                        name="name"
                        value={product.name}
                        onChange={onValueChange}
                    />
                    <input type="text"
                        placeholder="URL bild"
                        name="imgUrl"
                        value={product.imgUrl}
                        onChange={onValueChange}
                    />
                    <input type="number"
                        placeholder="Preis"
                        name="price"
                        value={product.price}
                        onChange={onValueChange}
                    />
                    {checkStyle
                        ?
                        <button
                            type="submit">HINZUF??GEN
                        </button>
                        :
                        <button style={{ background: 'orange' }}
                            type="submit">AKTUALISIEREN
                        </button>}
                </form>
            </div>
            <ProductsList
                onChangeProduct={onChangeProduct}
                sortByName={sortByName}
                sortByPrice={sortByPrice}
                onIdRem={onIdRem}
                dataProduct={dataProduct}
                checkStyle={false} />
        </div >

    );
}

export default UpdateProducts;