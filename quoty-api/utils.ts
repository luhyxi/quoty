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