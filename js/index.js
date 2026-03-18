





const rideListElement = document.querySelector("#rideList")


const allRides = getAllRides()

allRides.sort((a,b)=> b[0] - a[0])

allRides.forEach(async ([id, value]) => {


    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-3 align-items-center shadow" +
        " gap-4 "

    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", ()=>{
        window.location.href = `./detail.html?id=${ride.id}`
        })


    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)


    const mapElement = document.createElement("div")
    const mapID = `map${ride.id}`
    mapElement.id = mapID 
    mapElement.style = "width:100px; height:100px"
    mapElement.classList.add("bg-secondary", "rounded-4")

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"


    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.principalSubdivisionCode}`
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} km/h`
    maxSpeedDiv.className = "h5"



    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`



    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getDate(ride)
    dateDiv.className = "text-secondary mt-2"

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:16,
        
    })
 
    const greatMap = L.map(mapID,{
        layers: [osmLayer],
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
    }).setView([firstPosition.latitude, firstPosition.longitude],16);

   
   
    osmLayer.addTo(greatMap)
    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(greatMap)
    
})



// function getDuration(ride){
//     function format(number, digits){
//     return String(number.toFixed(0)).padStart(2, '0')
// }

//     const interval = (ride.stopTime - ride.startTime) / 1000

//     const minutes = Math.trunc(interval / 60)
//     const seconds = interval % 60

//     return `${format(minutes, 2)}: ${format(seconds,2)}`

// }
