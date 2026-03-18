

const speed = document.querySelector("#speed")
const start = document.querySelector("#start")
const stop  = document.querySelector("#stop")

let watchId = null
let currentRide = null
start.addEventListener("click", () =>{

if(watchId)
    return

    function handleSuccess(position){
        addPosition(currentRide, position)
        speed.innerText = position.coords.speed ? 
        (position.coords.speed * 3.6).toFixed(1) : 0
    }

    function handleError(error){
        console.log(error.message)
    }
    const options = {enableHighAccuracy: true}

    currentRide = createNewRide()
    watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options)
    start.classList.add("d-none")
    stop.classList.remove("d-none")
   

} )

stop.addEventListener("click", () =>{
    if(!watchId)
        return
    navigator.geolocation.clearWatch(watchId)
    watchId = null
    updateStopTime(currentRide)
    currentRide = null
    start.classList.remove("d-none")
    stop.classList.add("d-none")
    window.location.href = "./"
} )
