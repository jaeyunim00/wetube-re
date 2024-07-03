import { Request, Response } from "express"; 

interface Video {
  id: number;
  title: string;
  rating: number;
  comments: number;
  createdAt: string;
  views: number;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Learn JavaScript in 30 Minutes",
    rating: 4.5,
    comments: 25,  // 댓글 수
    createdAt: new Date().toISOString(),
    views: 1500
  },
  {
    id: 2,
    title: "Introduction to Node.js",
    rating: 4.8,
    comments: 34,  // 댓글 수
    createdAt: new Date().toISOString(),
    views: 2300
  },
  {
    id: 3,
    title: "Mastering TypeScript",
    rating: 4.7,
    comments: 18,  // 댓글 수
    createdAt: new Date().toISOString(),
    views: 1800
  },
  {
    id: 4,
    title: "Building a YouTube Clone with React",
    rating: 4.9,
    comments: 42,  // 댓글 수
    createdAt: new Date().toISOString(),
    views: 3000
  }
];

export const trending = (req: Request, res: Response) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req: Request, res: Response) => {
  const { id } = req.params;
  const videoId = parseInt(id);

  const video = videos[videoId - 1]
  return res.render("watch", { pageTitle: `${video.title}` })
};

// edit
export const getEdit = (req: Request, res: Response) => {
  res.render("edit");
};

export const postEdit = (req: Request, res: Response) => {
  res.render("edit");
};
