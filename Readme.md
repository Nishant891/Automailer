# Here's a small demo of the application

https://www.loom.com/share/b275e002c2bc489a9e1b38bba34dd023?sid=2be7ada5-efc0-4954-9772-d0111efcdf61

  Let's start with cloning the repo

```

git clone "https://github.com/Nishant891/Email-Classifier.git"

```

  

### Instalation
  
```

cd client

```
  

```

npm install

```  

### Important Note : Please open http:127.0.0.1:3000 instead of localhost:3000 and http:127.0.0.1:5000 (backend) avoid localhost, may not loopback to the ip address.
   
```

cd server

```


```

npm install

```

### Google Cloud Setup

1. Create an .env file with reference to .env.example present in client as well as server

2. Go to Google Developer Console -> Create a new project -> OAuth consent screen -> Add localhost.com to Authorize domain -> Save

3. Add or remove scopes -> Select the first three options -> Add https://www.googleapis.com/auth/bigquery -> Add https://www.googleapis.com/auth/bigquery.readonly -> Save

4. Add test user. Since the app has not been published only the test users added will be allowed to share data. Add emails for testing purposes. -> Save

5. Go to credentials -> Create Credentials -> Add Authorised JavaScript origins -> http://localhost:3000, http://localhost:5173, http://127.0.0.1:5000, http://127.0.0.1:3000 -> Add Authorized redirect URIs -> http://127.0.0.1:5000/oauth -> Create

6. Get the Client Id and Client secret for the env in backend.

### Gemini API Setup

The assignment asked for OpenAI. Tried for 3hrs but kept getting an error of token limit reached. They really wants us to increased limits, couldn't sign up with card.

1. Go to Build with Gemini -> Get API Key -> Create API Key -> Select the project created -> Paste the key in .env(client)

And we are all set

```

npm run dev

```

Thank you for the visit