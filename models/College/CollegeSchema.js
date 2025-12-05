import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  address_line1: { type: String, required: true },
  address_line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number }
});

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, enum: ["Government", "Private", "Autonomous"] },
  affiliation: { type: String },
  established_year: { type: Number },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  logo_url: { type: String },

  addresses: { type: [AddressSchema], required: true }
});

const CollegeUserMongoose = mongoose.model("CollegeData", CollegeSchema);
export default CollegeUserMongoose;
