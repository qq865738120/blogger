export default function({ req, redirect }) {
  if (!req || !req.session) return;
  if (!req.session.user) { //验证失败
    redirect('/signin')
  }
}
