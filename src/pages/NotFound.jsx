import notFound from "./../pages/images/not_found.jpg"

const NotFound = () => {
    return (
        <div>
            <div style={{position: "absolute", left: "50%", transform: "translate(-50%, 0)", marginTop: "3rem"}}>
                <h2 style={{ color: "white", textAlign: "center" }}>
                    Această pagină nu există!
                </h2>
            </div>
            <img style={{width: "100%", height: "calc(100vh - 60px)"}} src={notFound} alt=""/>
        </div>
    )
}

export default NotFound;