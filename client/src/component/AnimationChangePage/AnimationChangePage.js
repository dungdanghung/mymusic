import "./AnimationChangePage.scss"


function AnimationClosePage(x, y, callback, link) {
    const a = document.createElement("div")
    a.classList.add("animationchangepage")
    document.querySelector("body").appendChild(a)
    const b = document.querySelector(".animationchangepage")
    b.style.clipPath = `circle(0% at ${x}px ${y}px)`
    setTimeout(() => {
        b.style.clipPath = `circle(130% at ${x}px ${y}px)`
        setTimeout(() => {
            callback(link)
            document.querySelector(".animationchangepage").remove()
        }, 1000)
    }, 0)
}


export {
    AnimationClosePage,
}