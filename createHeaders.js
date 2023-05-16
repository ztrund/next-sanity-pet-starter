const fs = require('fs');
const path = require('path');

const headers = `
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  Content-Security-Policy: default-src 'self'; img-src 'self' https://i.ytimg.com https://*.sanity.io data:; media-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-src 'self' https://www.youtube-nocookie.com/
`;

const outputPath = path.join(__dirname, 'out');
fs.mkdirSync(outputPath, { recursive: true });

const headersPath = path.join(outputPath, '_headers');
fs.writeFile(headersPath, headers, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
