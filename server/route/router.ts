import express from "express";
import { OAuth2Client } from "google-auth-library";
import("node-fetch");

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello! This is Alpha.</h1>");
});

//You will need CLIENT_ID and CLIENT_SECRET see docs for info
router.post("/request", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  //See the oauth route below the redirection occurs in the server itself
  const redirectURL = "http://127.0.0.1:5000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});


router.get("/oauth", async (req, res, next) => {
  const code = req.query.code as string;
  try {
    const redirectURL = "http://127.0.0.1:5000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(r.tokens);
    const user = oAuth2Client.credentials;
    res.cookie("access_token", user.access_token, {
      sameSite: "strict",
    });
    res.cookie("refresh_token", user.refresh_token, {
      sameSite: "strict",
    });
    res.cookie("expires_in", user.expiry_date?.toString(), {
      sameSite: "strict",
    });

    // Redirect
    res.redirect(303, "http://127.0.0.1:3000");
  } catch (err) {
    res.redirect(303, "http://127.0.0.1:3000?error=OAuthError");
  }
});

async function getUserData(access_token: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  return data;
}

router.post("/getUserData", async (req, res, next) => {
  const access_token = req.query.access_token as string;
  if (!access_token) {
    res.status(400).send({
      success: false,
      message: "Access token not received",
    });
  }
  try {
    const user = await getUserData(access_token);
    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Google API Error",
    });
  }
});

async function getUserEmails(access_token: string, maxResults: number) {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
    {
      method: "GET",
      headers: new Headers({ Authorization: `Bearer ${access_token}` }),
    }
  );
  const data = await response.json();
  return data;
}

router.post("/getUserEmails", async (req, res) => {
  const access_token = req.query.access_token as string;
  const number = req.query.maxResults as string;

  const maxResults = parseInt(number);

  if (!access_token) {
    res.status(400).send({
      success: false,
      message: "Access token not received",
    });
  }

  try {
    const emails = await getUserEmails(access_token, maxResults);
    res.status(200).send({
      success: true,
      message: "Emails fetched successfully",
      data: emails,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Google API Error",
    });
  }
});
