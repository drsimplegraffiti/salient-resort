require("dotenv/config");
const express = require("express")
const cors = require("cors");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
const connectDB = require("./db/db");
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const app = express()

const port = process.env.PORT || 4545

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(express.json());

connectDB();

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

app.post("/signup", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);


      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = await User.findOne({
        email: profile?.email,
      });

      if (existsInDB) {
        return res.status(400).json({
          message: "You are already registered. Please login",
        });
      } else {
        const user = new User({
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        });

        await user.save();
      }
      return res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    } 

    const { firstName, lastName, email, password } = req.body;

    const existsInDB = await User.findOne({
      email,
    });

    if (existsInDB) {
      return res.status(400).json({
        message: "You are already registered. Please login",
      });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      picture: "https://i.pravatar.cc/150?img=1",
      token: jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }),
    });

    await user.save();

    return res.status(201).json({
      message: "Signup was successful",
      user: {
        firstName,
        lastName,
        email
      }
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});


app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = await User.findOne({
        email: profile?.email,
      });

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      return res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    } 

    const { email, password } = req.body;

    const existsInDB = await User.findOne({
      email,
    });

    if (!existsInDB) {
      return res.status(400).json({
        message: "You are not registered. Please sign up",
      });
    }

    if (existsInDB.password !== password) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    return res.status(201).json({
      message: "Login was successful",
      user: {
        firstName: existsInDB.firstName,
        lastName: existsInDB.lastName,
        picture: existsInDB.picture,
        email: existsInDB.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error?.message || error,
    });
  }
});


// 404 handler
app.use((req, res, next) => {
    res.status(404).send("404: Page not Found");
});
    
// 500 handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500: Internal Server Error");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

