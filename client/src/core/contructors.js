import moment from 'moment';

const defaultProgram = {
    organization_id: { $oid: 'Test id' },
    programName: '',
    descriptionStory: '',
    imgProgram: '',
    moneyTotal: 0,
    moneyCurrent: 0,
    moneyRate: 0,
    times: 0,
    startTime: '',
    endTime: '',
    management: [],
    donations: []
};

const defaultUser = {
    createdAt: '',
    email: '',
    history: [],
    imgAvatar: '',
    isAdmin: false,
    name: '',
    password: '',
    phoneNumber: '',
    updatedAt: '',
};

export const ProgramForm = ({
    organization,
    name,
    startTime,
    endTime,
    ...rest
}) => ({
    ...defaultProgram,
    organization_id: { $oid: organization.key },
    programName: name,
    startTime: moment(startTime, 'HH:mm DD/MM/YYYY').toISOString(),
    endTime: moment(endTime, 'HH:mm DD/MM/YYYY').toISOString(),
    ...rest
});

export const UserForm = (user) => ({
    ...defaultUser,
    ...user,
});