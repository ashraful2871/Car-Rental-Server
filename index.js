require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-11-d815b.web.app",
      "https://assignment-11-d815b.firebaseapp.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//verifyToken

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const carCollection = client.db("carDB").collection("cars");
    const carBookingCollection = client.db("carDB").collection("bookings");

    //create token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.SECRET_KEY, {
        expiresIn: "5h",
      });
      res.cookie("token", token, cookieOptions).send({ success: true });
    });

    //clear token
    app.get("/logout", async (req, res) => {
      res.clearCookie("token", cookieOptions).send({ success: true });
    });

    //add car
    app.post("/add_car", async (req, res) => {
      const newCar = req.body;
      const result = await carCollection.insertOne(newCar);
      res.send(result);
    });

    //get all add cars
    app.get("/cars", async (req, res) => {
      const search = req.query.search;
      const sort = req.query.sort;
      let option = {};
      if (sort === "date-dsc") {
        option = { sort: { date: -1 } };
      } else {
        option = { sort: { date: 1 } };
      }

      //search  by input field
      let query = {
        $or: [
          { model: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
      const result = await carCollection.find(query, option).toArray();
      res.send(result);
    });

    //listings car
    app.get("/listings", async (req, res) => {
      const result = await carCollection
        .find()
        .sort({ date: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    //car delete
    app.delete("/cars/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.deleteOne(query);
      res.send(result);
    });

    //get all car specific user who added car
    app.get("/cars/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const decodedMail = req?.user?.email;

      if (decodedMail !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }

      // Proceed with the query
      const sort = req.query.sort;
      const option =
        sort === "dsc" ? { sort: { date: -1 } } : { sort: { date: 1 } };
      const query = { "userDetails.email": email };

      const result = await carCollection.find(query, option).toArray();
      res.send(result);
    });

    //get a single car
    app.get("/car/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    });

    //update car
    app.put("/update_car/:id", async (req, res) => {
      const id = req.params.id;
      const carData = req.body;
      const updatedDoc = {
        $set: carData,
      };
      const query = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const result = await carCollection.updateOne(query, updatedDoc, option);
      res.send(result);
    });

    //save book data in database
    app.post("/add_book", async (req, res) => {
      const bookData = req.body;

      // if a user already booked in a car
      const query = { email: bookData.email, bookId: bookData.bookId };
      const alreadyExist = await carBookingCollection.findOne(query);
      if (alreadyExist) {
        return res.status(400).send("You Already Booked In This Car");
      }
      const result = await carBookingCollection.insertOne(bookData);

      //increase booking count
      const filter = { _id: new ObjectId(bookData.bookId) };
      const update = {
        $inc: {
          booking_count: 1,
        },
      };
      const updateCount = await carCollection.updateOne(filter, update);

      res.send(result);
    });

    // get all book data for a specific user
    app.get("/books/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const decodedMail = req?.user?.email;

      if (decodedMail !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      const query = { email: email };
      const result = await carBookingCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/booking_status_update/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: { status },
      };
      const result = await carBookingCollection.updateOne(filter, update);
      res.send(result);
    });

    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("car server is running");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
