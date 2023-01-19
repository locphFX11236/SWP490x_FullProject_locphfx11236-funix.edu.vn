import { Modal } from 'antd';

const ModalComponent = ({ type, ...custom }) => Modal[type]({ ...custom });

export default ModalComponent;