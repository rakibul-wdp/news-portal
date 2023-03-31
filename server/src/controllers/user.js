import User from "../models/userModel.js"

exports.FindOrCreateUser = async (req, res) => {
  const name = req.body.username;

  const user = await User.find({ username: name });
  console.log(user);

  if (user.length) {
    console.log("already present")
    return res.json(user);
  }

  const newUser = new User({ username: name });
  const result = await newUser.save();
  console.log("new", result);
  return res.json([result]);
};

exports.GetAllUser = async (req, res) => {
  await User.find({})
    .then((data) => {
      return res.json({ data });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};

exports.UpdateScore = async (req, res) => {
  const { username, score } = req.body;

  let user = await User.findOne({ username });
  // user.username = username;
  user.score = score;

  await user
    .save()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.log(data);
    });
};

exports.AddTodo = (req, res) => {
  const { title, content } = req.body;

  const todo = new Todo({ title, content });
  todo.save((err, data) => {
    if (err) return res.status(400).json({ err });
    return res.json({ data });
  });
};

exports.UpdateTodo = async (req, res) => {
  const { title, content, _id } = req.body;

  let doc = await Todo.findOne({ _id });
  doc.title = title;
  doc.content = content;

  await doc.save((err, data) => {
    if (err) return res.status(400).json({ err });
    return res.json({ data });
  });
};

exports.DeleteTodo = (req, res) => {
  const { _id } = req.body;

  Todo.findByIdAndDelete({ _id }, (err, data) => {
    if (err) return res.status(400).json({ err });
    return res.json({ data });
  });
};