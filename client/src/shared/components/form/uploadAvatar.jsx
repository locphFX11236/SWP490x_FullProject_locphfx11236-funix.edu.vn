import { CameraTwoTone } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const Avatar = () => {
  const [imageUrl, setImageUrl] = useState('asset/img/avartar.jpg');
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };
    return (
        <div className="position-relative">
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            <Upload
                name="avatar"
                listType="text"
                className="avatar-uploader position-absolute bottom-0 end-0"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                <CameraTwoTone style={{ fontSize: '35px' }} />
            </Upload>
        </div>
    );
};