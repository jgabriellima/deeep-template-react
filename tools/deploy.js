const sys = require('sys');
const exec = require('child_process').exec;

exec('git add .', function (error, stdout, stderr) {
    console.log(stdout);
    exec(`git commit -am "Update to deploy ${Date.now()}"`, function (error, stdout, stderr) {
        console.log(stdout);
        exec('git push heroku master --set-upstream', function (error, stdout, stderr) {
            if (error) {
                console.log(error.code);
            }
            console.log(stdout);
        });
    });
});
