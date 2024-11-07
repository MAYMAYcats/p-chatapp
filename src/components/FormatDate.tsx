
interface FirestoreTimestamp {
    seconds: number;
    nanoseconds: number;
}

const formatDate = (timestamp: FirestoreTimestamp): string => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const day: number = date.getDate();
    const monthNames: string[] = ["January", "February", "March", "April", "May", "June", 
                                  "July", "August", "September", "October", "November", "December"];
    const month: string = monthNames[date.getMonth()];
    const formattedDate: string = `${day} ${month}`;
    return formattedDate;
};


export default formatDate