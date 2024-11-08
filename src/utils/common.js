// img download
export function imgDownload(img, fileName) {
  const link = document.createElement("a");
  link.href = img.src;
  link.download = fileName; // 다운로드할 파일 이름
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// copy text
export function copyText(text) {
  navigator.clipboard.writeText(text);
}

export function toCamelCase(str) {
  return str
    .split("\n")
    .map((line) => {
      return line
        .trim()
        .toLowerCase() // 소문자로 변환
        .split(/[\s-_]+/) // 공백, 하이픈, 언더스코어로 문자열 분할
        .map((word, index) => {
          // 첫 번째 단어는 소문자로, 나머지는 대문자로 처리
          if (index === 0) {
            return word.toLowerCase(); // 첫 번째 단어는 소문자
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // 나머지 단어는 대문자 처리
        })
        .join(""); // 모든 단어를 연결
    })
    .join("\n");
}

export function toPascalCase(str) {
  return str
    .split("\n")
    .map((line) => {
      return line
        .toLowerCase() // 소문자로 변환
        .split(/\s+/) // 공백을 기준으로 단어 분리
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(), // 각 단어의 첫 글자를 대문자로
        )
        .join(""); // 모든 단어를 연결
    })
    .join("\n");
}

export function toCapitalizedCase(str) {
  return str
    .split("\n")
    .map((line) => {
      return line
        .toLowerCase() // 소문자로 변환
        .split(/\s+/gm) // 공백을 기준으로 문자열 분할
        .map((word) => {
          // 각 단어의 첫 글자를 대문자로, 나머지는 소문자로 변환
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" "); // 모든 단어를 연결
    })
    .join("\n");
}

export function toSentenceCase(str) {
  if (!str) return str; // 빈 문자열 처리

  // 문자열을 구분자로 나누고 각 문장의 첫 글자를 대문자로 변환
  const sentences = str.split(/([.!?])/).map((part, index) => {
    // 구분자가 아닌 경우
    if (index % 2 === 0) {
      // 첫 번째 공백이 아닌 글자를 대문자로 변환
      return part.toLowerCase().replace(/(\s*)(\w)/, (match, whitespace, char) => {
        return whitespace + char.toUpperCase();
      }); // 나머지는 소문자로 변환
    }
    // 구분자는 그대로 유지
    return part;
  });

  // 구분자와 문장을 결합하고 앞뒤 공백 제거
  return sentences.join("").trim();
}

export function toTitleCaseWithPunctuation(str) {
  if (!str) return str; // 빈 문자열 처리

  // 대문자로 변환하지 않을 단어 목록
  const smallWords = ["a", "an", "and", "are", "as", "at", "but", "by", "for", "if", "in", "nor", "of", "on", "or", "so", "the", "to", "up", "yet"];

  // 구분자로 문장을 나누고 각 문장에 대해 처리
  const sentences = str.split(/([.!?])/).map((part, index) => {
    // 구분자가 아닌 경우
    if (index % 2 === 0) {
      return part
        .split(" ")
        .map((word, wordIndex) => {
          // 첫 단어 또는 문장의 첫 단어는 대문자로 변환
          if (wordIndex === 0) {
            return word.replace(/(\s*)(\w)/, (match, whitespace, char) => {
              return whitespace + char.toUpperCase();
            });
          }
          // 짧은 단어는 소문자로 유지하고 나머지는 대문자로 변환
          return smallWords.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    }
    // 구분자는 그대로 유지
    return part;
  });

  // 구분자와 문장을 결합하고 앞뒤 공백 제거
  return sentences.join("").trim();
}

export function toSnackCase(str) {
  if (!str) return str; // 빈 문자열 처리

  return str
    .split("\n")
    .map((line) => {
      return line
        .trim()
        .toLowerCase() // 소문자로 변환
        .replace(/\s+/g, "_") // 공백을 언더스코어로 대체
        .replace(/[^\w_]/g, ""); // 알파벳, 숫자, 언더스코어가 아닌 문자는 제거
    })
    .join("\n");
}

export function getStringSize(str) {
  // 문자열이 비어 있을 경우 0 반환
  if (!str)
    return {
      byte: 0,
      length: 0,
    };

  // 각 문자의 UTF-8 바이트 크기를 계산하여 합산
  let byteSize = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    // 1바이트: U+0000 ~ U+007F
    if (charCode <= 0x7f) {
      byteSize += 1;
    }
    // 2바이트: U+0080 ~ U+07FF
    else if (charCode <= 0x7ff) {
      byteSize += 2;
    }
    // 3바이트: U+0800 ~ U+FFFF
    else if (charCode <= 0xffff) {
      byteSize += 3;
    }
    // 4바이트: U+10000 ~ U+10FFFF
    else if (charCode <= 0x10ffff) {
      byteSize += 4;
    }
  }
  return {
    byte: byteSize,
    length: str.length,
  };
}

export function isImageFile(fileName) {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|\.svg)$/i;
  return allowedExtensions.test(fileName);
}

export function isFileSizeValid(file, maxSizeInMB) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // MB to Bytes
  return file.size <= maxSizeInBytes;
}
