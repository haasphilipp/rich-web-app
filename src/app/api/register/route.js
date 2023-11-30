export async function GET(req,res) {
    const email = req.nextUrl.searchParams.get('email');
    const pass = req.nextUrl.searchParams.get('pass');
    const dob = req.nextUrl.searchParams.get('dob');
    
    const { MongoClient } = require('mongodb');

    const url = 'mongodb+srv://haasphilipp:GtPV1ONQReDtHUXE@cluster0.uqlamu8.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);

    const dbName = 'app';

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('login');

    const findResult = await collection.insertOne({"username": email, "pass": pass, "dob": dob});
    
    return Response.json({ "data": true});
}