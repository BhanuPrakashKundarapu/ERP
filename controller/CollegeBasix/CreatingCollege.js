import CollegeUserMongoose from "../../models/College/CollegeSchema.js";

export const CreatingCollege = async (req, res) => {
  console.log("REQUEST BODY:", req.body);

  try {
    const {
      name, code, type, affiliation, established_year,
      email, phone, website, logo_url, addresses
    } = req.body;

    // Basic required fields
    if (!name || !code || !email || !phone || !addresses) {
      return res.status(400).json({ message: "Required fields missing: name, code, email, phone, addresses" });
    }

    // addresses must be a non-empty array
    if (!Array.isArray(addresses) || addresses.length === 0) {
      return res.status(400).json({ message: "At least one address is required" });
    }

    // Validate each address item
    for (let i = 0; i < addresses.length; i++) {
      const a = addresses[i];
      if (!a || !a.address_line1 || !a.city || !a.state || !a.country || !a.pincode) {
        return res.status(400).json({ message: `Address at index ${i} missing required fields (address_line1, city, state, country, pincode)` });
      }
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // established_year if present must be a number (coerce safely)
    let estYear = undefined;
    if (established_year !== undefined && established_year !== null && established_year !== "") {
      estYear = Number(established_year);
      if (Number.isNaN(estYear)) {
        return res.status(400).json({ message: "established_year must be a number" });
      }
    }

    // Duplicate check - use the same model you imported
    const existing = await CollegeUserMongoose.findOne({ $or: [{ code }, { email }] });
    if (existing) {
      return res.status(409).json({ message: "College already exists with this email or code" });
    }

    // Create college document
    const college = new CollegeUserMongoose({
      name,
      code,
      type,
      affiliation,
      established_year: estYear,
      email,
      phone,
      website,
      logo_url,
      addresses
    });
    // console.log(college)
    await college.save();

    return res.status(201).json({
      message: "College created successfully",
      data: college
    });
  } catch (error) {
    console.error("Error in CreatingCollege:", error);
    return res.status(500).json({
      message: "Server error while creating college",
      error: error.message
    });
  }
};
