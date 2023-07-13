import "./index.scss"

function dung_React_scrollbar(children) {
    let a = document.createElement("div")
    a.classList.add("react_scrollbar")
    let b = document.createElement("div")
    b.classList.add("react_scrollbar_item")
    a.appendChild(b)
    children.appendChild(a)
    let ref;

    function handleparentelementscroll(e) {
        let a = ((e.target.scrollTop + e.target.clientHeight) / e.target.scrollHeight * 100) - ref
        b.style.top = `${a > 0 ? a : 0}%`
    }

    function handlescrollclick(e) {
        if (e.target.className === "react_scrollbar") {
            let a = (((e.offsetY - (e.target.children[0].offsetHeight / 2)) / e.target.offsetHeight * e.target.parentElement.children[0].scrollHeight))
            e.target.parentElement.children[0].scrollTo({
                top: a,
                behavior: "smooth"
            })
        }
    }

    function handlescrollitemclick(e) {
        let max = e.screenY + e.target.parentElement.offsetHeight - (e.layerY + e.target.offsetTop)
        let min = max - e.target.parentElement.offsetHeight
        function handlescrollmove(even) {
            if (even.screenY < max && even.screenY > min) {
                let a = e.target.parentElement.parentElement.children[0].scrollHeight / 100 * (((even.screenY - min) - e.layerY) / (max - min) * 100)
                e.target.parentElement.parentElement.children[0].scrollTo({
                    top: a,
                })
            } else if (even.screenY > max) {
                let b = e.target.parentElement.parentElement.children[0].offsetHeight
                e.target.parentElement.parentElement.scrollTo({
                    top: b,
                })
            } else if (even.screenY < min) {
                e.target.parentElement.parentElement.scrollTo({
                    top: 0,
                })
            }
        }
        function handleremovescrollmove() {
            window.removeEventListener("mousemove", handlescrollmove)
            window.removeEventListener("mouseup", handleremovescrollmove)
        }
        window.addEventListener("mousemove", handlescrollmove)
        window.addEventListener("mouseup", handleremovescrollmove)
    }

    const ru = new MutationObserver((mutationList, observer) => {
        ref = children.children[0].offsetHeight / children.children[0].scrollHeight * 100
        b.style.height = `${ref > 0 ? ref < 100 ? ref : 100 : 0}%`
    });

    const ro = new ResizeObserver((e) => {
        if (e[0].target.offsetParent) {
            ref = e[0].target.offsetParent.children[1].clientHeight / e[0].target.offsetParent.children[0].scrollHeight * 100
            b.style.height = `${ref > 0 ? ref < 100 ? ref : 100 : 0}%`
            e[0].target.offsetParent.children[0].addEventListener("scroll", handleparentelementscroll)
            a.addEventListener("mousedown", handlescrollclick)
            b.addEventListener("mousedown", handlescrollitemclick)
        }
    })
    ro.observe(a)
    ru.observe(children.children[0], { attributes: true, childList: true, subtree: true })
}

export default dung_React_scrollbar