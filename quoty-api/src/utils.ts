// Functions

export async function getRandomLineFromFile(filePath: string): Promise<string> {
    try {
        const content = await Deno.readTextFile(filePath);
        const lines = content.split("\n").filter((line) => line.trim() !== "");
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        return randomLine;
    } catch (error:any) {
        console.error("Error reading file:", error.message);
        throw error;
    }
}

// Variables

export const SECURITY_HEADERS  = {
    "Content-Type": "text/plain",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'none'",
    "Cache-Control": "no-store, max-age=0",
};
export const filePath:string = Deno.env.get("SNIPPETS_FILE") || "./snippets.txt";
export const port: number = parseInt(Deno.env.get("PORT") || "8000", 10);
export const max_requests:number = parseInt(Deno.env.get("MAX_REQUESTS_PER_MINUTE") || "100", 10 );