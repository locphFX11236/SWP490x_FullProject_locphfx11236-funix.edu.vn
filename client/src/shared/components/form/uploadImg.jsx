import { useState } from "react";
import { Upload } from "antd";
import { CameraTwoTone } from '@ant-design/icons';

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
    const [imageUrl, setImageUrl] = useState('asset/img/avartar.jpg');
    const handleChange = (info) => getBase64Encoder(
        info.file,
        (url) => setImageUrl(url)
    );

    return (
        <>
            <img className="w-100" src={imageUrl} alt="avatar" />
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
        </>
    );
};