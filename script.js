const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const divProjetos = document.querySelector('.projetos-container');

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
            alert('Mensagem enviada com sucesso!');
            document.getElementById('form-contato').reset()
        })
        .catch(error => {
            alert('Erro ao enviar mensagem');
        });

});

function getGithubRepos() {

    fetch('https://api.github.com/users/eduardoranucci/repos')
        .then(response => response.json())
        .then(repos => {           
            repos.forEach(repo => {

                const projeto = document.createElement('a')
                projeto.setAttribute('href', repo.html_url)
                projeto.setAttribute('target', '_blank')
                divProjetos.appendChild(projeto)

                const projetoBox = document.createElement('div')
                projetoBox.setAttribute('class', 'projetos-box')
                projeto.appendChild(projetoBox)

                const projetoInfo = document.createElement('div')
                projetoInfo.setAttribute('class', 'projetos-info')
                projetoBox.appendChild(projetoInfo)

                const tituloProjeto = document.createElement('h4')
                tituloProjeto.innerText = repo.name
                projetoInfo.appendChild(tituloProjeto)

                const ulProjeto = document.createElement('ul')
                projetoInfo.appendChild(ulProjeto)

                const liLinguagem = document.createElement('li')
                liLinguagem.innerText = 'Linguagem Principal: ' + repo.language
                ulProjeto.appendChild(liLinguagem)

                const liEstrelas = document.createElement('li')
                liEstrelas.innerText = 'Stars: ' + repo.stargazers_count
                ulProjeto.appendChild(liEstrelas)

                const liForks = document.createElement('li')
                liForks.innerText = 'Forks: ' + repo.forks_count
                ulProjeto.appendChild(liForks)

                const liAtualização = document.createElement('li')
                liAtualização.innerText = 'Última atualização: ' + new Date(repo.updated_at).toLocaleDateString()
                ulProjeto.appendChild(liAtualização)
            });
        })
        .catch(erro => console.error(erro));

}

getGithubRepos()