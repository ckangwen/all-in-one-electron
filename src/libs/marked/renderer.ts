/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
export function cleanUrl(href: string) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements: { [index: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const getEscapeReplacement = (ch: string) => escapeReplacements[ch];

export function escape(html: string, encode?: boolean) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else if (escapeTestNoEncode.test(html)) {
    return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
  }

  return html;
}

/**
 * Renderer
 */
export const renderer = {
  code(code: string, infostring: string | undefined, escaped: boolean): string {
    const lang = (infostring || "").match(/^\S*/)?.[0];

    code = `${code.replace(/\n$/, "")}\n`;

    if (!lang) {
      return `<pre class="revealing-pre"><code class="revealing-code">${
        escaped ? code : escape(code, true)
      }</code></pre>\n`;
    }

    return `<pre class="revealing-pre"><code class="revealing-code language-${escape(lang)}">${
      escaped ? code : escape(code, true)
    }</code></pre>\n`;
  },

  blockquote(quote: string): string {
    return `<blockquote class="revealing-blockquote">\n${quote}</blockquote>\n`;
  },

  html(html: string, _block?: boolean): string {
    return html;
  },

  heading(text: string, level: number, _raw: string): string {
    // ignore IDs
    return `<h${level} class="revealing-h${level}">${text}</h${level}>\n`;
  },

  hr(): string {
    return "<hr>\n";
  },

  list(body: string, ordered: boolean, start: number | ""): string {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ` start="${start}"` : "";
    return `<${type}${startatt} class="revealing-${type}">\n${body}</${type}>\n`;
  },

  listitem(text: string, _task: boolean, _checked: boolean): string {
    return `<li class="revealing-li">${text}</li>\n`;
  },

  checkbox(checked: boolean): string {
    return `<input class="revealing-checkbox" ${
      checked ? 'checked="" ' : ""
    }disabled="" type="checkbox">`;
  },

  paragraph(text: string): string {
    return `<p class="revealing-p">${text}</p>\n`;
  },

  table(header: string, body: string): string {
    if (body) body = `<tbody class="revealing-tbody">${body}</tbody>`;

    return (
      `<div class="revealing-table-container">` +
      `<table class="revealing-table">\n` +
      `<thead class="revealing-thead">\n${header}</thead>\n${body}</table>\n`
      + `</div>`
    );
  },

  tablerow(content: string): string {
    return `<tr class="revealing-tr">\n${content}</tr>\n`;
  },

  tablecell(
    content: string,
    flags: {
      header: boolean;
      align: "center" | "left" | "right" | null;
    },
  ): string {
    const type = flags.header ? "th" : "td";
    const tag = flags.align
      ? `<${type} class="revealing-${type}" align="${flags.align}">`
      : `<${type}>`;
    return `${tag + content}</${type}>\n`;
  },

  /**
   * span level renderer
   */
  strong(text: string): string {
    return `<strong class="revealing-strong">${text}</strong>`;
  },

  em(text: string): string {
    return `<em class="revealing-em">${text}</em>`;
  },

  codespan(text: string): string {
    return `<code class="revealing-code">${text}</code>`;
  },

  br(): string {
    return `<br class="revealing-br">`;
  },

  del(text: string): string {
    return `<del class="revealing-del">${text}</del>`;
  },

  link(href: string, title: string | null | undefined, text: string): string {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = `<a class="revealing-a" href="${href}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += `>${text}</a>`;
    return out;
  },

  image(href: string, title: string | null, text: string): string {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;

    let out = `<img class="revealing-img" src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  },

  text(text: string): string {
    return text;
  },
};
