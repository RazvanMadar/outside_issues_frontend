import notFound from "./images/not_found.jpg"

const NotFound = () => {
    return (
        <div style={{paddingTop: "55px"}}>
            <div style={{position: "absolute", left: "50%", transform: "translate(-50%, 0)", marginTop: "3rem"}}>
                <h2 style={{ color: "white", textAlign: "center" }}>
                    Această pagină nu există!
                </h2>
            </div>
            <img style={{width: "100%", height: "calc(100vh - 55px)"}} src={notFound} alt=""/>
        </div>
    )
}

export default NotFound;