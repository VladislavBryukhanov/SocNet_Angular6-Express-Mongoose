export class User {
  _id: String;
  login: String;
  username: String;
  password: String;
  avatar: String;
  bio: String;

  constructor(login: String, username: String, password: String) {
    this.login = login;
    this.username = username;
    this.password = password;
  }
}
