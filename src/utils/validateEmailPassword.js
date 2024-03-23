export default  function validateEmailPassword(email, password) {
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!emailRegex.test(email)) {
    return 'Invalid email';
  }

  if (!passwordRegex.test(password)) {
    return 'Invalid password';
  }

  return null;
}