const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

mongoose
  .connect(
    "mongodb+srv://jkad:qazwsxedc@database.zspz9.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const InvoiceSchema = new mongoose.Schema(
  {
    InvoiceNumber: { type: Number, required: true, unique: true },
    InvoiceDate: { type: String, required: true },
    InvoiceAmount: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InvoiceModel = mongoose.model("invoice", InvoiceSchema);

app.get("/api/v1/invoice", async (req, res) => {
  try {
    const InvoiceData = await InvoiceModel.find();
    res.status(201).json({
      InvoiceData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/v1/add", async (req, res) => {
  const newInvoice = new InvoiceModel({
    InvoiceNumber: req.body.InvoiceNumber,
    InvoiceDate: req.body.InvoiceDate,
    InvoiceAmount: req.body.InvoiceAmount,
  });
  try {
    const addInvoice = await newInvoice.save();
    res.status(201).json({
      addInvoice,
    });
  } catch (err) {
    res.status(500).json({
      status: "Already Invoice Number Added",
    });
  }
});

app.put("/api/v1/update/:number", async (req, res) => {
  const number = req.params.number;

  const updatedInvoice = await InvoiceModel.findOneAndUpdate(
    { InvoiceNumber: +number },
    {
      $set: {
        InvoiceNumber: req.body.InvoiceNumber,
        InvoiceDate: req.body.InvoiceDate,
        InvoiceAmount: req.body.InvoiceAmount,
      },
    },
    {
      new: true,
    }
  );

  if (updatedInvoice !== null) {
    return res.status(201).json({
      updatedInvoice,
    });
  } else {
    return res.status(404).json({
      status: "Invoice Number Not Found",
    });
  }
});

app.delete("/api/v1/remove/:number", async (req, res) => {
  const number = req.params.number;

  const deletedInvoice = await InvoiceModel.findOneAndRemove({
    InvoiceNumber: +number,
  });

  if (deletedInvoice !== null) {
    return res.status(200).json({
      deletedInvoice,
    });
  } else {
    return res.status(404).json({
      status: "Invoice Number Not Found",
    });
  }
});

app.listen(port, () => {
  console.log("express is running");
});
