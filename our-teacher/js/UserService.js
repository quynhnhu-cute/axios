function UserService() {}

UserService.prototype.getUsers = function () {
  return axios({
    url: 'https://60f52fd32208920017f39f5a.mockapi.io/users',
    method: 'GET',
  });
};
