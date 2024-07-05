import mongoose, { Document, Schema } from "mongoose";

// static
export const formatHashtags = (hashtags: string) =>
  hashtags.split(",").map((word: string) => (word.startsWith("#") ? word : `#${word}`));

// 인터페이스 정의
export interface IVideo extends Document {
  title: string;
  description: string;
  createdAt: Date;
  hashtags: string[];
  meta: {
    views: number;
    rating: number;
  }
}

const videoScheme: Schema<IVideo> = new Schema({
  title: { type: String, required: true, uppercase: true, trim: true, maxlength: 50 },
  description: { type: String, required: true, trim: true, maxlength: 300 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
  }
});

const Video = mongoose.model<IVideo>("Video", videoScheme);

export default Video;