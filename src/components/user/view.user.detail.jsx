import { Drawer } from "antd"

const ViewUserDetail = (props) => {

    const { isOpenViewDetail,
        setIsOpenViewDetail,
        dataDetail,
        setDataDetail } = props;

    return (
        <Drawer title="Chi tiết người dùng"
            width={"35vw"}
            onClose={() => {
                setIsOpenViewDetail(false)
                setDataDetail(null)
            }}
            open={isOpenViewDetail}>
            {dataDetail ?
                <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar:</p>
                    <br />
                    <div >
                        <img width={200}
                            height={200}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>

                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload Avatar</label>
                        <input type="file" hidden id="btnUpload" />
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

export default ViewUserDetail;