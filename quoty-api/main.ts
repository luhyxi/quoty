import { getRandomLineFromFile } from "./utils.ts";

const filePath = "./snippets.txt";

async function handleRequest(req: Request): Promise<Response> {
  try {
    const randomLine = await getRandomLineFromFile(filePath);

    return new Response(randomLine, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error in handleRequest:", error);

    return new Response("Error fetching a random line.", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

const port = 8000;
console.log(`Server running at http://localhost:${port}`);
Deno.serve({ port }, handleRequest);