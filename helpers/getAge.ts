export const getAge = (birthdate: string) => {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    const diff = currentDate.getTime() - birthDateObj.getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const weeks = Math.floor(diff % (1000 * 60 * 60 * 24 * 365.25) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diff % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24));

    return { years, weeks, days };
};