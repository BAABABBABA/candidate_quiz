# 📝 Coding For Apply Programmer Role
---
### Including :
- source code in app folder
- Dockerfile in app folder
- docker-compose.yaml for deployment
- SQL Scipt
---
### Additional Feature
- ได้มีการเพิ่ม POST, DELETE /song และ PATCH /song/{songId} เพื่อใช้ในการ manipulate song data
- ได้มีการเพิ่มการตรวจสอบว่ามี User อยู่จริงในระบบ table
```
if (queryUserResult.length < 1){
    return res.status(400).send({ 'code': 500, 'msg': 'Not found user' })
}
```
- ได้มีการเพิ่มการตรวจสอบว่ามี Song อยู่จริงในระบบ table
```
if (querySongResult.length < 1){
    return res.status(400).send({ 'code': 500, 'msg': 'Not found song' })
}
```

---
### CURL Command Example for Testing

- Add New User

```
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38 \
  --data '{
	"name":"D",
	"email":"D_test@mail.com"
}'
```

- Add New Song
```
curl --request POST \
  --url http://localhost:3000/song \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38 \
  --data '{
	"songName":"song_C"
}'
```
- User Add Favorite Song
```
curl --request POST \
  --url http://localhost:3000/users/1/songs/15 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38 \
  --data '{
	"songName":"song_B"
}'
```

- Get User Favorite Song
```
curl --request GET \
  --url http://localhost:3000/users/1/songs \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38
```

- User Delete Favorite Song
```
curl --request DELETE \
  --url http://localhost:3000/users/1/songs/3 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38 \
  --data '{
	"songName":"song_B"
}'
```
- Patch Users
```
curl --request PATCH \
  --url http://localhost:3000/users/3 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38 \
  --data '{
	"email":"test_change_B@mail.com"
}'
```
- Patch Song
```
curl --request PATCH \
  --url http://localhost:3000/song/1 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38 \
  --data '{
	"songName":"change_song_A"
}'
```
- Delete User
```
curl --request DELETE \
  --url http://localhost:3000/users/2 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38
```
- Delete Song
```
curl --request DELETE \
  --url http://localhost:3000/song/2 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --cookie session=eyJzdGF0ZSI6IjhVV0E3QnZNaEIwQ043c3QwbEx1VG5TelVCZ3pRbSJ9.ZhtE2A.VRE_xbtWBsWrFHXhewYnPXOJd38
```
