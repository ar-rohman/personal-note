export const currentLocaleDateJSON = () => {
    const date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
};

export const formattedDate = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('id-ID', options);
};
