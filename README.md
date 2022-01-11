# react 사용의 문제점

-   state를 다른 컴포넌트에서 사용해야할 때, props를 통해 자식 컴포넌트에게 전달한다.
-   큰 프로젝트일 수록 props의 수가 점점 증가하게 되면, 필요 없는 전달이 생길 수 있고, 문제점을 찾기 어렵다.
-   login 기능과 같이 App에서 모두 사용하는 기능에서 사용자의 정보를 계속해서 전달해야한다.

# Redux

-   모든 컴포넌트에서 접근할 수 있는 하나의 store를 통해 state를 관리하게 해주는 js라이브러리
-   state의 변경은 action에 정의된 것으로만 가능하다.
-   action의 처리는 dispatcher가 관리한다.
-   UI프레임워크 어디서도 사용이 가능하다(React, vue, angular 등)

### State

-   컴포넌트 내부에 사용되는 데이터의 집합

### Store

-   State를 관리하는 공간, 객체 형식으로 저장된다.

```jsx
{
    // 세션과 관련된 것
    session: {
        loggedIn: true,
        user: {
            id: "114514",
            screenName: "@mpyw",
        },
    },

    // 표시중인 타임라인에 관련된 것
    timeline: {
        type: "home",
        statuses: [
            {id: 1, screenName: "@mpyw", text: "hello"},
            {id: 2, screenName: "@mpyw", text: "bye"},
        ],
    },

    // 알림과 관련된 것
    notification: [],
}
```

-   규모가 클 경우, 카테고리별로 분류하는 것이 바람직하다.

### Reducer

-   store의 state를 업데이트 하고 싶을때 reducer를 거쳐야 한다.
-   이전 state객체를 변형하는 것이 아닌, 이전의 state와 action의 과정을 참고하여 새로운 객체를 반환하는 것이다.

### Action

-   state를 변경하기 위한 이벤트의 정보
-   reducer이 참고할 수 있도록 type과 데이터를 가져야 한다.

---

## React-redux 설치

`npm install redux react-redux`

## Redux 실습 프로젝트 - Song list app

-   나열된 노래를 select하면 노래에 대한 상세 설명을 보여주는 app
-   프로젝트 파일 구조

![image](https://user-images.githubusercontent.com/92558961/148911497-d14a1738-9e98-4de3-a2b3-05357bb3dad0.png)

-   src/index.js

    ![image](https://user-images.githubusercontent.com/92558961/148911580-ac9d3a3e-e22c-4d71-bcb1-ad0c7d60f341.png)

    -   공통으로 사용할 store를 생성한다.

-   actions/index.js

    ![image](https://user-images.githubusercontent.com/92558961/148911637-eebb401c-4e99-4436-b73b-a1a02ecb023e.png)

    -   selectSong action : song데이터를 받으면, 객체로 변환하여 반환한다.
    -   반환된 객체는 reducer에서 참고하여 state를 변형한다.

-   reducers/index.js

    ![image](https://user-images.githubusercontent.com/92558961/148911680-6074ac8d-11ae-4ba4-9af4-f0883ff232f3.png)

    -   1: combineReducers : 여러 개의 reducer을 합쳐 내보낼 수 있는 함수
    -   21: 공통 state의 이름은 다음과 같이 정의되고, 초기화도 진행된다.
    -   22: songs state는 song list로 초기화 된다.
    -   23: selectedSong는 null로 초기화 된다.
        -   selectSong 액션이 실행되면, action에서 반환한 객체 값으로 state를 변환한다.

-   App.js
    ![image](https://user-images.githubusercontent.com/92558961/148911721-4aab9b8b-7194-4dc9-9c24-75f595371bbd.png)
    -   SongList 와 SongDetail 컴포넌트를 가져온다. props는 전해주지 않았다.
-   SongList.js

    ![image](https://user-images.githubusercontent.com/92558961/148911754-078dabe2-2ad8-4a2d-8179-213fa80a783a.png)

    -   23: mapStateToProps : store에 있는 state를 가져온다. 이 값은 props로 전달된다.
    -   25: state 중 songs데이터만 객체로 변환하여 반환한다.
    -   28: connect() : Props로 변환된 songs와 selectSong 액션을 SongList와 연결한다.
        -   SongList 컴포넌트 에서는 Props로 songs와 selectSong액션을 사용할 수 있다.

    ![image](https://user-images.githubusercontent.com/92558961/148911795-40a4542d-918e-4842-bb4d-f5b46d2e72d7.png)

    -   5: mapStateToProps에서 반환된 값이 props로 받아온다.
    -   songs의 정보를 표현
    -   12: 버튼이 클릭되면, action의 selectSong에 song의 정보를 보내 동작시킨다.
        -   action이 반환한 객체를 참조하여 reducer가 selectedSong state의 값을 변환한다.
        -   3: 에서 selectSong을 import했더라도 props의 action을 호출하지 않으면,
            redux에서 인식하지 못하여 state변환이 정상적으로 동작하지 못한다.

-   SongDetail.js
    ![image](https://user-images.githubusercontent.com/92558961/148911819-fc8dbc08-dc3c-4295-b4f4-1c2bf15ac44d.png)
    -   24: connect() : props로 변환한 selectedSong state와 SongDetail컴포넌트를 연결
    ![image](https://user-images.githubusercontent.com/92558961/148911842-c274c3fe-3b6c-47ff-955f-3057959be84b.png)
    -   변환된 props의 정보를 보여준다.
