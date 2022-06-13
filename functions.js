var start = 44;
function get_video() {
    var code = document.getElementById("code").value;
    // console.log(code);
    if (code == "") {
        document.getElementById("alert").innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Warning!</strong> Please Enter code in the textbox.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div> `
    } else {
        document.getElementById("data").innerHTML = "";
        var end = code.indexOf(`"lang"`) - 2;
        var json = code.substring(start, end) + "}}}";
        document.getElementById("get_video_btn").innerHTML = `<span id="loader" class="spinner-border spinner-border-sm" style="display: inherit;" role="status"></span> Loading...`;
        document.getElementById("get_video_btn").disabled = true;
        document.getElementById("data").style.display = "none";
        setTimeout(show_data,700);
        // console.log("disabled");

               try {
            var parsed = JSON.parse(json);
            document.getElementById("code").value = "";
            function send_html(quality, url) {
                document.getElementById("data").innerHTML += `
            <div class="card mt-5 mx-auto" style = "width: 18rem;">
        <div class="embed-responsive embed-responsive-16by9">
            <video class="embed-responsive-item" src="${url}" controls poster="img/${quality}.png" ></video>

        </div>
        <div class="card-body">
            <h5 class="card-title">Quality: <b>${quality}</b></h5>
            <p class="card-text">View this video in <b>${quality}</b> by clicking the button below.</p>
            <a href="${url}" target="_blank" class="btn btn-primary">View Video</a>
        </div>
        </div> `
            }

            // console.log(JSON.parse(json));
            parsed.request.files.progressive.forEach(video_data => {
                // console.log(video_data.quality);
                // console.log(video_data.url);
                send_html(video_data.quality, video_data.url);
            });


        } catch (error) {
            // console.log("error");
            // console.error();
            document.getElementById("alert").innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Please Enter a valid code in the textbox.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>  `
        }

        // console.log("enabling");
        function show_data() {
            document.getElementById("get_video_btn").disabled = false;
            document.getElementById("get_video_btn").innerHTML = `<span id="loader" class="spinner-border spinner-border-sm" style="display: none;" role="status"></span> Get Video`;
            document.getElementById("data").style.display = "flex";
            document.getElementById("info").style.display = "block";
        }


    }

}

//structure functions

var data;
function generatePost(){
    let postTitle = document.getElementById("postTitle").value;
    let metaDescription = document.getElementById("metaDescription").value;
    let ogImage = document.getElementById("ogImage").value;
    let mainContent = document.getElementById("mainContent").value;

     data = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description"\ncontent="${metaDescription}">\n<meta property="og:title" content="${postTitle}" />\n    <meta property="og:image" content="${ogImage}">\n<meta property="og:type" content="article" />\n<meta property="og:description"\ncontent="${metaDescription}" />\n<meta property="og:locale" content="en_US" />\n<link rel="stylesheet" href="/bootstrap.css">\n<link rel="stylesheet" href="/style.css">\n<link rel="stylesheet" href="/blog-style.css">\n<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">\n<link rel="manifest" href="/favicons/site.webmanifest">\n<title>${postTitle}</title>\n</head>\n<body>\n<!-- Navbar -->\n<nav class="navbar navbar-light bg-light mt-0">\n<div class="brand">\n<a class="navbar-brand" href="/">\n<img src="/img/ALLEN Plus.png" width="30" height="30" class="d-inline-block align-top" alt=""> ALLEN\nPlus\nVideo Grabber\n</a>\n</div>\n<div class="links">\n<a href="/">Home</a>\n<a href="/blog/">Blog</a>\n<a href="/about-us.html ">About Us</a>\n<a href="/contact-us.html">Contact Us</a>\n<a href="/privacy-policy.html">Privacy Policy</a>\n</div>\n</nav>\n<div class="container mt-5">\n<h1>${postTitle}</h1>${mainContent}\n</div>\n<!-- Footer -->\n<footer class="page-footer font-small blue" style="margin-top: 3rem;">\n<!-- Copyright -->\n<div id="footer" class="footer-copyright text-center py-3">©\n<script>document.write(new Date().getFullYear());</script> Copyright:\n<a href="/"> coachingvideograbber.ml</a>\n</div>\n</footer>\n</body>\n</html>`
     document.getElementById("data").innerHTML = data;

}

function copy(){
let textarea = document.getElementById("data");
textarea.select();
navigator.clipboard.writeText(data);
window.alert("Copied Text:\n"+data)

}




