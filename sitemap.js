export function sitemMapXml(fs, sitemapPath, homepage, urlItems) {
  console.log(sitemapPath, fs);
  console.log(urlItems);

  const siteUrls = [];

  homepage = homepage.replace(/\/$/, "");

  for (const item of urlItems) {
    siteUrls.push(`<url>
    <loc>${homepage}${item}</loc>
    <lastmod>${formatDateToISO8601(new Date())}</lastmod>
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

function formatDateToISO8601(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Timezone offset (zzz) 형식: +09:00과 같은 형식으로 변환
  const timezoneOffset = date.getTimezoneOffset();
  const sign = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = String(Math.abs(Math.floor(timezoneOffset / 60))).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");
  const timezone = `${sign}${offsetHours}:${offsetMinutes}`;

  // 최종 ISO 8601 형식
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
}
