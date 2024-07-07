# Wetube
/ - home
<br>
/join - join
<br>
/login - login
<br>
/search - search
<br>
<br>
/users/:id - see user
<br>
/users/logout - log out
<br>
/users/edit - edit user
<br>
/user/delete - delete user
<br>
<br>
/videos/:id - watch video
<br>
/videos/:id/edit - edit video
<br>
/videos/:id/delete - delete video
<br>
/videos/upload - upload video
<br>

# 기능

- 계정처리

로그인 기능;

Github oAuth;
scope: user data, email data

깃허브 로그인시, 존재하는 같은 이메일이 있을 경우 -> 깃허브X 해당 계정 로그인 처리 (SocialLogin: false)
존재하지 않는 경우 -> 깃허브를 통한 로그인 (SocialLogin: true)
--> 중복된 이메일 존재 X

# 하고싶은말

express를 통해 유튜브 클론코딩을 했는데, ts를 사용하며했습니다.

기본적으로 express, mongo는 타입검사를 하는 느낌이였기에, ts의 필요성을
몸소 느끼지 못했던거 같습니다. express에서는? (리액튼는 필수!)

구글 답변 결과 express에서 ts사용은 가독성, 오류를 줄여준다는데
현실적으로 좋은 방법인지 잘 모르겠네요!! 조언 부탁드립니다.


