import '../styles/style.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from '../components/header/header';
import UpdateProducts from '../components/products-update/products-update';
import ProductsList from '../components/products-list/products-list';
import Cart from '../components/cart/cart';
import { useState, useEffect } from 'react';

import data from '../data/data.json';

const App = () => {

  const [dataProduct, setDataProduct] = useState(data);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [bugger, setBugger] = useState(true);
  const cartAmountItems = selectedProduct.reduce((a, c) => a + c.quantity, 0);

  const onAddCart = (product) => {
    const checkArr = selectedProduct.find(p => p.id === product.id);
    if (checkArr) {
      setSelectedProduct(
        selectedProduct.map(elt =>
          elt.id === product.id ? { ...checkArr, quantity: checkArr.quantity + 1 } : elt
        )
      );
    } else {
      setSelectedProduct([...selectedProduct, { ...product, quantity: 1 }]);
    }
  }

  const onRemoveCart = (product) => {
    const checkArr = selectedProduct.find(p => p.id === product.id);
    if (checkArr.quantity > 1) {
      setSelectedProduct(
        selectedProduct.map(elt =>
          elt.id === product.id ? { ...checkArr, quantity: checkArr.quantity - 1 } : elt
        )
      );
    }
    else {
      return;
    }
  }

  const onDeleteProductCart = (id) => {
    setSelectedProduct(selectedProduct.filter(elt => elt.id !== id));
  }

  const onUpdateProducts = (product) => {
    let newArr = dataProduct.map(elt => elt.id === product.id ? product : elt);
    setDataProduct([product, ...newArr]);
    setBugger(!bugger);
  }

  const onRemoveProduct = (id) => {
    setDataProduct(dataProduct.filter(elt => elt.id !== id));
  }

  const sortByName = () => {
    let arr = [...dataProduct];
    arr.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    setDataProduct(arr);
  }

  const sortByPrice = () => {
    let arr = [...dataProduct];
    arr.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    setDataProduct(arr);
  }

  useEffect(() => {
    const arr = dataProduct.filter((elt, i) => dataProduct.indexOf(elt) === i);
    setDataProduct(arr);
  }, [bugger]) // eslint-disable-line


  //LocalStorage
  useEffect(() => {
    const locDataProduct = localStorage.getItem('product-data');
    const locSelectedProduct = localStorage.getItem('selected-product');
    if (locDataProduct) {
      setDataProduct(JSON.parse(locDataProduct));
    }
    if (locSelectedProduct) {
      setSelectedProduct(JSON.parse(locSelectedProduct));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('product-data', JSON.stringify(dataProduct));
    localStorage.setItem('selected-product', JSON.stringify(selectedProduct));
  })

  return (

    <BrowserRouter>
      <Header
        cartAmountItems={cartAmountItems}
      />
      <Routes>
        <Route path="/" element={
          <ProductsList
            dataProduct={dataProduct}
            onAddCart={onAddCart}
            sortByName={sortByName}
            sortByPrice={sortByPrice}
            checkStyle={true}
          />}
        />
        <Route path="add" element={
          <UpdateProducts
            dataProduct={dataProduct}
            onUpdateProducts={onUpdateProducts}
            onRemoveProduct={onRemoveProduct}
            sortByName={sortByName}
            sortByPrice={sortByPrice}
          />}
        />
        <Route path="cart" element={
          <Cart
            selectedProduct={selectedProduct}
            onAddCart={onAddCart}
            onRemoveCart={onRemoveCart}
            onDeleteProductCart={onDeleteProductCart}
          />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
