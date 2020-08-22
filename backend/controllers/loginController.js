module.exports = {
  register(req, res) {
    try {
      const { username, password } = req.body;
      res.json({ user: username, password: password });
    } catch (error) {
      console.log(error);
    }
  },
};
