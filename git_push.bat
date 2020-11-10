:: github 에 올리기
git add .

set /p msg="Commit msg? "
git commit -m %msg%

git push origin master