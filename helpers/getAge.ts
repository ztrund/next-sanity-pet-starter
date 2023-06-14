export const getAge = (birthdate: string) => {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    const diff = currentDate.getTime() - birthDateObj.getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const weeks = Math.floor(diff % (1000 * 60 * 60 * 24 * 365.25) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diff % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24));

    let ageString = "";

    if (years > 0) {
        ageString += `${years} ${years === 1 ? 'year' : 'years'}, `;
    }
    ageString += `${weeks} ${weeks === 1 ? 'week' : 'weeks'} and `;
    ageString += `${days} ${days === 1 ? 'day' : 'days'} old`;

    return ageString;
};