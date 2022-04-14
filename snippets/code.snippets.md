# Code Snippets

### Login Out Keys

```javascript

     console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
     console.log(process.env.STRIPE_SECRET_KEY)

}

```

### Connecting Form To Checkout Script.

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
