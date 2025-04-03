import axios from "axios";

// 전체 상품 목록 - 페이지네이션
export async function fetchGetPagedGoods({
  page = 0,
  size = 12,
  category = undefined,
  minPrice = undefined,
  maxPrice = undefined,
  search = undefined,
  sortBy,
}) {
  // 기본 URL
  let url = `http://localhost:8090/app/shop/getGoods?page=${page}&size=${size}`;

  // category와 search 값이 있을 경우, URL에 쿼리 파라미터로 추가
  if (category) {
    url += `&category=${category}`;
  }
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  // 최대-최소값 필터링
  if (minPrice !== undefined) {
    url += `&minPrice=${minPrice}`;
  }
  if (maxPrice !== undefined) {
    url += `&maxPrice=${maxPrice}`;
  }
  // 정렬 파라미터 추가
  if (sortBy) {
    url += `&sort=${sortBy}`;
  }

  // GET 요청 보내기
  const response = await axios.get(url);

  // 예외 처리
  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchGetPagedGoods 예외발생");
  }

  return response.data;
}

// 재고가 있는 상품 목록
export async function fetchGetAllInStockGoods() {
  const response = await axios.get(
    `http://localhost:8090/app/shop/findAllInStockGoods`
  );

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchGetDiscountedGoods 예외발생");
  }

  return response.data;
}

// 재고가 있으면서 할인 중인 상품 목록
export async function fetchGetDiscountedGoods() {
  const response = await axios.get(
    `http://localhost:8090/app/shop/isDiscountedList`
  );

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchGetDiscountedGoods 예외발생");
  }

  return response.data;
}

// 인기 상품 목록
export async function fetchGetTop10Items() {
  const response = await axios.get(`http://localhost:8090/app/shop/top10`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchGetDiscountedGoods 예외발생");
  }

  return response.data;
}

// goods_id로 sub_name 가져오기
export async function fetchSubName(goodsId) {
  const response = await 
  axios.get(`http://localhost:8090/app/goods/subName?goodsId=${goodsId}`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchSubName 예외발생");
  }

  return response.data;
}

// 연관상품 가져오기
export async function fetchRecommendations(subName) {
  const response = await 
  axios.get(`http://localhost:8090/app/goods/recommendations?subName=${subName}`);

  if (response.status !== 200) {
    console.log("예외발생");
    throw new Error("fetchRecommendations 예외발생");
  }

  return response.data;
}
