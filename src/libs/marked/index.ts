import { marked } from "marked";
import { renderer } from "./renderer";

function cleanMarkdown(markdown: string) {
  const regex = /\{\{\{row(.*?)\}\}\}/s;
  const matches = markdown.match(regex);
  return matches ? matches[1] : markdown;
}

marked.use({ renderer });

export function mdToHtml(markdown: string) {
  return marked(cleanMarkdown(markdown));
}
