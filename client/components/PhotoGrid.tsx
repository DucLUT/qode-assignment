import { Row, Col, Empty } from "antd";
import { Photo } from "@/types";
import PhotoCard from "./PhotoCard";

interface Props {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: Props) {
  if (photos.length === 0) {
    return <Empty />;
  }

  return (
    <Row gutter={[24, 24]}>
      {photos.map((photo) => (
        <Col key={photo.id} xs={24} sm={12} lg={8}>
          <PhotoCard photo={photo} />
        </Col>
      ))}
    </Row>
  );
}
