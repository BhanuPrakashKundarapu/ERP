// middleware/validateUser.js
const validateRegister = (req, res, next) => {
  // console.log(req.body)
  const { email, password, firstName, phone, altphone, role } = req.body;

  // Basic field validation
  if (!firstName || !email || !phone || !altphone || !password || !role) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  // Prevent SQL injection-like patterns
  const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC)\b|;|--|\*|\/\*|\*\/)/i;
  if (sqlInjectionPattern.test(email) || sqlInjectionPattern.test(password)) {
    return res.status(400).json({ message: "Invalid characters detected" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Strong password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    });
  }

  next();
};

module.exports=validateRegister;