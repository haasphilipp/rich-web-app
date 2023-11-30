export async function GET(req,res) {
    const email = req.nextUrl.searchParams.get('email');
    const pass = req.nextUrl.searchParams.get('pass');
    
    const { MongoClient } = require('mongodb');

    const url = 'mongodb+srv://haasphilipp:GtPV1ONQReDtHUXE@cluster0.uqlamu8.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);

    const dbName = 'app';

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('login');

    const findResult = await collection.find({"username":
    email}).toArray();
    console.log('Found documents =>', findResult);

    let valid = false
    if(findResult.length > 0 ){
        valid = findResult[0].pass == pass;
    } else {
        console.log(`No user with username: ${email} found.`);
    }

    // at the end of the process we need to send something back.
    return Response.json({ "data": valid});
}