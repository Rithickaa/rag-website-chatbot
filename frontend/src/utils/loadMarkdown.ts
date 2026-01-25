export default async function loadMarkdown(path: string): Promise<string> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load markdown: ${path}`);
  }

  return await response.text();
}
