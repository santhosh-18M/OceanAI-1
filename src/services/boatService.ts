export async function getLiveVessels() {
    return [
        {
            id: "b1",
            name: "Fishing Boat 1",
            fisherName: "Captain Ravi",
            lat: 8.72,
            lng: 78.12,
            distanceFromBorderKm: 12,
            battery: 80,
            signal: 70,
            catchKg: 150,
        },
        {
            id: "b2",
            name: "Fishing Boat 2",
            fisherName: "Captain Kumar",
            lat: 8.50,
            lng: 78.30,
            distanceFromBorderKm: 4,
            battery: 45,
            signal: 55,
            catchKg: 90,
        },
    ];
}