const User = require("../models/User");
const UserPerso = require("../models/UserPerso");
const SocialMedia = require("../models/SocialMedia");
const Header = require("../models/Header");
const Footer = require("../models/Footer");
const Button = require("../models/Button");
const Texts = require("../models/Texts");
const Body = require("../models/Body");
const multer = require("multer");
const getUserById = async (req, res) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ where: { id } });

    res.status(200).json({ username: user.username, status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};
const getUserInfosByUserId = async (req, res) => {
  try {
    const user_id = req.userId;
    const userPerso = await UserPerso.findOne({
      where: { user_id },
      include: SocialMedia,
    });
    if (!userPerso) {
      return res.json({
        message: "User Informations not found",
        status: "notFound",
      });
    }

    res.status(200).json({
      message: "User Informations found!",
      userPerso,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch UserPerso data",
      error,
      status: false,
    });
  }
};
const getUserInfosByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.json({
        message: "User not found",
        status: "notFound",
      });
    }

    // Find the userPerso using the user_id obtained from the user record
    const userPerso = await UserPerso.findOne({
      where: { user_id: user.id },
      include: [
        { model: SocialMedia },
        { model: Button },
        { model: Header },
        { model: Texts },
        { model: Body },
        { model: Footer },
      ],
    });

    if (!userPerso) {
      return res.json({
        message: "User Informations not found",
        status: "notFound",
      });
    }

    res.status(200).json({
      message: "User Informations found!",
      userPerso,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch UserPerso data",
      error,
      status: false,
    });
  }
};
const authenticateUserRoutes = async (req, res) => {
  const { userId } = req;
  const { username } = req.params;
  try {
    let user = await User.findOne({ where: userId });
    if (!user) {
      return res.json({ message: "User not found", status: false });
    }
    if (user.username === username) {
      return res.status(200).json({ message: "User found", status: true });
    } else {
      return res.status(200).json({ message: "Not the user", status: false });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const saveUserInfos = async (req, res) => {
  const { userId } = req;
  try {
    // Use upload.fields() for multiple file uploads
    upload.fields([{ name: "cvFile" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) {
          console.error("Error uploading files:", err);
          return res.status(500).json({ message: "Failed to upload files" });
        }

        // Extract user personal data and social media data from request body
        const {
          nom,
          prenom,
          fonction,
          phoneNumber,
          email,
          bio,
          socialMedia,
          headerData,
          footerData,
          bodyData,
          textsData,
          buttonData,
        } = req.body;

        const parsedSocialMedia = JSON.parse(socialMedia);
        console.log(parsedSocialMedia);
        // Create a new SocialMedia instance
        const newSocialMedia = await SocialMedia.create({
          facebook: parsedSocialMedia.facebook.username,
          instagram: parsedSocialMedia.instagram.username,
          twitter: parsedSocialMedia.twitter.username,
          whatsapp: parsedSocialMedia.whatsapp.username,
          spotify: parsedSocialMedia.spotify.username,
          pinterest: parsedSocialMedia.pinterest.username,
          youtube: parsedSocialMedia.youtube.username,
        });
        const newHeader = await Header.create(headerData);
        const newFooter = await Footer.create(footerData);
        const newBody = await Body.create(bodyData);
        const newTexts = await Texts.create(textsData);
        const newButton = await Button.create(buttonData);
        // Extract uploaded file details from req.files

        const cvFilename = req.files.cvFile
          ? req.files.cvFile[0].filename
          : null;
        const profileImageFilename = req.files.profileImage
          ? req.files.profileImage[0].filename
          : null;

        // Create a new UserPerso instance
        const newUserPerso = await UserPerso.create({
          nom,
          prenom,
          fonction,
          phoneNumber,
          email,
          bio,
          profileImage: profileImageFilename,
          cvFile: cvFilename,
          social_media_id: newSocialMedia.id,
          user_id: userId,
          header_id: newHeader.id,
          footer_id: newFooter.id,
          body_id: newBody.id,
          texts_id: newTexts.id,
          button_id: newButton.id,
        });

        // Respond with the newly created UserPerso
        res.status(201).json({
          userPerso: newUserPerso,
          message: "UserPerso created successfully",
          status: true,
        });
      }
    );
  } catch (error) {
    console.error("Error saving UserPerso:", error);
    res.status(500).json({ message: "Failed to save UserPerso" });
  }
};

module.exports = {
  getUserById,
  getUserInfosByUserId,
  saveUserInfos,
  authenticateUserRoutes,
  getUserInfosByUsername,
};
