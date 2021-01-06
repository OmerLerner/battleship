import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp,faVolumeMute} from '@fortawesome/free-solid-svg-icons'
function AudioButton() {
    const [muteToggle,setMuteToggle]= useState(true);
    const toggleMusic = () =>{
        const button= document.querySelector(".musicButton");
        const audio= document.querySelector("audio");
        console.log(audio);
        if (audio.paused) {
            audio.volume = 0.2;
            audio.play();
            setMuteToggle(false);      
        } 
        else {
            audio.pause();
            setMuteToggle(true);      

        }
    button.classList.add("fade");
    };
    return (
     <div className="audioButton">
       <audio src="https://docs.google.com/uc?export=download&id=19EeVeupWVUwPUyP7iK3OM14Iz1YBaJuf"></audio>
            {/* <source src="https://docs.google.com/uc?export=download&id=19EeVeupWVUwPUyP7iK3OM14Iz1YBaJuf"/> */}
       {/* </audio> */}
            <button className="musicButton" onClick={toggleMusic}>
                {!muteToggle ? (<FontAwesomeIcon icon={faVolumeUp} />) : <FontAwesomeIcon icon={faVolumeMute} />}
            </button>
     </div>
    );
}
export default AudioButton;