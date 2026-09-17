const form =
    document.getElementById("cadastroForm");

const nomeInput =
    document.getElementById("nome");

const emailInput =
    document.getElementById("email");

const senhaInput =
    document.getElementById("senha");

const confirmarSenhaInput =
    document.getElementById("confirmarSenha");

const mensagem =
    document.getElementById("mensagemCadastro");


form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const nome =
            nomeInput.value.trim();

        const email =
            emailInput.value.trim();

        const senha =
            senhaInput.value;

        const confirmarSenha =
            confirmarSenhaInput.value;


        mensagem.textContent = "";


        // ==================================
        // VALIDAÇÕES
        // ==================================

        if (
            !nome ||
            !email ||
            !senha ||
            !confirmarSenha
        ) {

            mensagem.textContent =
                "Preencha todos os campos.";

            mensagem.style.color =
                "red";

            return;
        }


        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            mensagem.textContent =
                "Digite um e-mail válido.";

            mensagem.style.color =
                "red";

            return;
        }


        if (senha.length < 6) {

            mensagem.textContent =
                "A senha deve ter pelo menos 6 caracteres.";

            mensagem.style.color =
                "red";

            return;
        }


        if (senha !== confirmarSenha) {

            mensagem.textContent =
                "As senhas não coincidem.";

            mensagem.style.color =
                "red";

            return;
        }


        // ==================================
        // CADASTRAR NO SERVIDOR
        // ==================================

        try {

            mensagem.textContent =
                "Criando sua conta...";

            mensagem.style.color =
                "#555";


            const resposta =
                await fetch(
                    "http://localhost:3000/api/cadastro",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            nome: nome,

                            email: email,

                            senha: senha

                        })

                    }
                );


            const dados =
                await resposta.json();


            if (dados.success) {

                mensagem.textContent =
                    "Cadastro realizado com sucesso!";

                mensagem.style.color =
                    "green";


                form.reset();


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 1200);

            }


            else {

                mensagem.textContent =
                    dados.message ||
                    "Erro ao realizar cadastro.";

                mensagem.style.color =
                    "red";

            }

        }


        catch (erro) {

            console.error(erro);

            mensagem.textContent =
                "Não foi possível conectar ao servidor.";

            mensagem.style.color =
                "red";

        }

    }
);