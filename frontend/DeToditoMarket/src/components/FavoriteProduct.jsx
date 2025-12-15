import React from 'react';
import './FavoriteProduct.css';

const FavoriteProduct = () => {
  return (
    <div className="favorite-product">
      <h3 className="section-title">Producto Favorito</h3>
      <div className="product-card">
        <div className="product-image">
          <div className="maizena-box">
            <div className="maizena-header">
              <span className="maizena-number">1</span>
              <span className="maizena-title">MAIZENA</span>
            </div>
            <div className="maizena-body">
              <div className="maizena-circle"></div>
            </div>
            <div className="maizena-footer">
              <span>FÉCULA DE MAÍZ</span>
            </div>
          </div>
        </div>
        <div className="product-info">
          <h4 className="product-name">Nombre del producto</h4>
          <p className="product-detail">Detalles</p>
          <p className="product-detail">Detalles</p>
          <p className="product-detail">Detalles</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProduct;
