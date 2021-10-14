# Assumptions
1. I used the sample `accounts_large.json` solely to test performance and the code. I did not create a separate endpoint for it.
2. No real proper error handling was implemented. Simple handling of Malformed Request - 400 request was done.
3. Filtering is strict, no `LIKE` queries or any sort fuzzy filtering.
4. I would also typically .gitignore the `lib` folder from being pushed into the github repo, but for the sake of the this exercise, I kept it there to allow it to be ran for validation in case something doesn't work with yarn commands and development environment.

# Getting Started
1. Run `yarn install`
2. Run `yarn start`
    - This runs both the `build` script in the `package.json` which leverages the `copy-data` script which copies the sample data to the `lib` directory which is the distribution folder.
    - A `lib` folder will get created which is the distribution folder with the transpiled typescript to javascript.
    - In the `start` script, we invoke our `build` script, which also chains the `node .` command. Since `main` in the `package.json` targets `lib/index.js`, the transpiled typescript will run and the expressjs server will run.
3. Sample requests and payloads:
```
$ curl http://localhost:8080/accounts?page=1&limit=20&order_by=asc&sort_by=country&filter[mfa]=TOTP&filter[country]=UY

$ [
  {
    "firstName": "Brock",
    "lastName": "Ledner",
    "country": "UY",
    "email": "Stephanie20@gmail.com",
    "dob": "1991-08-29T18:17:54.800Z",
    "mfa": "TOTP",
    "amt": 77202222,
    "createdDate": "2020-09-16T02:28:00.423Z",
    "referredBy": null
  },
  {
    "firstName": "Freddy",
    "lastName": "Kihn",
    "country": "UY",
    "email": "Einar_Franecki74@yahoo.com",
    "dob": "1951-05-24T07:20:45.187Z",
    "mfa": "TOTP",
    "amt": 140812674,
    "createdDate": "2018-11-06T00:50:34.875Z",
    "referredBy": null,
    "ReferredBy": "Napoleon41@yahoo.com"
  },
  {
    "firstName": "Joel",
    "lastName": "Brown",
    "country": "UY",
    "email": "Oran.Crist81@gmail.com",
    "dob": "1954-11-24T09:20:55.706Z",
    "mfa": "TOTP",
    "amt": 546757662,
    "createdDate": "2020-09-10T22:01:05.247Z",
    "referredBy": null
  },
  {
    "firstName": "Amani",
    "lastName": "Bins",
    "country": "UY",
    "email": "Arvilla29@yahoo.com",
    "dob": "1981-09-20T11:59:00.591Z",
    "mfa": "TOTP",
    "amt": 823810346,
    "createdDate": "2019-07-19T15:38:51.395Z",
    "referredBy": null
  }
]
```

## Supported Query Parameters
1. `filter[<any option below>]`
    - `mfa`
    - `country`
    - `firstName`
    - `lastName`
2. `order_by=<any option below>`
    - asc
    - desc
3. `sort_by=<any valid key as part of the objects>` - defaults to `createdDate`
4. `page=<integer>` - defaults to the first page, 1
5. `limit=<integer>` - defaults to 10 results

## Sample Data
1. To test with the `accounts_large.json`, simply change the line 1 in `src/services/accounts.ts`, from:
```
import accounts from "../data/accounts.json";
...
```
```
import accounts from "../data/accounts_large.json";
...
```
2. Run `yarn start` again.
