import fs from 'fs';
import path from 'path';

// 프로젝트 경로를 계산
const dataDir = path.join(__dirname, 'data');

// 최종 병합 결과를 저장할 객체
const mergedData: { [key: string]: any } = {};

// 데이터 병합 함수
const mergeJsonFiles = () => {
  fs.readdirSync(dataDir).forEach((file) => {
    if (path.extname(file) === '.json' && file !== 'db.json') { // db.json 제외
      const filePath = path.join(dataDir, file);
      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const fileNameWithoutExt = path.basename(file, '.json');

      // 파일 이름을 키로 하여 데이터 병합
      mergedData[fileNameWithoutExt] = fileData;
    }
  });

  // 병합된 데이터를 항상 동일한 db.json 파일로 덮어쓰기
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(mergedData, null, 2));

  console.log('All JSON files have been merged into db.json');
};

// 병합 함수 실행
mergeJsonFiles();

console.log('All JSON files have been merged into db.json');
