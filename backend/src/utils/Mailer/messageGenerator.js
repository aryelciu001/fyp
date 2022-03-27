module.exports = {
  verifyEmail: (code) => {
    const html = `<p>This is your verification code<p>
      <p><h1>${code}</h1><p>`;
    const text = `This is your verification code: ${code}`;
    const subject = `Verification Code`;
    return {
      subject,
      text,
      html,
    };
  },
};
