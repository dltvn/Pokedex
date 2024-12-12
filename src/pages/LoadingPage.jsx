export default function LoadingPage() {
    return(
        <div className="h-screen flex items-center justify-center bg-poke_gray">
            <img className="animate-spin h-full object-contain" src={"/images/ball-close.png"} alt="pokeball_loading" width={100}
                    />
        </div>
    )
}