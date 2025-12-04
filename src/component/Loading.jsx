import "./Loading.css"


function Loading() {
    return ( 
        <>
            {/* Blur the entire page */}
            <div className="blur-layer" />

            <div className="loading-screen">
                <div className="loading-logo">
                    <img src="img/logo.png" alt="house haunt logo" />
                </div>
            </div>
        </>
    );
}

export default Loading;