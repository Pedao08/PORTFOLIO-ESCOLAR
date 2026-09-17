const SUPABASE_URL = "https://jtnnbeooknecxxphvfsb.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_ray3aKw_ORX6DNFJ5EFh6A_M9KiklMH";


export const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );