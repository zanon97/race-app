

const params = new URLSearchParams(window.location.search)
const idFromDetailRide = params.get("id")
const rideOfDetail = getRideRecord(idFromDetailRide)

document.addEventListener("DOMContentLoaded", async()=>{
const firstPosition = rideOfDetail.data[0];
const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

const mapElement = document.createElement("div")
mapElement.style = "width:100px; height:100px"
mapElement.classList.add("bg-secondary", "rounded-4")

const dataElement = document.createElement("div")
dataElement.className = "flex-fill d-flex flex-column"

const cityDiv = document.createElement("div")
cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.principalSubdivisionCode}`
cityDiv.className = "text-primary mb-2"

const maxSpeedDiv = document.createElement("div")
maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(rideOfDetail.data)} km/h`
maxSpeedDiv.className = "h5"

const distanceDiv = document.createElement("div")
distanceDiv.innerText = `Distance: ${getDistance(rideOfDetail.data)} km`

const durationDiv = document.createElement("div")
durationDiv.innerText = `Duration: ${getDuration(rideOfDetail)}`

const dateDiv = document.createElement("div")
dateDiv.innerText = getDate(rideOfDetail)
dateDiv.className = "text-secondary mt-2"


dataElement.appendChild(cityDiv)
dataElement.appendChild(maxSpeedDiv)
dataElement.appendChild(distanceDiv)
dataElement.appendChild(durationDiv)
dataElement.appendChild(dateDiv)

document.querySelector("#detailData").appendChild(dataElement)

const deleteButton = document.querySelector("#deleteButton")
deleteButton.addEventListener("click",()=>{

        deleteRide(idFromDetailRide)
        window.location.href = `./`
}

)


const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,
    attribution:'Esse mapa foi gerado pelo fodástico Gabriel Zanon'
});
const sateliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom:18,
    attribution: 'Esse mapa foi gerado pelo fodástico Gabriel Zanon'
});

const greatMap = L.map("detailMap",{
    layers: [osmLayer],
    attributionControl: true
}).setView([firstPosition.latitude, firstPosition.longitude], 16);
greatMap.attributionControl.setPrefix(false)

const baseMaps = {
    "Mapa de Rua": osmLayer,
    "Visão de Satélite": sateliteLayer
};

L.control.layers(baseMaps).addTo(greatMap)

const track = rideOfDetail.data.map(position=>{
    return [position.latitude, position.longitude]
})




const polyline = L.polyline(track,{
    color: "#f00"
})


polyline.addTo(greatMap)
greatMap.fitBounds(polyline.getBounds())



})


