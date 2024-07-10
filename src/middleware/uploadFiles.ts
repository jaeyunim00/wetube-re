import multer from "multer";

// avatar_upload
export const avatarUpload = multer({
  dest: 'uploads/avatars/', limits: {
  fileSize: 3000000,
  }
});

// video_upload
export const videoUpload = multer({
  dest: 'uploads/videos/', limits: {
  fileSize: 10000000,
}})