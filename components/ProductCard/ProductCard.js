import React from 'react';
import Image from 'next/image';
import {productCard, productInfo, cardBody, cardFooter, blackbtn, price, name, description} from './styles.module.scss'


const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 90}`
}


function ProductCard({ children, product, ...props }) {
  const { productName, productPrice, imageUrl, productDescription, uid } = { ...product }
  return (
    <div className={productCard}>
      <div className={cardBody}>
        <Image
          loader={myLoader}
          src={imageUrl}
          alt={productName}
          width={480}
          height={440}
          quality={100}
          layout="intrinsic"
        />
        <div className={productInfo}>
          <h2 className={name}>{productName}</h2>
          <p className={price}>${productPrice}</p>
          <p className={description}>{productDescription}</p>
        </div>
      </div>
      <div className={cardFooter}>
        <form action="/api/checkout" method="POST">
          <input type="hidden" name="uid" value={uid} />
          <button className={blackbtn} type="submit">Buy Now</button>
        </form>
      </div>
    </div>
  )
}

export default ProductCard;