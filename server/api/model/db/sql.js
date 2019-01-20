module.exports = {
  showUserById: id => {
    return `select * from user where id=${id}`
  },
  showUserByUsername: username => {
    return `select * from user where username=${username}`
  }
}
