import { mdToHtml } from "@/libs/marked";

interface MarkdownProps {
  content: string;
}
export default function Markdown({ content }: MarkdownProps) {
  const html = mdToHtml(content);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></div>
  );
}
