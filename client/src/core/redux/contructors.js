const defaultProgram = {
    organization_id: "Test id",
    programName: "",
    descriptionStory: "",
    imgProgram: "",
    moneyTotal: 0,
    moneyCurrent: 0,
    moneyRate: 0,
    times: 0,
    startTime: "",
    endTime: "",
    management: [],
    donations: [],
};

const defaultUser = {
    email: "",
    history: [],
    imgAvatar: "",
    isAdmin: false,
    name: "",
    password: "",
    phoneNumber: "",
};

export const ProgramForm = ({ organization, name, ...rest }) => ({
    ...defaultProgram,
    organization_id: organization.key,
    programName: name,
    ...rest,
});

export const UserForm = (user) => ({
    ...defaultUser,
    ...user,
});
