import { TitleTableBtn } from "../button";

const TitleTable = (key, PlusData) => (
    <TitleTableBtn
        className="w-100"
        onClick={ () => PlusData(key) }
    >
        Thêm mới
    </TitleTableBtn>
)

export default TitleTable;