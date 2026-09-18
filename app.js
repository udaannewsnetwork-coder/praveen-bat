// Supabase authentication for the Praveen Bat demo.
// Replace these placeholders with values from Supabase Project Settings > API.
// Never put a Supabase service_role key in this file.
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

function isConfigured() {
  return Boolean(
    supabaseClient &&
    !SUPABASE_URL.startsWith("YOUR_") &&
    !SUPABASE_PUBLISHABLE_KEY.startsWith("YOUR_")
  );
}

async function signUpUser(email, password) {
  if (!isConfigured()) {
    alert("Add your Supabase URL and publishable key in app.js first.");
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
    alert("Add your Supabase URL and publishable key in app.js first.");
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
