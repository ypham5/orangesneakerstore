Orange - Storefront
======================================

The storefront page will contain selling products. Each product will have a buy
now button. The buy now button will submit a form to the NEXT.js API Route that you will call checkout.js.
Pass a hidden field to the checkout route that contains the uid of the product. Grabbing the product data from firebase and pass it to Stripe Checkout as a checkout session to be redirected to the Stripe Checkout where your product will be displayed and the
user will be able to make their purchase.
<!-- toc -->

* [Setting up NEXT.js app](#Setting-Up-Next.js)
* [Setting-up-nextjs](#Setting-up-nextjs)
* [React Loading Data](#React-Loading-Data)
* [Creating Static Pages with Next.js](#Creating-Static-Pages-with-Next.js)
* [Making-payments-stripe](#Making-payments-stripe)



# Setting Up Next.js
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# React Loading Data
## Dashboard 
__Create React App__
CRA Client Side Rendered Web Application
- Show all products in the view all panel
- Reach to the RT Database
- Import Data
- Display data in the ProductCard..

## useEffect(), useState() hooks
# Creating Static Pages with Next.js
Creating Static Pages with Next.js
SSG static site generation, fast loading pages with Nextjs.
getStaticProps =====> server Node.js
## Next.js displaying products
Store Front Adding Product Data from RT Database REST API.
Nextjs displaying products.
```javascript
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
```
# Making payments stripe
Login to your stripe account and access your public and secret keys.
Adding environmental variables.
Adding api routes in Nextjs.
Using Forms in NEXT.js
Making HTTP PUT, POST, UPDATE, DELETE and GET requests with the Fetch API.
## Accept a Payment with Stripe Checkout

Stripe Checkout is the fastest way to get started with payments. Included are some basic build and run scripts you can use to start up the application.
[Test Card Numbers](https://stripe.com/docs/testing)
[Stripe.js Docs](https://stripe.com/docs/js)
[Stripe Docs Accept Payments](https://stripe.com/docs/payments?payments=popular)

### Install Stripe
1. Build the application
~~~shell
$  npm install -D stripe @stripe/stripe-js next
~~~


### Stripe Keys
1. You will need a copy of your Stripe API keys. These are located in the Developers panel in API keys. Make sure your in test move secret key and publishable k and public keys.

 

### Next.js Vercel Environmental Variables
Next.js comes with built-in support for environment variables, which allows you to check stripe in development. Add your stripe
[Next.js Docs Environmental Variables](https://nextjs.org/docs/basic-features/environment-variables).  

You will need to setup both the secret and  
~~~env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_12345
STRIPE_SECRET_KEY=sk_12345
~~~

### Login Out Keys

```javascript

     console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
     console.log(process.env.STRIPE_SECRET_KEY)

}

```

## Connecting Form To Checkout Script.

```javascript
   export default function handler(req, res) {

     if (req.method == "POST") {
     console.log(req.body.uid);
     res.status(200).send(`Post Request Product UID: ${req.body.uid}`);
     } else {
     res.status(200).send(`not a post request`);
     }
     
   }
```
## Triggering The Form Submit HTML Default

```html
     <form action="/api/checkout" method="POST">
     <input type="hidden" name="uid" value={uid}/>
     <button type="submit">Buy Now</button>
     </form>

```

 


##  Stripe Checkout Session
 checkout.js
```javascript
  import { getProduct } from "./../../libs/getProduct";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const product = await getProduct(req.body.uid);
  if(product){
    if (req.method === 'POST') {
        /* 
         Create A Stripe Checkout Session
         line_items: an array/list of items the customer is purchasing (item is an object)  
         make sure the product is a whole number.
        
         mode is type of payment
             subscription: fixed price subscriptions
             setup: if you want to save customer payment details for later purchases
             payment: one time payments

        success_url: redirect page to successfull payment currently will go back to the
                     storefront index page.
    
        cancel_url: redirect page to a cancel payment  page currently will go back to the
                     storefront index page.
        */
      try {
        const session = await stripe.checkout.sessions.create({
              line_items: [
            {
              name:product.productName,
              description: product.productDescription,
              images:[product.imageUrl],
              amount: 15936,
              currency:"CAD",
              quantity:1
  
            },
          ],
          mode: 'payment',
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
   }
}
```

