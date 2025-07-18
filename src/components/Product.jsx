import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';

import './styles.css';

const Product = (props) => {
  const [activeColor, setActiveColor] = useState('#b6091d');
  //   Assuming the product will have color variant
  const colors = ['#b6091d', '#16f1a8', '#f5d3ca', '#000'];
  const { product } = props;
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  return (
    <div
      id={product.id}
      key={product.id}
      className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'
    >
      <div className='card shallow-box text-center h-100' key={product.id}>
        <img
          className='card-img-top p-3'
          src={product.image}
          alt='Card'
          height={300}
        />
        <div className='card-body py-0'>
          <h5 className='card-title'>{product.title.substring(0, 12)}...</h5>
          <p className='card-text'>{product.description.substring(0, 90)}...</p>
        </div>
        <div className='color-wrap mb-2'>
          <ul>
            {colors.map((color, index) => (
              <li
                key={index}
                onClick={() => setActiveColor(color)}
                className={`${activeColor === color ? 'active' : ''}`}
                style={{
                  backgroundColor: color,
                  boxShadow:
                    activeColor === color
                      ? `0 0 0 2px #fff, 0 0 0 4px ${color}`
                      : 'none',
                }}
              ></li>
            ))}
          </ul>
          <h4> $ {product.price}</h4>
        </div>
        <div className='card-body py-0'>
          <Link to={'/product/' + product.id} className='btn btn-card m-1'>
            Buy Now
          </Link>
          <button
            disabled={product?.qty === 0}
            className='btn btn-outline btn-card m-1'
            onClick={() => {
              toast.success('Added to cart');
              addProduct(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
