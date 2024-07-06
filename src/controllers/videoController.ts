import { Request, Response, NextFunction } from "express";
import Video, { IVideo, formatHashtags } from "../models/Video";

// home
export const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const videos: IVideo[] = await Video.find({}).sort({createdAt: "desc"});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    next(error); // 에러 핸들러로 에러 전달
  }
};

// watch
export const watch = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.render("watch", { pageTitle: video.title, video });
  } catch (error) {
    next(error); // 에러 핸들러로 에러 전달
  }
};

// upload
export const getUpload = (req: Request, res: Response) => {
  res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title,
      description,
      hashtags: formatHashtags(hashtags),
    });
    res.redirect("/");
  } catch (error) {
    next(error); // 에러 핸들러로 에러 전달
  }
};

// edit
export const getEdit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
  } catch (error) {
    next(error);
  }
};

export const postEdit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  try {
    const video = await Video.exists({ _id: id });

    if (!video) {
      return res.status(404).send("Video not found");
    }

    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: formatHashtags(hashtags),
    });



    return res.redirect(`/videos/${id}`);
  } catch (error) {
    next(error);
  }
};

// delete
export const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await Video.findByIdAndDelete(id);
    return res.redirect(`/`);
  } catch (error) {
    next(error);
  }
};

// search
export const search = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query as { keyword?: string };
  let videos: any[] = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    })
  }
  
  return res.render("search", { pageTitle: "Search", videos });
};