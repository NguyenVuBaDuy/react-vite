import { Drawer } from "antd"

const ViewBookDetail = (props) => {

    const { dataBookDetail, isOpenBookDetail, formatVND, setIsOpenBookDetail } = props

    return (
        <Drawer title="Chi tiết book"
            width={"35vw"}
            onClose={() => { setIsOpenBookDetail(false) }}
            open={isOpenBookDetail}>
            {dataBookDetail ?
                <>
                    <p>Id: {dataBookDetail._id}</p>
                    <br />
                    <p>Tiêu đề: {dataBookDetail.mainText}</p>
                    <br />
                    <p>Tác giả: {dataBookDetail.author}</p>
                    <br />
                    <p>Thể loại: {dataBookDetail.category}</p>
                    <br />
                    <p>Giá tiền: {formatVND(dataBookDetail.price)}</p>
                    <br />
                    <p>Số lượng: {dataBookDetail.quantity}</p>
                    <br />
                    <p>Đã bán: {dataBookDetail.sold}</p>
                    <br />
                    <p>Thumbnail: </p>
                    <div style={{
                        marginTop: "10px",
                        height: "150px",
                        width: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                        }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`} />
                    </div>
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>

            }
        </Drawer>
    )
}

export default ViewBookDetail