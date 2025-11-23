import LoginCredentials from "../models/LoginCredentials.js";

/**
 * Make avatar value a full absolute URL if it looks like a relative path.
 * Uses req to build host: protocol + host header.
 */
function makeAvatarAbsolute(req, avatarPath) {
  if (!avatarPath) return avatarPath;
  // if already absolute (starts with http or https) return as-is
  if (/^https?:\/\//i.test(avatarPath)) return avatarPath;
  // ensure we have protocol + host
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}${avatarPath.startsWith("/") ? avatarPath : `/${avatarPath}`}`;
}

/**
 * Public: get list of users (no passwords)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await LoginCredentials.find().select("_id fullName email avatar createdAt").sort({ fullName: 1 });
    // normalize avatars to absolute URLs using request host
    const mapped = users.map((u) => ({
      _id: u._id,
      fullName: u.fullName,
      email: u.email,
      avatar: u.avatar ? makeAvatarAbsolute(req, u.avatar) : null,
      createdAt: u.createdAt,
    }));
    res.json(mapped);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ message: "Server error while fetching users", error: err.message });
  }
};

/**
 * Update profile: accepts multipart form upload (avatar) and fullName in body.
 * Route is protected (auth middleware must set req.user.id).
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const updates = {};
    if (req.body.fullName) updates.fullName = req.body.fullName;
    if (req.file) {
      // Save path to avatar (served from /uploads). Store relative path in DB for portability,
      // but return an absolute URL to the client.
      const relativePath = `/uploads/${req.file.filename}`;
      updates.avatar = relativePath;
    }

    const user = await LoginCredentials.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return absolute avatar URL
    const returnedUser = {
      ...user.toObject(),
      avatar: user.avatar ? makeAvatarAbsolute(req, user.avatar) : null,
    };

    res.json({ user: returnedUser, message: "Profile updated" });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error updating profile", error: err.message });
  }
};