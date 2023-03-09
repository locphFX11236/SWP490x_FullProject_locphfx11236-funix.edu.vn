import { message, Upload } from "antd";
import { CameraTwoTone } from '@ant-design/icons';
import { useDispatch } from "react-redux";

import { ChangeAvatar, SelectAuthState } from "../../../core/slice/authData";
import Handle from "../../helper/handleUrlImg";

export const checkFile = (file) => {
    const isMatchType = (file.type === 'image/jpeg' || file.type === 'image/png');
    const isMatchSize = (file.size / 1024 / 1024) < 2; // Size < 2MB, file.size is byte
    return ( isMatchType && isMatchSize );
};

export const getBase64Encoder = (img, callback) => { // Encoder image vs Base64 -> backend has to decoder
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result) ); // Lấy kết quả file sau encoder
    reader.readAsDataURL(img);
};

export const DraggerImg = () => (
    <Upload.Dragger
        maxCount={1}
        listType="picture"
        beforeUpload={() => false}
        itemRender={(node, file) => checkFile(file) ? node : false}
    >
        <p className="ant-upload-text">Click or drag image file to this area to upload</p>
    </Upload.Dragger>
);

export const Avatar = () => {
    const { user_id, data } = SelectAuthState();
    const imgAvatar = data.find(d => d._id === user_id).imgAvatar;
    const dispatch = useDispatch();
    const handleChange = (info) => {
        if (checkFile(info.file)) {
            getBase64Encoder(
                info.file,
                (url) => dispatch( ChangeAvatar({ user_id: user_id, imgAvatar:[url] }))
            );
            
        } else {
            message.error('File không phù hợp!');
        };
    }
    return (
        <div className="col col-md-4 position-relative p-0">
            <img className="w-100" src={Handle(imgAvatar)} alt="avatar" />
            <Upload
                name="avatar"
                type='select'
                className="avatar-uploader position-absolute bottom-0 end-0"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}
            >
                <CameraTwoTone style={{ fontSize: '35px' }} />
            </Upload>
        </div>
    );
};