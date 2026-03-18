
async function getLocationData(latitude, longitude) {

    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

    const response = await fetch(url)
    return await response.json()


}

function getMaxSpeed(positions) {

    let maxSpeed = 0
    positions.forEach(position => {
        if (position.speed != null && position.speed > maxSpeed)
            maxSpeed = position.speed
    })

    return (maxSpeed * 3.6).toFixed(1)
}

function getDistance(positions) {
    const earthRadiusKm = 6371
    let totalDistance = 0
    for (let i = 0; i < positions.length - 1; i++) {
        const initialPosition = {
            latitude: positions[i].latitude,
            longitude: positions[i].longitude
        }

        const lastPosition = {
            latitude: positions[i + 1].latitude,
            longitude: positions[i + 1].longitude
        }

        const deltaLatitude = toRad(lastPosition.latitude - initialPosition.latitude)
        const deltaLongitude = toRad(lastPosition.longitude - initialPosition.longitude)

        const chordLength = Math.sin(deltaLatitude / 2) *
            Math.sin(deltaLatitude / 2) +
            Math.sin(deltaLongitude / 2) *
            Math.sin(deltaLongitude / 2) *
            Math.cos(toRad(initialPosition.latitude)) *
            Math.cos(toRad(lastPosition.latitude))

        const centralAngle = 2 * Math.atan2(Math.sqrt(chordLength), Math.sqrt(1 - chordLength))

        const distance = earthRadiusKm * centralAngle

        totalDistance += distance

    }

    return totalDistance.toFixed(2)
}

function toRad(degree) {
    return degree * Math.PI / 180
}

function getDuration(ride) {
    const timer = ride.stopTime - ride.startTime;

    return new Date(timer).toISOString().substring(14, 19);
   
}

function getDate(ride) {

    const date = new Date(ride.startTime)

    const day = date.toLocaleString("en-US", { day: "numeric" })
    const month = date.toLocaleString("en-US", { month: "long" })
    const year = date.toLocaleString("en-US", { year: "numeric" })

    const hour = date.toLocaleString("en-US", { hour: "2-digit", hour12: false })
    const minute = date.toLocaleString("en-US", { minute: "2-digit" })

    return `${hour}:${minute} - ${month} ${day}, ${year}`

}
