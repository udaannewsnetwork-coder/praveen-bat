// Supabase authentication for the Praveen Bat demo.
// This browser-safe publishable key must never be replaced with a service_role key.
const SUPABASE_URL = "https://ulkglnvfakfkkwkacmau.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_-l8U0K9mi5Id0e8uSSr26w_7ke7gQp3";

const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

function isConfigured() {
  return Boolean(supabaseClient);
}

async function signUpUser(email, password) {
  if (!isConfigured()) {
    alert("Supabase could not be loaded. Check your internet connection.");
    return;
  }

  const { error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created. Check your email to verify your account.");
  window.location.href = "login.html";
}

async function loginUser(email, password) {
  if (!isConfigured()) {
    alert("Supabase could not be loaded. Check your internet connection.");
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = "dashboard.html";
}

async function logoutUser() {
  if (isConfigured()) await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

async function requireUser() {
  if (!isConfigured()) return null;

  const { data, error } = await supabaseClient.auth.getUser();
  if (error || !data.user) {
    window.location.href = "login.html";
    return null;
  }

  return data.user;
}
