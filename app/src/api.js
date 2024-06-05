const express = require('express');
const Database = require('./database');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

app.use(express.json());
dotenv.config();


const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const db = new Database(dbConfig)

// Block route for home page
app.get('/', (req, res) => {
    return res.status(404).send('404 Not Found');
});

// add new user route
app.post('/users', async (req, res) => {
    const {name, email} = req.body;

    if (!name || !email){
        return res.status(400).send({ 'code': 400, 'msg': 'Please provide both name and email.' });
    }

    try {
        await db.connect();
        const insertQuery = 'INSERT INTO user (name, email, created_at, updated_at) VALUES (?, ?, NOW(), NOW());';
        const insertResult = await db.execute(insertQuery, [name, email]);
        console.log('Insert result:', insertResult);
        

        return res.status(200).send({ 'code': 200, 'msg': 'User added successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// add new song route
app.post('/song', async (req, res) => {
    const songName = req.body.songName;
    if (!songName){
        return res.status(400).send({ 'code': 400, 'msg': 'Please provide song name' });
    }

    try {
        await db.connect();
        const insertQuery = 'INSERT INTO song (name, created_at, updated_at) VALUES (?, NOW(), NOW());';
        const insertResult = await db.execute(insertQuery, [songName]);
        console.log('Insert result:', insertResult);
        

        return res.status(200).send({ 'code': 200, 'msg': 'Song added successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// update user data
app.patch('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const email = req.body.email;

    if (!email) {
        return res.status(400).send({ 'code': 400, 'msg': 'Please provide email to update.' });
    }
    
    try {
        await db.connect();

        let updateQuery = 'UPDATE user SET ';
        const queryParams = [];
        if (email) {
            updateQuery += 'email = ?, ';
            queryParams.push(email);
        }
        updateQuery += 'updated_at = NOW() WHERE id = ?';
        queryParams.push(userId);

        const updateResult = await db.execute(updateQuery, queryParams);
        console.log('Update result:', updateResult);

        

        if (updateResult.affectedRows === 0) {
            return res.status(404).send({ 'code': 404, 'msg': 'User not found.' });
        }

        return res.status(200).send({ 'code': 200, 'msg': 'User updated successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// delete user route
app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const db = new Database(dbConfig);

    try {
        await db.connect();
        const deleteQuery = 'DELETE FROM user WHERE id = ?';
        const deleteResult = await db.execute(deleteQuery, [userId]);
        console.log('Delete result:', deleteResult);

        

        if (deleteResult.affectedRows === 0) {
            return res.status(404).send({ 'code': 404, 'msg': 'User not found.' });
        }

        return res.status(200).send({ 'code': 200, 'msg': 'User deleted successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// update song data
app.patch('/song/:songId', async (req, res) => {
    const songId = req.params.songId
    const songName = req.body.songName;

    
    if (!songName) {
        return res.status(400).send({ 'code': 400, 'msg': 'Please provide song name to update.' });
    }

    const db = new Database(dbConfig);
    
    try {
        await db.connect();

        let updateQuery = 'UPDATE song SET ';
        const queryParams = [];
        updateQuery += 'name = ?, ';
        queryParams.push(songName);
        updateQuery += 'updated_at = NOW() WHERE id = ?';
        queryParams.push(songId);

        const updateResult = await db.execute(updateQuery, queryParams);
        console.log('Update result:', updateResult);

        

        if (updateResult.affectedRows === 0) {
            return res.status(404).send({ 'code': 404, 'msg': 'User not found.' });
        }

        return res.status(200).send({ 'code': 200, 'msg': 'User updated successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// delete song data
app.delete('/song/:songId', async (req, res) => {
    const songId = req.params.songId

    
    if (!songId) {
        return res.status(400).send({ 'code': 400, 'msg': 'Please provide songId to update.' });
    }

    const db = new Database(dbConfig);
    
    try {
        await db.connect();
        let queryParams = [];
        let updateQuery = 'DELETE FROM song WHERE id = ?';
        queryParams.push(songId);
        console.log(queryParams);

        const deleteResult = await db.execute(updateQuery, queryParams);
        console.log('Delete result:', deleteResult);

        

        if (deleteResult.affectedRows === 0) {
            return res.status(404).send({ 'code': 404, 'msg': 'Song not found.' });
        }

        return res.status(200).send({ 'code': 200, 'msg': 'User updated successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// user add favorite song route
app.post('/users/:userId/songs/:songId', async (req,res) => {
    const { userId, songId} = req.params;

    try {
        await db.connect();
        // 1. check song have in table
        let querySong = 'select * from song WHERE id = ?';
        let updateSongList = 'UPDATE user SET favorite_song = ? WHERE id = ?';
        let song_list = [];
        const querySongResult = await db.execute(querySong,[songId]);
        if (querySongResult.length < 1){
            return res.status(400).send({ 'code': 500, 'msg': 'Not found song' })
        }
        
        // 2. check user have in table
        let queryUser = 'select id, favorite_song from user WHERE id = ?';
        const queryUserResult = await db.execute(queryUser,[userId]);
        if (queryUserResult.length < 1){
            return res.status(400).send({ 'code': 500, 'msg': 'Not found user' })
        }

        // 3. add favorite song to user
        try {
            if (!queryUserResult[0]['favorite_song'].includes(songId)){
                queryUserResult[0]['favorite_song'].push(songId);
            }
            song_list = queryUserResult[0]['favorite_song'];
        } catch (error) {
            if (error instanceof TypeError) {
                song_list.push(songId);
            } else {
                console.log('Unexpected error:', error);
            }
        }
        
        const updateSongListResult = await db.execute(updateSongList,[song_list,userId]);
        console.log(updateSongListResult);
        
        return res.status(200).send({ 'code': 200, 'msg': 'updated favorite song to user successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// user delete favorite song route
app.delete('/users/:userId/songs/:songId', async (req,res) => {
    const { userId, songId} = req.params;
    
    try {
        await db.connect();
        // 1. check song have in table
        let querySong = 'select * from song WHERE id = ?';
        let updateSongList = 'UPDATE user SET favorite_song = ? WHERE id = ?';
        let song_list = [];
        const querySongResult = await db.execute(querySong,[songId]);
        if (querySongResult.length < 1){
            return res.status(400).send({ 'code': 500, 'msg': 'Not found song' })
        }
        
        // 2. check user have in table
        let queryUser = 'select id, favorite_song from user WHERE id = ?';
        const queryUserResult = await db.execute(queryUser,[userId]);
        if (queryUserResult.length < 1){
            return res.status(400).send({ 'code': 500, 'msg': 'Not found user' })
        }

        // 3. delete favorite song from user
        try {
            if (queryUserResult[0]['favorite_song'].includes(songId)){
                queryUserResult[0]['favorite_song'] = queryUserResult[0]['favorite_song'].filter(item => item !== songId);
            }
            song_list = queryUserResult[0]['favorite_song'];
        } catch (error) {
            console.log('Unexpected error:', error);
        }
        
        const updateSongListResult = await db.execute(updateSongList,[song_list,userId]);
        console.log(updateSongListResult);
        
        return res.status(200).send({ 'code': 200, 'msg': 'delete favorite song to user successfully.' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

// query user favorite song
app.get('/users/:userId/songs', async (req,res) => {
    const userId = req.params.userId;

    try {
        await db.connect();

        let queryUser = 'select id, favorite_song from user WHERE id = ?';
        const queryUserResult = await db.execute(queryUser,[userId]);
        // check user have in table
        if (queryUserResult.length < 1){
            return res.status(400).send({ 'code': 500, 'msg': 'Not found user' })
        }

        user_favorite_song = queryUserResult[0]['favorite_song'];
        if (!user_favorite_song || user_favorite_song.length < 1){
            return res.status(200).send({ 'code': 200, 'msg': 'user not have favorite song'});
        }
        return res.status(200).send({ 'code': 200, 'msg': user_favorite_song});
    } catch (error) {
        console.error('Error:', err);
        return res.status(500).send({ 'code': 500, 'msg': 'Internal server error.' });
    }
});

module.exports = {
    app,
    port
};
