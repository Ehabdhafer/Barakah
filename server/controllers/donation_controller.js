const donationmodel = require("../models/donation_model");

// --------------------------------------------------get not expired donation --------------------------------------

exports.getdonation = async (req, res) => {
  try {
    const result = await donationmodel.getDonation();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get not expired donation --------------------------------------

exports.getnotexpireddonation = async (req, res) => {
  try {
    const result = await donationmodel.getNotExpiredDonation();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------get expired donation --------------------------------------

exports.getexpireddonation = async (req, res) => {
  try {
    const result = await donationmodel.getExpiredDonation();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------post donation --------------------------------------

const bucket = require("../middleware/firebase.js");

exports.postdonation = async (req, res) => {
  const {
    type,
    details,
    city,
    expiry_date,
    qty,
    free,
    expired,
    additionalnotes,
  } = req.body;
  // The user _id is available from the decoded JWT token
  const user_id = req.user.user_id;
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const fileName = ` ${Date.now()}_${file.originalname}`;
    const fileBuffer = file.buffer;

    // Upload to Firebase Storage
    const fileUpload = bucket.bucket.file(fileName); // Make sure "bucket" is defined
    const blobStream = fileUpload.createWriteStream();

    blobStream.on("finish", async () => {
      // The file has been uploaded
      const imageurl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.bucket.name
      }/o/${encodeURIComponent(fileUpload.name)}?alt=media`;

      await donationmodel.postDonation(
        type,
        details,
        city,
        expiry_date,
        qty,
        user_id,
        free,
        expired,
        additionalnotes,
        imageurl
      );
      res.status(200).json({
        message: `Donation Created Sucessfully`,
      });
    });
    blobStream.end(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------------------------------post donation for business --------------------------------------

exports.postdonationbusiness = async (req, res) => {
  const {
    type,
    details,
    city,
    expiry_date,
    price,
    qty,
    free,
    expired,
    additionalnotes,
  } = req.body;
  const user_id = req.user.user_id;
  try {
    await donationmodel.postDonationBusiness(
      type,
      details,
      city,
      expiry_date,
      price,
      qty,
      user_id,
      free,
      expired,
      additionalnotes
    );
    res.status(200).json({
      message: `Donation Created Sucessfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

// --------------------------------------------------get donation by id --------------------------------------

exports.getdonationid = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await donationmodel.getDonationById(id);
    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

// --------------------------------------------------update donation --------------------------------------

exports.updatedonation = async (req, res) => {
  const { id } = req.params;
  const { type, details, city, expiry_date, price, qty } = req.body;
  try {
    await donationmodel.updateDonation(
      id,
      type,
      details,
      city,
      expiry_date,
      price,
      qty
    );
    res.status(200).json({
      message: `Donation Updated Successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

// --------------------------------------------------delete donation --------------------------------------

exports.deletedonation = async (req, res) => {
  const { id } = req.params;
  try {
    await donationmodel.deleteDonation(id);
    res.status(200).json({
      message: `Donation Deleted Successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

// --------------------------------------------------count all donation  -----------------------------------------

exports.countdonation = async (req, res) => {
  try {
    const result = await donationmodel.countDonation();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
