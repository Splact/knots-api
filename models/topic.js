/**
 * A model for topic
 */
'use strict';
var mongoose  = require('mongoose'),
    constants = require('../lib/constants');

var topicModel = function () {

  /// PRIVATE METHODS
  /// none

  /// SCHEMAS
  var topicSchema = mongoose.Schema({
    tag: {
      type: String,
      lowercase: true,
      trim: true,
      match: /^[a-z]*$/,
      required: true,
      unique: true
    },

    users: { type: [Schema.Types.ObjectId], ref: 'User' },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  /// PLUGINS
  /// none

  /// VIRTUALS
  /// none

  /// METHODS
  topicSchema.methods = {
    view: function(type) {
      switch (type) {
        case constants.MODEL_VIEW_ALL:
          return {
            tag: this.tag,
            users: this.users,
            createdBy: this.createdBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
          };
        case constants.MODEL_VIEW_DEFAULT:
        default:
          return {
            tag: this.tag,
            usersCount: this.users.length,
          }
      }
    }
  };

  /// HOOKS
  /**
   * Helper function that hooks into the 'save' method
   */
  topicSchema.pre('save', function (next) {

    this.updatedAt = Date.now();
    //Continue with the save operation
    next();
  });

  return mongoose.model('Topic', topicSchema);
};

module.exports = new topicModel();
