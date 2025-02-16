import app from "./index";

// Database
import "./db"
import "./models/Video";
import "./models/User";

const port = 3000;

const handleListening = () => {
  console.log(`🆗 open at http://localhost:${port}`);
}

app.listen(port, handleListening);