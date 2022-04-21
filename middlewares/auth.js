function auth(request, response, next) {
  if (!request.session.user) return response.redirect('/admin/users/login');

  next();
}

module.exports = auth;
