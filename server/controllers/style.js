const Button = require("../models/Button");
const Body = require("../models/Body");
const Texts = require("../models/Texts");
const Header = require("../models/Header");
const Footer = require("../models/Footer");
const multer = require("multer");

const getStyleToPopulate = async (req, res) => {
  try {
    const { buttonId, bodyId, textsId, headerId, footerId } = req.body;

    // Fetch style information by their respective IDs
    const [button, body, texts, header, footer] = await Promise.all([
      buttonId ? Button.findByPk(buttonId) : null,
      bodyId ? Body.findByPk(bodyId) : null,
      textsId ? Texts.findByPk(textsId) : null,
      headerId ? Header.findByPk(headerId) : null,
      footerId ? Footer.findByPk(footerId) : null,
    ]);

    // Return the fetched data
    return res.status(200).json({
      button,
      body,
      texts,
      header,
      footer,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching style information:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const updateButton = async (req, res) => {
  try {
    const { id, bgColor, textColor } = req.body;

    const button = await Button.findOne({ where: { id } });

    if (!button) {
      return res
        .status(404)
        .json({ message: "Button not found", status: false });
    }

    button.update({ bgColor, textColor });

    await button.save();

    return res
      .status(200)
      .json({ message: "Button updated successfully", button, status: true });
  } catch (error) {
    console.error("Error updating button:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const updateBody = async (req, res) => {
  try {
    const { id, value } = req.body;

    const body = await Body.findOne({ where: { id } });

    if (!body) {
      return res.status(404).json({ message: "Body not found", status: false });
    }
    body.update({ value });

    await body.save();

    return res
      .status(200)
      .json({ message: "Body updated successfully", body, status: true });
  } catch (error) {
    console.error("Error updating body:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const updateHeader = async (req, res) => {
  try {
    const { id, value } = req.body;

    const existingHeader = await Header.findByPk(id);

    if (!existingHeader) {
      return res
        .status(404)
        .json({ message: "Header not found", status: false });
    }

    existingHeader.value = value;

    await existingHeader.save();

    return res.status(200).json({
      message: "Header updated successfully",
      header: existingHeader.dataValues,
      status: true,
    });
  } catch (error) {
    console.error("Error updating header:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const updateFooter = async (req, res) => {
  try {
    const { id, value } = req.body;

    const existingFooter = await Footer.findByPk(id);

    if (!existingFooter) {
      return res
        .status(404)
        .json({ message: "Footer not found", status: false });
    }

    existingFooter.value = value;

    await existingFooter.save();

    return res.status(200).json({
      message: "Footer updated successfully",
      footer: existingFooter.dataValues,
      status: true,
    });
  } catch (error) {
    console.error("Error updating footer:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const updateTexts = async (req, res) => {
  try {
    const { id, bioColor, fonctionColor, nameColor } = req.body;

    const existingTexts = await Texts.findByPk(id);

    if (!existingTexts) {
      return res
        .status(404)
        .json({ message: "Texts not found", status: false });
    }

    existingTexts.bioColor = bioColor;
    existingTexts.fonctionColor = fonctionColor;
    existingTexts.nameColor = nameColor;

    await existingTexts.save();

    return res.status(200).json({
      message: "Texts updated successfully",
      texts: existingTexts.dataValues,
      status: true,
    });
  } catch (error) {
    console.error("Error updating texts:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
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

const uploadImage = async (req, res) => {
  upload.single("newFileName")(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading file", success: false });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", success: false });
    }

    const newFileName = req.file.filename;

    return res.status(200).json({
      message: "File uploaded successfully",
      filename: newFileName,
      success: true,
    });
  });
};
module.exports = {
  updateHeader,
  updateBody,
  updateFooter,
  updateTexts,
  updateButton,
  uploadImage,
  getStyleToPopulate,
};
