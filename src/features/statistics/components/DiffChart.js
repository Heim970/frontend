import { ResponsiveLine } from "@nivo/line";

export default function DiffChart({ data }) {
  console.log("proped data: ", { data });

  // 데이터 변환
  const transformData = ({ data }) => {
    // data가 배열인지 체크
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data format in DiffChart:", data);
      return { id: "salesData", color: "hsl(308, 70%, 50%)", data: [] };
    }

    return {
      id: "salesData",
      color: "hsl(308, 70%, 50%)",
      data: data.map((item) => ({
        x: item.salesHour.toString(),
        y: item.dailyPrice ?? 0,
      })),
    };
  };

  const transformedData = transformData({ data });
  console.log("TransformedDATA:", transformedData);

  return (
    <div>
      <div style={{ height: 400 }}>
        chart
        <ResponsiveLine
          data={[transformedData]} // 데이터 배열을 전달
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >.0f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Sales Hour",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Daily Price",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
