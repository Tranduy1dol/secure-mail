# secure-mail

# **Motivation**

This product is participating in the "Vietnam Hackathon: Onchain Name and Identity" with the topic "Building a Secure Mail System."

# **Features**

- The front-end is built on ReactJS for a dynamic UI/UX.
- The email server is configured with Nodemailer and MailTrap.
- The security phase is built on the S/MIME technique to achieve end-to-end (E2E) encryption for emails. Additionally, the secure system is built with ZKP (Zero-Knowledge Proof).

# **Instructions**

With a Handshake domain, follow these instructions to configure a Handshake domain and the Mailtrap mail server.

To run the front-end:

```
npm install
npm start
```

# **Improvements**

Because of lack of time, resources and skills, some security functions are still evolving. In the future, some of the following functions will continue to be improved:

- Add a CI/CD pipeline for automatic build, deployment, and testing.
- Optimize the project with Docker.
- Add tracing and logging.
- Improve the security phase with zk-email.
- Improve the resolver so that email addresses will have a Handshake domain after the "@" symbol.

# **Contributor**
- Tran Manh Duy
- Ngo Phuong Ha
- Truong Quang Minh
- Tran Duc Dang Khoi