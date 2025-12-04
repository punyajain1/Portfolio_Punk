import fs from "fs";
import path from "path";
import ClientHome from "@/components/ClientHome";

export default function Home() {
  const photosDir = path.join(process.cwd(), "public/photos");
  let photos: string[] = [];

  try {
    if (fs.existsSync(photosDir)) {
      photos = fs.readdirSync(photosDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });
    }
  } catch (error) {
    console.error("Error reading photos directory:", error);
  }

  return <ClientHome photos={photos} />;
}
