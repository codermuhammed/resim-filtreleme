let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blurr = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

window.onload = function() {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

function resetFiltres() {
    ctx.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blurr.value = '0';
    hueRotate.value = '0';
    ctx.filter = `
        saturate(100%);
        contrast(100%);
        brightness(100%);
        sepia(0%);
        grayscaled(0%);
        blur(0px);
        hue-rotate(0deg);
    `
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

upload.onchange = function() {
    resetFiltres();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
        img.src = file.result;
    }
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    }
}
let filtres = document.querySelectorAll("ul li input");
filtres.forEach(filter => {
    filter.addEventListener('input', function(){
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blurr.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})
download.onclick = function(){
    download.href = canvas.toDataURL();
}