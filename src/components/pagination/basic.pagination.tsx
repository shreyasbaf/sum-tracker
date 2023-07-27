import { Button, Space } from "antd";
import { FC } from "react";
import { PaginationUIInterface, UrlType } from "../../interface/common";

const Pagination: FC<PaginationUIInterface> = ({
  next,
  prev,
  onNextClick,
  onPrevClick,
}) => {
  const handlePrev = () => {
    onPrevClick?.(prev);
  };

  const handleNext = () => {
    onNextClick?.(next);
  };

  return (
    <Space style={{ display: "flex", justifyContent: "end" }} align={"end"}>
      <Button onClick={handlePrev} disabled={!prev}>
        Prev
      </Button>
      <Button onClick={handleNext} disabled={!next}>
        Next
      </Button>
    </Space>
  );
};

export default Pagination;
