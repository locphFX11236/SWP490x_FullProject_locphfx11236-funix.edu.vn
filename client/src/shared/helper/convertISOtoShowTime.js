import moment from "moment";

const FormatTime = (ISOString) => moment(ISOString).format("HH:mm DD/MM/YYYY");

export default FormatTime;
