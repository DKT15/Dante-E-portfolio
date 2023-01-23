let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
        const isOdd = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
    document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}  

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += " modal__overlay--visible" // new class has been added and is visible when loading. A space needs to be at the start as we are adding a class. The class was added in CSS.
    emailjs
    .sendForm(
        'service_jc3uxsf',
        'template_d98c8qh',
        event.target, // event passes in all the field adding on target then targets the Name, Email and Message fields.
        'fcZVbl_CsS9acTyL0'
    ).then(() => { // this is asyncronous as we need to wait for the server, .then needs to be added on for the code to be executed.
        loading.classList.remove("modal__overlay--visible"); // here we do not want the newly added class. We don't need a space at the start here either. We won't see the loading screen once it times out.
        success.classList += " modal__overlay--visible"; // We want to show the success screen once it times out.
    }).catch(() => { // this is for if there's an error.
        loading.classList.remove("modal__overlay--visible"); // here we do not want the newly added class. We don't need a space at the start here either. We won't see the loading screen once it times out.
        alert (
            "The email serviceis temporarily unavailable. Please contact me directly at dante.kellman@icloud.com"
        );
    })  // the above is a promise.
}



function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true;
    document.body.classList += " modal--open"
}