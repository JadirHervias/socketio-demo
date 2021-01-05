const mongoose = require('mongoose');
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/chat');

const userSchema = new Schema({
  _id: String,
  first_name: String,
  last_name: String,
  timezone: String,
  locale: String,
  profile_pic: String,
});

const userModel = mongoose.model('user', userSchema, 'users');

module.exports = {
  create: function (data, callback) {
    const item = {
      _id: data._id,
      first_name: data.first_name,
      last_name: data.last_name,
      timezone: data.timezone,
      locale: data.locale,
      profile_pic: data.profile_pic,
    };

    const nuevo = new userModel(item).save();
    callback(item);
  },
  show: function (callback) {
    userModel.find({}, (error, items) => {
      if (!error) callback(JSON.stringify(items));
      else return console.log(error);
    });
  },
  update: function (data, callback) {
    userModel.findOne({ _id: data._id }, (error, items) => {
      item.first_name = data.first_name;
      item.last_name = data.last_name;
      item.timezone = data.timezone;
      item.locale = data.locale;
      item.profile_pic = data.profile_pic;
      item.save();
      callback(item);
    });
  },
  delete: function (_id, callback) {
    userModel.findOne({ _id: _id }, (error, post) => {
      post.remove();
      callback(_id);
    });
  },
};
