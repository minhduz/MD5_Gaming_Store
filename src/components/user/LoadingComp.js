import React,{useEffect} from 'react'
import $ from 'jquery'

export default function LoadingComp() {
    useEffect(() => {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    }, [])
    
    return (
        <div id="preloder">
            <div className="loader" />
        </div>
    )
}
