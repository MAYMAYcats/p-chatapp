export const getRoomId = (userId1: string): string => {
    //const sortedIds = ["Group", userId1].sort();
    const sortedIds = [userId1, "Group"].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}