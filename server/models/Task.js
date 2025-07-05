const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);
