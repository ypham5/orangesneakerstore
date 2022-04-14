import {useState, useEffect} from 'react'
import Head from 'next/head'
import { loadStripe } from '@stripe/stripe-js';
import {PageTitle} from './../components/PageTitle'
import {ProductCard} from './../components/ProductCard'
import {Button} from '../components/Button'
import {User} from '../components/User'
/* 
  CRA version of data loading
  assessment 5
  loadingdata ==> api Firebase SDK ref, get(ref)
*/
/*
  SSG Static Site Generation
  content
  data + component
*/
export default function Home(props) {
  const products = props.products;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  return(
    <>
      <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content="Orange - Sneakers" />
      <title>Orange - Sneakers Marketplace</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Tourney:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </Head>
      <PageTitle tagline="new arrivals" title="Orange - Sneakers Marketplace"/>
      <main>
        { products.map(product=> <ProductCard key={product.id} product={product}/>)}
      </main>
    </>
  )
}
 
export async function getStaticProps(){
  // node.js code ...web apis filesystem read writres fetch
  // nextjs five top level fetch api...
  const res = await fetch('https://storefront-eddb1-default-rtdb.firebaseio.com/products.json');
  const productData = await res.json();
  const products = Object.values(productData);
  return{
    props: {
      products
    },
    revalidate: 60,
  }
}