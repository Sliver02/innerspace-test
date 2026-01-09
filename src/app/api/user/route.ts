import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "user.json");
    const fileContent = await readFile(filePath, "utf-8");
    const userData = JSON.parse(fileContent);

    return Response.json(userData, {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error }, {
      status: 404,
    });
  }
}
