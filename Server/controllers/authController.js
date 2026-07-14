const register = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register API Working...",
  });
};

const login = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login API Working...",  
  });
};

module.exports = {
  register,
  login,
};