import { message, Upload } from "antd";
import { CameraTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { SelectAuthState } from "../../../core/slice/authData";
import { UploadImg } from "../../../core/thunkAction";
import { EXTEND_URL } from "../../helper/publicPath";

export const checkFile = (file) => {
    const isMatchType = file.type === "image/jpeg" || file.type === "image/png";
    const isMatchSize = file.size / 1024 / 1024 < 2; // Size < 2MB, file.size is byte
    return isMatchType && isMatchSize;
};

export const DraggerImg = () => (
    <Upload.Dragger
        maxCount={1}
        listType="picture"
        beforeUpload={() => false}
        itemRender={(node, file) => (checkFile(file) ? node : false)}
    >
        <p className="ant-upload-text">
            Click or drag image file to this area to upload
        </p>
    </Upload.Dragger>
);

export const Avatar = () => {
    const { user_id, data } = SelectAuthState();
    const index = data.findIndex((d) => d._id === user_id);
    const user = data[index];
    const imgAvatar = user.imgAvatar;
    const isOutFile = user.imgAvatar.includes("http");
    const dispatch = useDispatch();
    const handleChange = (info) => {
        if (checkFile(info.file)) {
            dispatch(
                UploadImg({
                    keyForm: "User",
                    data: {
                        index: index,
                        oldVal: user,
                        imgFiles: [info.file],
                    },
                })
            );
        } else {
            message.error("File không phù hợp!");
        }
    };

    return (
        <div className="col col-md-4 position-relative p-0">
            <img
                className="w-100"
                src={isOutFile ? imgAvatar : EXTEND_URL + imgAvatar}
                alt="avatar"
            />
            <Upload
                name="avatar"
                type="select"
                className="avatar-uploader position-absolute bottom-0 end-0"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}
            >
                <CameraTwoTone style={{ fontSize: "35px" }} />
            </Upload>
        </div>
    );
};
