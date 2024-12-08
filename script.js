const frases = ["Web.", "de automações.", "UI/UX."];
const textoFixo = "Olá, meu nome é ";
const nome = "Antonio Nycollas.";
const prefixo = "Sou desenvolvedor ";
const velocidadeDigitar = 100;
const velocidadeApagar = 50;
const tempoEntreFrases = 2000;
let indiceFrase = 0;
let indiceLetra = 0;
let indiceLetraFixo = 0;
let indiceLetraNome = 0;
let indiceLetraPrefixo = 0;
let apagando = false;
const elementoTextoLinha1 = document.getElementById("linha1");
const elementoTextoLinha2 = document.getElementById("linha2");
const elementoTextoLinha2Dinamico = document.getElementById("linha2-dinamico");
const cursorLinha1 = document.getElementById("blinking-cursor1");
const cursorLinha2 = document.getElementById("blinking-cursor2");
const promptIcon1 = document.getElementById("prompt-icon1");
const promptIcon2 = document.getElementById("prompt-icon2");



let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')

})

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const toggleButtonDesktop = document.getElementById('toggle-mode-desktop');
    const toggleButtonMobile = document.getElementById('toggle-mode-mobile');

    function toggleMode() {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');

        const iconDesktop = toggleButtonDesktop.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            iconDesktop.classList.remove('bi-sun-fill');
            iconDesktop.classList.add('bi-moon-fill');
        } else {
            iconDesktop.classList.remove('bi-moon-fill');
            iconDesktop.classList.add('bi-sun-fill');
        }

        if (toggleButtonMobile) {
            const iconMobile = toggleButtonMobile.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                iconMobile.classList.remove('bi-sun-fill');
                iconMobile.classList.add('bi-moon-fill');
            } else {
                iconMobile.classList.remove('bi-moon-fill');
                iconMobile.classList.add('bi-sun-fill');
            }
        }
    }

    toggleButtonDesktop.addEventListener('click', toggleMode);
    if (toggleButtonMobile) {
        toggleButtonMobile.addEventListener('click', toggleMode);
    }
});

function digitarLinha1() {
    if (indiceLetraFixo < textoFixo.length) {
        elementoTextoLinha1.textContent += textoFixo.charAt(indiceLetraFixo);
        indiceLetraFixo++;
        setTimeout(digitarLinha1, velocidadeDigitar);
    } else if (indiceLetraNome < nome.length) {
        elementoTextoLinha1.innerHTML += `<span style="color: #bd0000;">${nome.charAt(indiceLetraNome)}</span>`;
        indiceLetraNome++;
        setTimeout(digitarLinha1, velocidadeDigitar);
    } else {
        cursorLinha1.style.display = "none";
        cursorLinha2.style.display = "inline";
        setTimeout(digitarPrefixo, velocidadeDigitar);
    }
}

function digitarPrefixo() {
    if (indiceLetraPrefixo < prefixo.length) {
        elementoTextoLinha2.textContent += prefixo.charAt(indiceLetraPrefixo);
        indiceLetraPrefixo++;
        setTimeout(digitarPrefixo, velocidadeDigitar);
    } else {
        setTimeout(digitarLinha2, velocidadeDigitar);
    }
}

function digitarLinha2() {
    if (!apagando && indiceLetra < frases[indiceFrase].length) {
        elementoTextoLinha2Dinamico.style.color = "#bd0000"; // Correção aqui
        elementoTextoLinha2Dinamico.textContent += frases[indiceFrase].charAt(indiceLetra);
        indiceLetra++;
        setTimeout(digitarLinha2, velocidadeDigitar);
    } else if (apagando && indiceLetra > 0) {
        elementoTextoLinha2Dinamico.textContent = frases[indiceFrase].substring(0, indiceLetra - 1);
        indiceLetra--;
        setTimeout(digitarLinha2, velocidadeApagar);
    } else if (!apagando && indiceLetra === frases[indiceFrase].length) {
        setTimeout(() => {
            apagando = true;
            setTimeout(digitarLinha2, velocidadeApagar);
        }, tempoEntreFrases);
    } else if (apagando && indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(digitarLinha2, velocidadeDigitar);
    }
}

function mudarCorPrompt() {
    const cores = ['#bd0000', '#bd0000', '#bd0000'];
    const corAtual = promptIcon1.style.color;
    const novaCor = cores[(cores.indexOf(corAtual) + 1) % cores.length];
    promptIcon1.style.color = novaCor;
    promptIcon2.style.color = novaCor;
}

promptIcon1.addEventListener('click', mudarCorPrompt);
promptIcon2.addEventListener('click', mudarCorPrompt);

cursorLinha2.style.display = "none";
digitarLinha1();



document.querySelectorAll('.icon').forEach(function (icon) {
    const tooltipText = icon.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = tooltipText;
    icon.appendChild(tooltip);

    icon.addEventListener('mouseenter', function () {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    });

    icon.addEventListener('mouseleave', function () {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    });

    icon.addEventListener('click', function () {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    });
});

function expandImage(img) {
    var modal = document.getElementById("imageModal");
    var expandedImg = document.getElementById("expandedImg");
    var closeBtn = document.getElementById("closeBtn");

    modal.style.display = "block";
    expandedImg.src = img.src;

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    modal.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

document.querySelectorAll(".projetos-box img").forEach(img => {
    img.addEventListener("click", function() {
        expandImage(this);
    });
});
