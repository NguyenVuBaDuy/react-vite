import { useEffect, useState } from "react"
import BookForm from "../components/book/book.form"
import BookTable from "../components/book/book.table"
import { fetchAllBookAPI } from "../services/api.service"


const BookPage = () => {

    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(10)

    useEffect(() => {
        loadBook();
    }, [current, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <div style={{ padding: "20px" }}>
                <BookForm />
                <BookTable
                    dataBooks={dataBooks}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize} />
            </div>
        </>

    )
}

export default BookPage