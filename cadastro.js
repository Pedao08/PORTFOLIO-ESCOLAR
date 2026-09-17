import { supabaseClient } from "./supabase-config.js";

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
        // CADASTRO NO SUPABASE AUTH
        // ==================================
        // A senha é gerenciada SOMENTE pelo
        // Supabase Auth (não é salva em nenhuma
        // tabela própria). O nome é enviado como
        // metadado e o perfil em public.profiles
        // é criado automaticamente por um trigger
        // no PostgreSQL.

        try {

            mensagem.textContent =
                "Criando sua conta...";

            mensagem.style.color =
                "#555";


            const { data, error } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: senha,

                    options: {

                        data: {

                            nome: nome

                        }

                    }

                });


            if (error) {

                const erroMsg = error.message || "";

                if (
                    erroMsg.toLowerCase().includes(
                        "already registered"
                    )
                ) {

                    mensagem.textContent =
                        "Este e-mail já está cadastrado.";

                } else {

                    mensagem.textContent =
                        erroMsg ||
                        "Erro ao realizar cadastro.";

                }

                mensagem.style.color =
                    "red";

                return;

            }


            // ==================================
            // SUCESSO
            // ==================================

            if (data.session) {

                // Confirmação de e-mail DESATIVADA:
                // o usuário já está logado e entra direto.
                mensagem.textContent =
                    "Cadastro realizado com sucesso!";

            } else {

                // Confirmação de e-mail ATIVADA:
                // aguardar o clique no link do e-mail.
                mensagem.textContent =
                    "Cadastro realizado! " +
                    "Confirme seu e-mail para ativar a conta.";

            }

            mensagem.style.color =
                "green";


            form.reset();


            setTimeout(() => {

                if (data.session) {

                    window.location.href =
                        "home.html";

                } else {

                    window.location.href =
                        "index.html";

                }

            }, 1500);

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