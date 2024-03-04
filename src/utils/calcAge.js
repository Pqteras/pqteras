export default () => {
    const dateBorn = new Date('2004-03-14');
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - dateBorn;
    const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Convert milliseconds to years
    return Math.floor(differenceInYears);
}