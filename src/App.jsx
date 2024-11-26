import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [categoria, setCategoria] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (categoria) {
      axios.get(`https://fakestoreapi.com/products/category/${categoria}`)
        .then((response) => {
          setProductos(response.data.slice(0, 10)); 
        })
        .catch((error) => {
          console.error('error en la busqueda de productos', error);
          setProductos([]);
        });
    } else {
      setProductos([]); 
    }
  }, [categoria]);

  return (
    <>
    <h1>productos por categoria</h1>
    <select onChange={(elem) => setCategoria(elem.target.value)} value={categoria}>
      <option value="">selecciona una categoria</option>
      <option value="electronics">tecnologia</option>
      <option value="jewelery">joyas</option>
      <option value="men's clothing">ropa de hombre</option>
    </select>

    {productos.length === 0 && !categoria && <h2>no hay categoria seleccionada, no se muestran productos</h2>}

    {productos.length > 0 && (
      <ul>{productos.map((product) => (<li key={product.id}>{product.title}</li>))}</ul>
    )}

    </>
  );
};

export default App;