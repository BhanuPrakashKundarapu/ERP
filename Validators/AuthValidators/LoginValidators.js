// validateCredentials.js
const validator = require("validator");

const validateCredentials = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const sqlInjectionPattern = /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|EXEC|UNION|--|;|\/\*|\*\/)\b)/i;
    if (sqlInjectionPattern.test(email) || sqlInjectionPattern.test(password)) {
      return res.status(400).json({ error: "Potential SQL injection detected" });
    }

    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
      return res.status(400).json({
        error:
          "Password should be at least 8 characters long and include uppercase, lowercase, and a number",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Validation error", details: err.message });
  }
};

module.exports = validateCredentials;
