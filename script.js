const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {

    sections.forEach(section => {

        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ' ]').classList.add('active');
            })
        }
    })
}

document.getElementById('form-contato').addEventListener('submit', function (event) {
    event.preventDefault();

    const loader = document.getElementById('div-loader')

    const nome = document.getElementById('input-nome').value.trim()
    const email = document.getElementById('input-email').value.trim()
    const celular = document.getElementById('input-celular').value.trim()
    const assunto = document.getElementById('input-assunto').value.trim()
    const mensagem = document.getElementById('input-mensagem').value.trim()

    if (nome == '') {
        return alert('O nome não pode estar em branco.')
    }
    if (email == '') {
        return alert('O e-mail não pode estar em branco.')
    }
    if (celular == '') {
        return alert('O Celular não pode estar em branco.')
    }
    if (assunto == '') {
        return alert('O Assunto não pode estar em branco.')
    }
    if (mensagem == '') {
        return alert('A mensagem não pode estar em branco.')
    }

    loader.style.display = 'flex'

    const dadosMensagem = {
        nome: nome,
        email: email,
        celular: celular,
        assunto: assunto,
        mensagem: mensagem,
        destinatario: 'eduardoranucci@outlook.com',
    };

    const url = 'https://email-sender-flask.vercel.app';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosMensagem)
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        })
        .then(data => {
            document.getElementById('form-contato').reset()
            loader.style.display = 'none'
            alert('Mensagem enviada com sucesso!');
        })
        .catch(error => {
            alert('Erro ao enviar mensagem');
        });
});