import { sanitizeSvg, sanitizeText } from './sanitize-svg';

export const generateHtml = (body: string, title?: string, bg = '#fff') => {
  const safeBody = sanitizeSvg(body);
  const safeTitle = sanitizeText(`${title || ''}`);
  const safeBg = /^#[\da-fA-F]{3,8}$/.test(bg) ? bg : '#fff';

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${safeTitle}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body,html {
          width: 100%;
          height: 100%;
        }
        body {
          background-color: ${safeBg};
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
    </head>
    <body>
      ${safeBody}
    </body>
    </html>`
    .trim()
    .replace(/\n/g, '');
};
