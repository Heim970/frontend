import axios from "axios";

// 1. 폐기 테이블 전체 조회
export async function fetchDisposal() {
  const response = await axios.get(`http://localhost:8090/app/disposal/findAll`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchDisposal 예외발생");
  }

  // console.log(response.data);
  return response.data;
}

// 2. 폐기 처리
export async function fetchCheckDisposal() {
  const response = await axios.post(`http://localhost:8090/app/disposal/check-expired`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchCheckDisposal 예외발생");
  }

  // console.log(response.data);
  return response.data;
}

// 3. 폐기 테이블 날짜별로 조회
export async function fetchDisposalByDate(date) {
  const response = await axios.get(
  `http://localhost:8090/app/disposal/by-date?date=${date}`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchDisposalByDate 예외발생");
  }

  console.log(response.data);
  return response.data;
}


// 4. 폐기 테이블 날짜별로 조회
export async function fetchPendingDisposal() {
  const response = await axios.get(
  `http://localhost:8090/app/disposal/pending-disposal`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchDisposalByDate 예외발생");
  }

  console.log(response.data);
  return response.data;
}

// 2. 폐기 처리
export async function fetchManualDisposal(batchIdList) {
  const response = await axios.post(`http://localhost:8090/app/disposal/manual-dispose`,
    batchIdList
  );

  console.log("폐기 처리 :", response.data);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchCheckDisposal 예외발생");
  }

  // console.log(response.data);
  return response.data;
}