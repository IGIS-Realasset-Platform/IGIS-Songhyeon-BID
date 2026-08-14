export async function hasAuthenticatedSonghyeonSession(client) {
  try {
    const { data, error } = await client.auth.getSession();
    return !error && Boolean(data.session?.user);
  } catch {
    // Read through the privacy-safe public projection whenever auth state is unavailable.
    return false;
  }
}
