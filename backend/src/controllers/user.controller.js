import User from "../models/user.model.js";

/**
 * @route   GET /api/users/profile
 * @desc    Retrieve the authenticated user's profile
 * @access  Private
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return AppResponse.success(res, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
};
