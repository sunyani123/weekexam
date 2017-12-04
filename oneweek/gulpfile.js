var gulp = require('gulp');//注入gulp
var webserver = require('gulp-webserver');//注入gulp-webserver
var fs = require('fs');//注入fs
var url = require('url');//注入url
var mincss = require('gulp-clean-css');//注入gulp-clean-css
var minjs = require('gulp-uglify');//注入gulp-uglify
var data = JSON.parse(fs.readFileSync('./data.json').toString());//读取json文件
gulp.task('mincss',function(){//压缩css
    gulp.src('./App/common/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('./mincss/'));
});
gulp.task('minjs',function(){//压缩js
    gulp.src('./App/self/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('./minjs/'));
});
gulp.task('webserver',function(){//启动一个服务
    gulp.src('.')
        .pipe(webserver({
            port:3000,//端口号
            open:true,//自动打开浏览器
            host:'localhost',
            livereload:true,//自动刷新页面
            fallback:'./index.html'//打开默认页面
        }))
});
gulp.task('mywebserver',function(){//启动一个服务
    gulp.src('.')
        .pipe(webserver({
            port:8080,
            middleware:function(request,response,next){
                response.writeHead(200,{//写请求头信息
                    'Content-type':'text/json;charset=utf-8',
                    'Access-Control-Allow-Origin':'*'
                })
                switch(request.url){//switch判断
                    case '/datajson':
                    console.log(123);
                    response.end(JSON.stringify(data));
                    break;
                }
            }
        }))
});
gulp.task('default',['webserver','mywebserver','mincss','minjs']);//默认执行的任务