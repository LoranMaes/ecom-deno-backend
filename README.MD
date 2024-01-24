
# Deno Ecommerce Backend

Dit is een Deno API die gebruikt maak van de middleware Oak met een MongoDB backend. 
Er is een mogelijkheid om gebruikers aan te melden, in te loggen, shops aan te maken, shops op te vragen en shops per id op te halen.

## Lokaal runnen

## Online beschikbaarheid

De API is beschikbaar via de volgende URL:

[clean-cat-51.deno.dev](clean-cat-51.deno.dev)


## Deployment

Om dit project te runnen moet Deno geïnstalleerd worden.

```bash
  # For MacOS
  curl -fsSL https://deno.land/install.sh | sh

  # For Windows
  irm https://deno.land/install.ps1 | iex

  # For Linux
  curl -fsSL https://deno.land/install.sh | sh
```

Voer dan in de project folder het volgende commando uit.

```bash
    Deno run -A --watch app.ts
```
## API Routes

- GET /api
- POST /api/signup
    - This is for signing up a user
- POST /api/signin
    - Logging a user in
- GET /api/user
    - Gives the user data (JWT Token required from login)
- GET /api/shops
    - Gives all the shops
- GET /api/shops/id
    - Gives all the shops with their owners and items
- POST /api/shop
    - This creates a new shop and connects the current logged in user with this shop.
## License

[MIT](https://choosealicense.com/licenses/mit/)

