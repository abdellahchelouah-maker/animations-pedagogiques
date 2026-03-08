const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'pages', 'auto');
const shareHtml = `
<div class="share-bar">
  <span class="share-label">Partager :</span>
  <a class="share-btn facebook" data-network="facebook" title="Partager sur Facebook" aria-label="Partager sur Facebook">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H16l-.4 3h-2.1v7A10 10 0 0 0 22 12z"/></svg>
  </a>
  <a class="share-btn x" data-network="twitter" title="Partager sur X" aria-label="Partager sur X">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.14 12.14 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.33 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.57 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.7 8.7 0 0 0 22.46 6z"/></svg>
  </a>
  <a class="share-btn linkedin" data-network="linkedin" title="Partager sur LinkedIn" aria-label="Partager sur LinkedIn">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM7.5 8h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7.6c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4V24h-5z"/></svg>
  </a>
  <a class="share-btn whatsapp" data-network="whatsapp" title="Partager sur WhatsApp" aria-label="Partager sur WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.3c-.2.6-1.2 1.1-1.7 1.2-.5.1-1.1.2-3.6-.8-3-1.2-4.9-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3.1 0-1.4.7-2.1 1-2.4.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.6.6-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.6 1.6 3 1.8.4.2.6.2.8-.1.2-.2 1-1.2 1.2-1.6.2-.4.5-.3.8-.2.3.1 2 .9 2.4 1 .4.2.6.3.7.4.1.1.1.6-.1 1.2z"/></svg>
  </a>
  <a class="share-btn email" data-network="email" title="Partager par email" aria-label="Partager par email">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 4h20v16H2zM12 13 2 6h20z"/></svg>
  </a>
</div>
`;

function processFile(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  if (text.indexOf('class="share-bar"') !== -1) {
    console.log('Skip (already has share-bar):', path.basename(filePath));
    // still ensure script tag
  } else {
    const marker = '<div class="card-media">';
    const idx = text.indexOf(marker);
    if (idx === -1) {
      console.log('No card-media in:', path.basename(filePath));
    } else {
      const after = text.indexOf('</div>', idx);
      if (after === -1) {
        console.log('Cannot find closing div after card-media in:', path.basename(filePath));
      } else {
        const insertPos = after + '</div>'.length;
        text = text.slice(0, insertPos) + '\n\n' + shareHtml + '\n' + text.slice(insertPos);
        fs.writeFileSync(filePath, text, 'utf8');
        console.log('Inserted share-bar into:', path.basename(filePath));
      }
    }
  }

  // ensure script tag is present before </body>
  let updated = fs.readFileSync(filePath, 'utf8');
  const scriptTag = '<script src="../../js/script.js"></script>';
  if (updated.indexOf(scriptTag) === -1) {
    const bodyClose = updated.lastIndexOf('</body>');
    if (bodyClose !== -1) {
      updated = updated.slice(0, bodyClose) + '\n' + scriptTag + '\n' + updated.slice(bodyClose);
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log('Added script include to:', path.basename(filePath));
    }
  }
}

fs.readdirSync(dir).forEach(function(f) {
  if (!f.endsWith('.html')) return;
  processFile(path.join(dir, f));
});

console.log('Done');
