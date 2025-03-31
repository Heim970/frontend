import { useState } from "react";
import { fetchUpdateComment } from "../api/HttpSalesAnalysisService";
import ReportDetailModal from "./ReportDetailModal";

export default function ReportTable({ salesData }) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [comment, setComment] = useState("");
  const [showProductDetails, setShowProductDetails] = useState(false);

  const trendMapping = {
    1: "요일 비교",
    7: "7일 평균",
    30: "30일 평균",
  };

  // 모달 열기
  const openModal = (alert) => {
    setSelectedAlert(alert);
    setComment(alert.userComment || ""); // 기존 코멘트 불러오기
    setShowProductDetails(false); // 상세 보기 초기화
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedAlert(null);
    setComment("");
    setShowProductDetails(false);
  };

  // 코멘트 업데이트 API 호출
  const handleUpdateComment = async () => {
    if (!selectedAlert) return;

    try {
      await fetchUpdateComment(selectedAlert.alertId, comment);

      // salesData에서 해당 alert의 userComment 업데이트
      selectedAlert.userComment = comment;

      closeModal();
    } catch (error) {
      console.error("코멘트 수정 실패:", error);
    }
  };

  // 상품 상세 조회 토글
  const toggleProductDetails = () => {
    setShowProductDetails(!showProductDetails);
  };

  // 퍼센트 값 포맷팅 함수
  const formatPercentage = (percentValue) => {
    // 입력값이 숫자인 경우 문자열로 변환
    const percentStr = String(percentValue);

    // 음수인 경우에만 부호 확인
    const isNegative = percentStr.charAt(0) === "-";

    // 음수면 부호 제거, 양수면 그대로 사용
    const numStr = isNegative ? percentStr.substring(1) : percentStr;

    // 숫자로 변환하고 포맷팅 (소수점 유지)
    const formatted = Number.parseFloat(numStr).toLocaleString("ko-KR", {
      minimumFractionDigits: numStr.includes(".")
        ? numStr.split(".")[1].length
        : 0,
      maximumFractionDigits: numStr.includes(".")
        ? numStr.split(".")[1].length
        : 0,
    });

    // 음수면 부호 다시 붙이기, 양수면 + 붙이기
    return isNegative ? "-" + formatted : "+" + formatted;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                트렌드 기준
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                날짜
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                시간
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                이전 매출
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                현재 매출
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                차이
              </th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((alert, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                onClick={() => openModal(alert)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                  {trendMapping[alert.trendBasis] || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                  {alert.alertDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                  {alert.alertHour}시
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {Number(alert.previousSales).toLocaleString()}원
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {Number(alert.currentSales).toLocaleString()}원
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  <span
                    className={
                      alert.difference > 0
                        ? "text-green-600"
                        : alert.difference < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }
                  >
                    {Number(alert.difference).toLocaleString()}원 (
                    {formatPercentage(alert.percentageDifference)}%)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모달 컴포넌트 */}
      {selectedAlert && (
        <ReportDetailModal
          selectedAlert={selectedAlert}
          comment={comment}
          setComment={setComment}
          showProductDetails={showProductDetails}
          toggleProductDetails={toggleProductDetails}
          closeModal={closeModal}
          handleUpdateComment={handleUpdateComment}
          trendMapping={trendMapping}
        />
      )}
    </>
  );
}
