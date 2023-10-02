import express from 'express';
import forge from 'node-forge';
import jose from 'node-jose';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Express server
const app = express();

// Stores all valid keys in JWKS format
const VALID_KEYS = [];

// Generates RSA key pair then converts them to pem format
const KEY_PAIR = forge.pki.rsa.generateKeyPair(2048);
const PRIVATE_KEY = forge.pki.privateKeyToPem(KEY_PAIR.privateKey);
const PUBLIC_KEY = forge.pki.publicKeyToPem(KEY_PAIR.publicKey);

// Adds public RSA key and valid KID into JWKS format
async function addValidKidToValidKeys(keyid) {
    const key = await jose.JWK.asKey(PUBLIC_KEY, 'pem');
    const jwk = key.toJSON();
    VALID_KEYS.push(
        {
            kid: keyid,
            alg: "RS256",
            kty: "RSA",
            use: "sig",
            n: jwk.n,
            e: jwk.e,
        }
    );
    return;
}

// '/auth' POST endpoint
// Checks if token is expired or not
// Valid token key IDs get stored in the global VALID_KEYS array
app.post('/auth', (req, res) => {
    const keyid = uuidv4();
    if (req.query.expired === 'true') {
        const expiredToken = jwt.sign({}, PRIVATE_KEY, {algorithm: 'RS256', expiresIn: '-1h', keyid: keyid});
        res.send(expiredToken);
    }
    else {
        const validToken = jwt.sign({}, PRIVATE_KEY, {algorithm: 'RS256', expiresIn: '24h', keyid: keyid});
        addValidKidToValidKeys(keyid);
        res.send(validToken);
    }
});

// Don't allow any methods other than POST to '/auth'
app.all('/auth', (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
    }
})

// '/.well-known/jwks.json' GET endpoint
// Returns all valid keys in JWKS format
app.get('/.well-known/jwks.json', (req, res) => {
    res.send({keys: VALID_KEYS});
})

// Don't allow any methods other than GET to '/.well-known/jwks.json'
app.all('/.well-known/jwks.json', (req, res) => {
    if(req.method !== 'GET') {
        res.status(405).end();
    }
})

// Starts the server on the localhost on port 8080 
app.listen(8080, () => {
    console.log('jwks-server is running on http://localhost:8080');
})

export default app;