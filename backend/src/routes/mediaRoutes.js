import express from "express";
import multer from "multer";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-profile", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "profile" },
      (error, result) => {
        if (error) return res.status(400).json({ message: "Upload failed" });
        res.status(200).json({ url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/send/:userId/media", upload.single("media"), async (req, res) => {
  try {
    const fileType = req.body.type || "image";
    const folder = fileType === "video" ? "videos" : "images";

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: fileType === "video" ? "video" : "image", folder },
      (error, result) => {
        if (error) return res.status(400).json({ message: "Upload failed" });

        const message = {
          senderId: req.user.id,
          receiverId: req.params.userId,
          type: fileType,
          content: result.secure_url,
        };

        // Save to DB (pseudo):
        // await Message.create(message);

        // Emit using Socket.io
        req.io.to(req.params.userId).emit("newMessage", message);

        res.status(200).json(message);
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
