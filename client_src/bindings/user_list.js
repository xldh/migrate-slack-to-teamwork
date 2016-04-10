var ko = require('knockout');

function UserListBinding(model) {
    var users = model.users;
    var binding = this;
    binding.users = ko.observableArray(users);
}

module.exports = UserListBinding;
