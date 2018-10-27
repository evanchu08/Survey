const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default emails => {
    const invalidateEmails = emails
        .split(/[,;]/)
        .map(email => email.trim())
        .filter(email => re.test(email) === false)
    if (invalidateEmails.length > 0) {
        return `These are invalidate Email: ${invalidateEmails}`
    }
    return;
}

