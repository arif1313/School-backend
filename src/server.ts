import app from "./app";
import confiq from "./app/confiq";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(confiq.db_url as string);
    console.log("MongoDB connected successfully");


    app.listen(confiq.port, () => {
      console.log(`Server running on port ${confiq.port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

main();
