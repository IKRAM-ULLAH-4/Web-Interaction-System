export default function adminAuth(req, res, next) {
  const token = req.headers["x-admin-token"];

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized admin" });
  }

  next();
}
