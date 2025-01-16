const { exec } = require("child_process");
const packageJson = require("./package.json");
// 실행시 github cli 가 설치 되어 있어야 실행 가능함.

const execCmd = `gh release create v${packageJson.version} ./dist/dist.zip --title "Release v${packageJson.version}" --target main --generate-notes`;

console.log("release cmd : ", execCmd);
// CMD 명령어를 실행하는 코드
exec(execCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
