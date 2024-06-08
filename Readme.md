1. Clone the project in your local machine run

```
git clone "https://github.com/Nishant891/DNS-Manager.git"
```

### Frontend

2. run

```
cd client
```


3. and then run 

```
npm install
```

4. Then run

```
npm run dev
```


### Backend

5. run

```
cd server
```


6. and then run

```
npm install
```


7. Create an .env file all the env api keys are provided in .env.example

8. Enter port as 8000 in .env file

9. Enter any alphanumeric string as Activation secret

10. Go to mongodb create a cluster and add the url in DB_URI

11.

```
npm run dev
```

12. You are good to go, create any user from signup, accesstoken and refreshtoken will be stored and the normal flow continues, you may get an Unable to fetch Records alert ignore it, it was suppose to fetch your records from AWS route53.
