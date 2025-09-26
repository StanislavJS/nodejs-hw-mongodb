import * as authService from "../services/auth.mjs";

export const registerController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.register(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: 201,
      message: "Successfully registered a user!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      message: "Successfully logged in a user!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const oldToken = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await authService.refresh(oldToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const oldToken = req.cookies.refreshToken;
    await authService.logout(oldToken);

    res.clearCookie("refreshToken");

    res.status(200).json({
      status: 200,
      message: "Successfully logged out!",
    });
  } catch (error) {
    next(error);
  }
};
