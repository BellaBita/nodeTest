import * as fs from "fs";

/**
 * Mock Data Cache via Map
 */
const cachedMockData = new Map();

/**
 * dirPath하위의 *.mock.json 파일을 읽어서 초기 mock data를 로딩한다.
 * @param {string | null} dirPath
 */
const loadMockObjects = (dirPath) => {
  if (!dirPath) {
    dirPath = "./fixtures/mock";
  }

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    //console.log(file.indexOf(".mock.json"), file.length - ".mock.json".length);
    if (file.indexOf(".mock.json") > 0) {
      const jsonFile = fs.readFileSync(`${dirPath}/${file}`, "utf8");
      const items = JSON.parse(jsonFile);
      items.forEach((item) => {
        cachedMockData.set(item.__id, item);
      });
    }
  });
};

/**
 * id에 해당되는 Mock Data를 조회한다.
 * @param {string} id
 * @returns Undefined Object
 */
export const getMockData = (id) => {
  if (cachedMockData.size < 1) {
    loadMockObjects();
  }
  return cachedMockData.get(id);
};

/**
 * type에 해당되는 MockObject를 조회한다.
 * @param {string} typeName
 * @returns Array of Object
 */
export const getMockDataByType = (typeName) => {
  if (cachedMockData.size < 1) {
    loadMockObjects();
  }
  let array = new Array();

  cachedMockData.forEach((item) => {
    if (item.__typeName == typeName) {
      array.push(item);
    }
  });

  return array;
};

/**
 *
 * @returns {Map} 모든 MockData
 */
export const getAllMockData = () => {
  if (cachedMockData.size < 1) {
    loadMockObjects();
  }
  return cachedMockData;
};
