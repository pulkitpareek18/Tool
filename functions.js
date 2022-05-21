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
            <p class="card-text">Download this video in <b>${quality}</b> by clicking the button below.</p>
            <a href="${url}" target="_blank" class="btn btn-primary">Download</a>
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



