export function sitemMapXml(fs, sitemapPath, homepage, urlItems) {
  console.log(sitemapPath, fs);
  console.log(urlItems);

  const siteUrls = [];

  homepage = homepage.replace(/\/$/, "");

  for (const item of urlItems) {
    siteUrls.push(`<url>
    <loc>${homepage}${item}</loc>
    <lastmod>${new Date()}</lastmod>
  </url>`);
  }

  const siteContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${siteUrls.join("\n")}
  </urlset>`;

  // 파일에 내용 쓰기
  fs.writeFile(sitemapPath, siteContent, function (err) {
    if (err === null) {
      console.log("success");
    } else {
      console.log("fail");
    }
  });
}
