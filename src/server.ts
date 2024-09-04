import { env } from "./env";
import  app  from "@/app";

const PORT = env.PORT

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});