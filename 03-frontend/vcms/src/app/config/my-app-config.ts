export default {

    oidc: {
        clientId: '0oa5zgb4jqz9uPXRS5d7',
        issuer: 'https://dev-89510602.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callbakc', // oturum açtıktan sonra kullancııyı gönderecekleri yer
        scopes: ['openid', 'profile', 'email'] // openid kimlik doğrulama için kullandığımız parametre

    }

}
