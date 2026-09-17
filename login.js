import { supabaseClient } from "./supabase-config.js";

const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const mensagem = document.getElementById("mensagem");


form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    mensagem.textContent = "";


    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (!email || !senha) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    if (!email.includes("@") || !email.includes(".")) {

        mensagem.textContent = "Digite um e-mail válido.";
        mensagem.style.color = "red";

        return;
    }


    if (senha.length < 6) {

        mensagem.textContent =
            "A senha deve ter pelo menos 6 caracteres.";

        mensagem.style.color = "red";

        return;
    }


    // ==========================================
    // LOGIN NO SUPABASE AUTH
    // ==========================================
    // A senha é validada APENAS pelo Supabase Auth.
    // Nenhuma consulta é feita em public.profiles
    // para validar senha.

    try {

        mensagem.textContent = "Verificando login...";
        mensagem.style.color = "#555";


        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: senha
            });


        if (error) {

            const erroMsg = error.message || "";

            if (
                erroMsg.toLowerCase().includes(
                    "invalid login credentials"
                )
            ) {

                mensagem.textContent =
                    "E-mail ou senha inválidos.";

            } else if (
                erroMsg.toLowerCase().includes(
                    "email not confirmed"
                )
            ) {

                mensagem.textContent =
                    "Confirme seu e-mail antes de fazer login.";

            } else {

                mensagem.textContent =
                    erroMsg || "E-mail ou senha inválidos.";

            }

            mensagem.style.color = "red";

            return;
        }


        // ==========================================
        // LOGIN REALIZADO COM SUCESSO
        // ==========================================

        mensagem.textContent =
            "Login realizado com sucesso!";

        mensagem.style.color = "green";


        setTimeout(function() {

            window.location.href = "home.html";

        }, 1000);


    } catch (erro) {

        console.error("Erro:", erro);

        mensagem.textContent =
            "Não foi possível conectar ao servidor.";

        mensagem.style.color = "red";

    }

});