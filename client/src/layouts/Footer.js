import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      bgColor="light"
      className="bg-white text-center text-lg-start text-muted"
    >
      <section className="p-5">
        <MDBContainer className="text-center text-md-start mt-5">
          <div className="grid grid-cols-4 place-items-center mb-3">
            <div></div>
            <div>
              <h6 className="text-uppercase fw-bold mb-4 text-left text-lg">
                DỊCH VỤ
              </h6>
              <div className="text-sm text-left ">
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Điều khoản sử dụng
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Chính sách bảo mật thông tin cá nhân
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Chính sách bảo mật thanh toán
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Hệ thống trung tâm - nhà sách
                  </a>
                </p>
              </div>
            </div>

            <div className="mx-auto">
              <h6 className="text-uppercase fw-bold mb-4 text-lg text-left">
                HỖ TRỢ
              </h6>
              <div className="text-sm text-left">
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Chính sách đổi - trả - hoàn tiền
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Chính sách bảo hành - bồi hoàn
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Chính sách vận chuyển
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    Phương thức thanh toán và xuất HĐ
                  </a>
                </p>
              </div>
            </div>

            <div className="mx-auto">
              <h6 className="text-uppercase fw-bold mb-4 text-left text-lg">
                TÀI KHOẢN CỦA TÔI
              </h6>
              <div className="text-sm text-left">
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    <MDBIcon color="secondary" className="me-2" />
                    Đăng nhập/Tạo mới tài khoản
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    <MDBIcon color="secondary" className="me-2" />
                    Thay đổi địa chỉ khách hàng
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    <MDBIcon color="secondary" className="me-2" />
                    Chi tiết tài khoản
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-slate-700">
                    <MDBIcon color="secondary" className="me-2" />
                    Lịch sử mua hàng
                  </a>
                </p>
              </div>
            </div>
          </div>
        </MDBContainer>
        <div className="flex item-center justify-center gap-10">
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="github" />
          </a>
        </div>
      </section>
    </MDBFooter>
  );
}
