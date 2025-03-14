import { useLocation } from "react-router-dom";

import Container from "../components/Container";
import CTAButton from "../components/CTAButton";

export default function PageNotFound() {
  const { pathname } = useLocation();

  return (
    <Container>
      <div className="px-horizontal py-20">
        <h1 className="mb-4 text-4xl font-bold">404 - Trang không tìm thấy</h1>

        <p className="mb-8 text-lg text-gray-600">
          Xin lỗi, {decodeURIComponent(pathname)} không tồn tại.
        </p>

        <CTAButton label="Quay lại trang chủ" href="/" />
      </div>
    </Container>
  );
}
