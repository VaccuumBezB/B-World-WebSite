//import 'cookie-parser'


//var cookieParser = require('cookie-parser');


const d = document;

function check() {
    if (localStorage.getItem("reg") == null) {
        swal({
            title: "Зарегистрируйтесь!",
            text: "У вас есть учётная запись B-World? Войдите!",
            icon: "info",
            buttons: ["Войти", "Зарегистрироваться"]
        }).then((value) => {
            if (!value) {
                window.location.href = "./logichelpers/login.html";
            } else {
                window.location.href = "./logichelpers/signup.html";
            }
        });
    }
} 

function Start_() {
    localStorage.setItem("reg", "true");
    check();
    
    const infElement = d.getElementById('inf');
    const inf1Element = d.getElementById('inf1');

    if (Math.random() >= 0.5) {
        infElement.innerHTML = `
            <div class="forma">
                <h2>Поддержка Windows и Linux Debian!</h2>
                <br>
                <p>B-World можно установить как на Windows так и на Debian-подобные Unix-системы</p>
            </div>
            <img src="" alt=""/>
        `;
    } else {
        infElement.innerHTML = `
            <div class="forma">
                <h2>Аккаунты</h2>
                <br>
                <p>Вы можете привязать свой BWid к почте или к Google-аккаунту</p>
            </div>
            <img src="" alt=""/>
        `;
    }

    if (Math.random() >= 0.5) {
        inf1Element.innerHTML = `
            <div class="forma">
                <h2>Удобный API модов!</h2>
                <br>
                <p>B-World предоставляет простой и понятный API для создания модификаций</p>
            </div>
            <img src="" alt=""/>
        `;
    } else {
        inf1Element.innerHTML = `
            <div class="forma">
                <h2>Аккаунты</h2>
                <br>
                <p>Вы можете привязать свой BWid к почте или к Google-аккаунту</p>
            </div>
            <img src="" alt=""/>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const supportLink = document.querySelector('a[href="#support"]');
    const supportDiv = document.getElementById('support');

    if (supportLink && supportDiv) {
        supportLink.addEventListener('click', function(e) {
            e.preventDefault();
            supportDiv.classList.toggle('active');
        });
    }
});