import { supabaseClient } from "./supabase-config.js";

const saudacaoUsuario = document.getElementById("saudacaoUsuario");
const btnVoltarLogin = document.getElementById("btnVoltarLogin");


// ==========================================
// PROTEGER A PÁGINA: SÓ ENTRA SE LOGADO
// ==========================================

async function verificarSessao() {

    try {

        // 1. Verificar se existe usuário autenticado
        const { data, error } =
            await supabaseClient.auth.getUser();

        // 2. Se não houver sessão, voltar para o login
        if (error || !data.user) {

            window.location.href = "index.html";
            return;
        }

        // 3. Buscar SOMENTE o perfil do usuário atual.
        //    O RLS garante que ninguém lê o perfil dos
        //    outros usuários.
        let nome = data.user.user_metadata?.nome || "";

        const { data: perfil, error: erroPerfil } =
            await supabaseClient
                .from("profiles")
                .select("nome")
                .eq("id", data.user.id)
                .maybeSingle();

        if (perfil && perfil.nome) {

            nome = perfil.nome;

        } else if (erroPerfil) {

            console.warn(
                "Não foi possível ler o perfil:",
                erroPerfil.message
            );

        }

        // 4. Exibir o nome do usuário
        saudacaoUsuario.textContent =
            nome ? `Olá, ${nome}!` : "Olá!";

    } catch (erro) {

        console.error(
            "Erro ao verificar a sessão:",
            erro
        );

        window.location.href = "index.html";
    }

}


// ==========================================
// BOTÃO SAIR
// ==========================================

btnVoltarLogin.addEventListener(
    "click",
    async function () {

        // Encerrar a sessão no Supabase
        await supabaseClient.auth.signOut();

        // Voltar para a tela de login
        window.location.href =
            "index.html";

    }
);


verificarSessao();