// IMPORTING ALL THE BACKEND PACKAGES

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

// TO CREATE A WEB SERVER USING EXPRESS IS TO  RUN EXPRESS AS A FUNCTION AND SET THE RESULT INSIDE APP VARIABLE
const app = express();
// USING BODY PARSER
// THE BODY PARSER IS AN OBJECT AND WE CALLED THE JSON FUNCTION OF THE OBJECT WHICH MEANS THAT WHEN A NEW REQUEST COMES INTO THE SERVER, IT  TREAT THE BODY AND INTERPRETE IT AS A JSON CONTENT 
app.use(bodyParser.json());


// ==================================================
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));
// =====================================================

// INITIALIZING MONGO DATABASE
// TWO PARAMETER, URL OF THE CONNECTION TO THE MONGODB DATABASE, AFTER THE SLASH IS THE NAME OF YOUR DATABASE
// THE SECOND PARAMETER IS A BUNCH OF OPTION FOR BETTER CONNECTING TO THE DATABASE
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);


// DEFINING THE PRODUCT MODEL
// MONGOOSE MODEL IS RESPONSIBLE FOR CREATING THE MODEL, TWO PARAMETERS, THE NAME OF THE COLLECTION INSIDE THE DATABASE AND THE LIST OF FIELD OF THE MODEL INTO THE DATABASE
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    //   WITH SHORTID, WHEN YOU CREATE A NEW PRODUCT INTO THE DATABASE ANEW ID FROM SHORT ID WILL BE CREATED AND SET TO THE ID
    // IMPLIMENTING THE REQUIRED FIELDS FOR THE PRODUCTS AND THE TYPE
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

// DEFINING THE ENDPOINTS
app.get("/api/products", async (req, res) => {
    // GETTING THE LIST OF PRODUCTS FROM DATABASE WITH GET REQUEST
    // FIRST WE GET ACCESS INTO THE MODEL AND CALL THE FUNCTION FIND WITH EMPTY PARAMETER, WHICH MEANS THERE IS NO CONDITION AND SHOULD RETURN ALL PRODUCT 
    // FIND IS A PROMISE THATS WHY WE AWAIT THE RESPONSE
  const products = await Product.find({});
//   SENDING BACK THE PRODUCT TO THE USER
  res.send(products);
});


// ENDPOINT TO CREATE A PRODUCT BY THE USER
app.post("/api/products", async (req, res) => {
    // CREATING NEW PRODUCT BY THE USER
  const newProduct = new Product(req.body);
//   SAVING THE PRODUCT INTO THE DATABASE
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});


// API TO DELETE PRODUCT, IT GETS THE ID OF PRODUCT THAT IS TO BE DELETED
app.delete("/api/products/:id", async (req, res) => {
    // FINDBYID COMES FROM PRODUCT MODEL, AND THE PARAMETER IS EXACTLY THE VALUE THE USER ENTER
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//   RETURN THE RESULT TO THE USER
  res.send(deletedProduct);
});


// ==============================================
// THE FIRST PARAMETER IS THE NAME OF THE COLLECTION IN THE DATABASE AND THE SECOND IS THE NAME OF THE SCHEMA
const Order = mongoose.model(
  "order",
  new mongoose.Schema(
  // WE ENTER THE INFORMATION ABOUT THE ORDER MODEL
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          // DEFINING EACH ELEMENT OF THE ARRAY
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      // WITH THE TIMESTAMP SETTING, CREATED AT AND UPDATED AT FIELD WILL BE AUTOMATICALLY ADDED TO THE ORDER
      timestamps: true,
    }
  )
);

// POST API TO INSERT A NEW ITEM INTO THE ORDER COLLECTION
app.post("/api/orders", async (req, res) => {
  // CHECKING THE CLIENT DATA AND ENSURE THAT ALL REQUIRE FIELD EXIST
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  // IF ALL REQUIRED FIELD EXIST THEN CREATE ORDER
  const order = await Order(req.body).save();
  res.send(order);
});


app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
app.delete("/api/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});


// DEFINING THE PORT, THE PORT NO COMES FROM PROCESS.ENV THAT SET THE PORT NO, BUT IF IT DOESNOT EXIST, IT USE THE DEFAULT PORT 5000
const port = process.env.PORT || 5000;
// LISTEN TO THE PORT AND CONSOLE LOG MESSAGE
app.listen(port, () => console.log("serve at http://localhost:5000"));