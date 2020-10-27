export function injectTitle(html: string, htmlTitle: string) {
  if (/<\/title>/.test(html)) {
    return html.replace(/<\/title>/, `${htmlTitle}</title>`);
  }
  return html;
}
