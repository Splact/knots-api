/**
 * A model for our user
 */
'use strict';
var mongoose  = require('mongoose'),
    crypto    = require('crypto'),
    jwt       = require('jsonwebtoken'),
    constants = require('../lib/constants');


var userModel = function () {

  /// PRIVATE METHODS
  // Generate token
  var _generateToken = function(user) {
    var date = new Date();
    var s = date.toISOString();
    return jwt.sign(s + user.username, "E<D;A|[w8a~G7cR::3[-8nHZqy4h*HgwsyBV=D8vE`0NQ*.x4.F31J6b0f(&]9T"/*config.get('security:jwtSecret')*/);
  };
  // Generate salt
  var _makeSalt = function() {
    return crypto.randomBytes(16).toString('base64');
  };

  /// SCHEMAS
  var userSchema = mongoose.Schema({
    displayName: String,
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    picture: String,
    position: {
      type: {type: String, default: 'Point', enum: ['Point']},
      coordinates: [mongoose.Schema.Types.Mixed]
    },

    // security info
    role: String,
    hashedPassword: String,
    token: {
      type: String,
      unique: true
    },
    salt: String,
    facebook: Object,

    active: {type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  /// PLUGINS
  /// none

  /// VIRTUALS
  userSchema.virtual('password')
    .set(function (password) {
      this._password = password;
      this.salt = _makeSalt();
      this.hashedPassword = this.hashPassword(password);
    });

  /// METHODS
  userSchema.methods = {
    // hash password
    hashPassword: function (password) {
      if (!password || !this.salt) return '';
      var salt = new Buffer(this.salt, 'base64');
      return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },
    // check if the password match
    authenticate: function (plainText) {
      return this.hashPassword(plainText) === this.hashedPassword;
    },
    view: function(type) {
      switch (type) {
        case constants.MODEL_VIEW_ALL:
          return {
            displayName: this.displayName,
            username: this.username,
            picture: this.picture,
            role: this.role,
            hashedPassword: this.hashedPassword,
            token: this.token,
            salt: this.salt,
            facebook: this.facebook,
            active: this.active,
            position: {
              lat: this.position.coordinates[1],
              lng: this.position.coordinates[0]
            },
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
          };
        case constants.MODEL_VIEW_AUTH:
          return {
            token: this.token
          };
        case constants.MODEL_VIEW_DEFAULT:
        case constants.MODEL_VIEW_PROFILE:
        default:
          return {
            displayName: this.displayName,
            username: this.username,
            picture: this.picture,
            role: this.role,
            position: {
              lat: this.position.coordinates[1],
              lng: this.position.coordinates[0]
            }
          }
      }
    }
  }

  /// HOOKS
  /**
   * Helper function that hooks into the 'save' method
   */
  userSchema.pre('save', function (next) {

    if (!this.token)
      this.token = _generateToken(this);

    this.updatedAt = Date.now();
    //Continue with the save operation
    next();
  });

  return mongoose.model('User', userSchema);
};

module.exports = new userModel();
