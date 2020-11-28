import cloudinary from "cloudinary";

//config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export const upload = async (req, res) => {
  const { image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
};

export const remove = async (req, res) => {
  const { public_id } = req.body;

  const image_id = public_id;
  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.send("Ok");
  });
};
