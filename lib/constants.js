'use strict';

/// ROLES related constants - 1000
module.exports.ROLE_GOD     = 1001;
module.exports.ROLE_ADMIN   = 1002;
module.exports.ROLE_USER    = 1003;

/// PERMISSIONS related constants        - 2000
module.exports.PERMISSION_READ_PROFILE   = 2001;
module.exports.PERMISSION_UPDATE_PROFILE = 2002;

/// AUTH related constants            - 3000
module.exports.AUTH_DOESNT_MATCH      = 3001;
module.exports.AUTH_UNVERIFIED_EMAIL  = 3002;
module.exports.AUTH_INACTIVE          = 3003;
module.exports.AUTH_PERMISSION_DENIED = 3004;
module.exports.AUTH_LOGIN_NEEDED      = 3005;

/// MODELS related constants      - 4000
module.exports.MODEL_VIEW_DEFAULT = 4001;
module.exports.MODEL_VIEW_ALL     = 4002;
module.exports.MODEL_VIEW_AUTH    = 4003;
module.exports.MODEL_VIEW_PROFILE = 4004;
