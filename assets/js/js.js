
const myApp = document.getElementById('myApp');

buildStateOne ()

function buildStateOne () {
    myApp.innerHTML = ""

    let loadingTitle = document.createElement('h1')
    let loadingAnimation = document.createElement('img')
    let loadingText = document.createElement('h2')

    loadingTitle.innerHTML = "wethr"
    loadingAnimation.src = "assets/images/svg/loading-svgrepo-com (2).svg"
    loadingText.innerHTML = "LOADING"

    myApp.classList.add('appStateOne')
    loadingTitle.classList.add('s1LoadingTitle')
    loadingAnimation.classList.add('s1LoadingAnimation')
    loadingText.classList.add('s1LoadingText')

    myApp.appendChild(loadingTitle)
    myApp.appendChild(loadingAnimation)
    myApp.appendChild(loadingText)

    setTimeout(() => {
        buildStateTwo()
    }, 2000);

};

function buildStateTwo () {
    myApp.innerHTML = ""
};