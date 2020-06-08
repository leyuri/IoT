# IoT

### Back-end Server 

##### Goals

- Express + MySQL+Sequelize API Server https://sequelize.org/
- Test-Driven Development-Jest https://jestjs.io/
- Documentation:Swagger https://swagger.io/ https://www.npmjs.com/package/swagger-ui-express https://swagger.io/docs/specification/2-0/basic-structure/
- Authentication: JSON Web Token (JWT) https://github.com/auth0/node-jsonwebtoken
- CORS: sam-origin policy 완화하기 위해
- Password 암호화: bcrypt



### Front-end 

##### Goals

- React Natvie, React Navigation
- API 연동



###  Todo 🥺

##### 2020-06-01

- 앱 기본 셋팅 및 서버 추가

```shell
npx express-generator --view=pug --git server
cd server
npm install

npm install jsonwebtoken cors bcryptjs sequelize mysql2 swagger-ui-express
```

- yaml.file 에 대해 알아보도록..
- Swagger docs 를 통해 사용할 API의 Spec을 정하고 문서를 만들었다. 이를 json file로 export하여 다운받고 Express의 특정 디렉토리에서 service 시켜줬다.



##### 2020-06-08

- Jestjs.io를 이용해서 테스트를 해보자!

- npm install --save-dev jest 는 개발용 버전에만 넣으라는 뜻이다.
- PASS  ./sum.test.js 

```
PASS  ./sum.test.js 
```

 test 라는 이름이 들어가 있는 파일들을 자동으로  run 시켜준다. 예를 들어 auth.register.test.js 요 파일을 npm test를 실행시키면 자동으로 잡아서 테스트 해줌 👏👏👏👏👏 밑의 사진과 같이 진행됨!

<img width="505" alt="Screen Shot 2020-06-08 at 9 01 35 PM" src="https://user-images.githubusercontent.com/33794732/84028198-463bc980-a9cb-11ea-9c08-633ad9bf19e1.png">

<img width="505" alt="Screen Shot 2020-06-08 at 9 03 32 PM" src="https://user-images.githubusercontent.com/33794732/84028356-8438ed80-a9cb-11ea-8fe2-9c40b9570d90.png">



- supertest 라는 패키지를 많이 사용한다. https://github.com/visionmedia/supertest 가상으로 웹브라우저를 대신해서 콜을 날릴 수 있는 테스트를 할 수 있다. 

- test 를 하는 이유: 보통은  하나의 모듈, 파일에 대응하는 테스트 파일을 만든다. 먼저 테스트 파일을 만들고 이런 기능을 해야해~ 하면서 추가적으로 만든다. 

  왜 굳이 api 를 하면서 이걸 해볼까? api 하고 클라이언트들은 보통 다른 개발자가 개발하게 된다. 근데 둘중에 누가 먼저 완성? 각자가 따로 일을 하게 될 것이다. 그럼 클라이언트쪽에서도 뭔가를 만들고 있어야 하고 백엔드에서도 해야 하는데...매번 들어가서 눌러보고 이건...nope!!!!  따라서 자동화된 테스트가 필요하다. 

  api에 대해 기대하는 어떤 output을 여기다가 미리 만들어놓고 테스트 하는 것이다. 매번 브라우저에에 넣고 누르고 프린트 등등 하는 것은 기능이 수백개가 되면 힘들다..ㅜ 테스트를 돌리면 각각의 기능들이 pass하는지 확인할 수 있다. 

- 참고로 아래의 script를 추가해주면 각 파일들을 얼마나 이걸 따라 지나갔는지 볼 수 있다.

```javascript
"test": "jest --coverage"
```

- [개념 되새기기] 라우팅이란 경로를 선택하는 것을 의미. 보통 네트워크 패킷의 경로를 설정해주는 것을 의미하는데, 웹 페이지에서 url에 따른 처리를 해주는 것 또한 라우팅

- 실제 이런 테스트들을 잘 구현하면 디비가 필요 없을때도 있음?!!!...모킹?.... mock????????????????



[테스트]

```javascript
function register(req, res, next) {
    res.json({token: 'xxxxxx'})
}
module.exports = {
    register
}
```

만일 이와 같은 api/auth.js파일이 있다고 치고, npm test를 돌려봄 

```shell
> server@0.0.0 test /Users/yuri/Desktop/iot/server
> jest --coverage

 FAIL  test/api/auth.test.js
  ● should return 400 error if email is missing
```

email 이 missing 되었다고 뜨네? 그러면 email을 구현하면 된다. 



