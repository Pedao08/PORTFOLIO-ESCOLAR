import { supabaseClient } from "./supabase-config.js";

// ==========================================
// PROTEÇÃO DE PÁGINAS INTERNAS
// ==========================================
// Se não houver sessão/usuário autenticado,
// redireciona para a tela de login.

(async function verificarSessao() {

    const { data, error } =
        await supabaseClient.auth.getUser();

    if (error || !data.user) {

        window.location.href = "index.html";

    }

})();