import { Drawer } from "antd"

const ViewUserDetail = (props) => {

    const { isOpenViewDetail,
        setIsOpenViewDetail,
        dataDetail,
        setDataDetail } = props;

    return (
        <Drawer title="Chi tiết người dùng"
            onClose={() => {
                setIsOpenViewDetail(false)
                setDataDetail(null)
            }}
            open={isOpenViewDetail}>
            {dataDetail ?
                <>
                    <p>Id: {dataDetail._id}</p>
                    <p>Full name: {dataDetail.fullName}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Phone number: {dataDetail.phone}</p>
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