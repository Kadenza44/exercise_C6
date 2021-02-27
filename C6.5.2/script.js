
const btn = document.getElementById('btn')

btn.addEventListener('click', ()=>{
    const wScreen = window.screen.width
    const hScreen = window.screen.height
    alert(`Ширина экрана ${wScreen} пикселей\nВысота экрана ${hScreen} пикселей`)
})