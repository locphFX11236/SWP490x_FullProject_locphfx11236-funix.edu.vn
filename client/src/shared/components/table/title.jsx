import { Button } from "antd";

const TitleTable = (key) => {
    const HandleClick = () => {
        if (key === 'programs') return console.log(key)
        else if (key === 'users') return console.log(key)
        else return console.log('Lỗi key! <TitleTable/>');
    }
    
    return (
        <Button
            type="primary"
            shape="round"
            onClick={() => HandleClick()}
        >
            Thêm mới
        </Button>
    )
}
export default TitleTable;