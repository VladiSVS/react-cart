import '../styles/style.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from '../components/header/header'
import AddProduct from '../components/products-update/products-update'
import ProductsList from '../components/products-list/products-list'
import Cart from '../components/cart/cart'
import { useState, useEffect } from 'react'

import data from '../data/data.json'

const App = () => {

  const [dataProduct, setDataProduct] = useState(data)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [bugger, setBugger] = useState(true)
  const cartAmountItems = selectedProduct.reduce((a, c) => a + c.quantity, 0)

  const onAddCart = (product) => {
    const checkArr = selectedProduct.find(p => p.id === product.id)
    if (checkArr) {
      setSelectedProduct(
        selectedProduct.map(elt =>
          elt.id === product.id ? { ...checkArr, quantity: checkArr.quantity + 1 } : elt
        )
      )
    } else {
      setSelectedProduct([...selectedProduct, { ...product, quantity: 1 }])
    }
  }

  const onRemoveCart = (product) => {
    const checkArr = selectedProduct.find(p => p.id === product.id)
    if (checkArr.quantity > 1) {
      setSelectedProduct(
        selectedProduct.map(elt =>
          elt.id === product.id ? { ...checkArr, quantity: checkArr.quantity - 1 } : elt
        )
      )
    }
    else {
      return
    }
  }

  const onDeleteProductCart = (id) => {
    setSelectedProduct(selectedProduct.filter(elt => elt.id !== id))
  }

  const onUpdateProducts = (product) => {
    let newArr = dataProduct.map(elt => elt.id === product.id ? product : elt)
    setDataProduct([product, ...newArr])
    setBugger(!bugger)
  }

  const onRemoveProduct = (id) => {
    setDataProduct(dataProduct.filter(elt => elt.id !== id))
  }

  useEffect(() => {
    const arr = dataProduct.filter((elt, i) => dataProduct.indexOf(elt) === i)
    setDataProduct(arr)
  }, [bugger]) // eslint-disable-line

  return (

    <BrowserRouter>
      <Header cartAmountItems={cartAmountItems} />
      <Routes>
        <Route path="/" element={
          <ProductsList
            dataProduct={dataProduct}
            onAddCart={onAddCart}
            checkStyle={true}
          />}
        />
        <Route path="add" element={
          <AddProduct
            dataProduct={dataProduct}
            onUpdateProducts={onUpdateProducts}
            onRemoveProduct={onRemoveProduct}
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
