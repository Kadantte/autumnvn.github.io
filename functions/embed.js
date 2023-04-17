export async function onRequest(context) {
    const url = new URL(context.request.url);
    const site = url.searchParams.get("site") || url.searchParams.get("s");
    const title = url.searchParams.get("title") || url.searchParams.get("t");
    const description = url.searchParams.get("description") || url.searchParams.get("desc") || url.searchParams.get("d");
    const image = url.searchParams.get("image") || url.searchParams.get("img") || url.searchParams.get("i");
    const banner = url.searchParams.get("banner") || url.searchParams.get("bigimage") || url.searchParams.get("bigimg") || url.searchParams.get("b");
    const video = url.searchParams.get("video") || url.searchParams.get("v");
    const _url = url.searchParams.get("url") || url.searchParams.get("link") || url.searchParams.get("u") || url.searchParams.get("l");
    const color = url.searchParams.get("color") || url.searchParams.get("c");

    const embed = `
    <html>

<head>
    <title>Discord Embed</title>
    <style>
        body {
            background-color: #000;
            color: #fff;
            font-family: sans-serif;
        }

        td {
            padding: 2px 20px;
            font-size: xx-large;
        }

        table {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        input[type="text"] {
            width: 500px;
            padding: 5px;
            border: 1px solid #fff;
            border-radius: 5px;
            background-color: #fff;
            color: #000;
            font-size: xx-large;
        }

        input[type="color"] {
            width: 50px;
            height: 50px;
        }

        button {
            padding: 5px;
            border: 1px solid #fff;
            border-radius: 5px;
            background-color: #fff;
            color: #000;
            cursor: pointer;
            font-size: xx-large;
        }

        button:hover {
            background-color: #000;
            color: #fff;
        }

    </style>
</head>

<body>
    <table>
        <tr>
            <td>Site Name</td>
            <td><input type="text" id="site" /></td>
        </tr>
        <tr>
            <td>Title</td>
            <td><input type="text" id="title" /></td>
        </tr>
        <tr>
            <td>Description</td>
            <td><input type="text" id="description" /></td>
        </tr>
        <tr>
            <td>Image</td>
            <td><input type="text" id="image" /></td>
        </tr>
        <tr>
            <td>Banner</td>
            <td><input type="text" id="banner" /></td>
        </tr>
        <tr>
            <td>Video</td>
            <td><input type="text" id="video" /></td>
        </tr>
        <tr>
            <td>URL</td>
            <td><input type="text" id="_url" /></td>
        </tr>
        <tr>
            <td>Color</td>
            <td><input type="color" id="color" /></td>
        </tr>
        <tr>
            <td></td>
            <td><button onclick="copy()">Copy link</button></td>
        </tr>
    </table>
    <script>
        function copy() {
            const url = new URL(window.location.href);
            const site = document.getElementById('site').value;
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const image = document.getElementById('image').value;
            const banner = document.getElementById('banner').value;
            const video = document.getElementById('video').value;
            const _url = document.getElementById('_url').value;
            const color = document.getElementById('color').value;
            if (site) url.searchParams.set('s', site);
            if (title) url.searchParams.set('t', title);
            if (description) url.searchParams.set('d', description);
            if (image && !banner && !video) url.searchParams.set('i', image);
            if (banner && !image && !video) url.searchParams.set('b', banner);
            if (video && !image && !banner) url.searchParams.set('v', video);
            if (_url) url.searchParams.set('u', _url);
            if (color) url.searchParams.set('c', color);
            if (!site && !title && !description) return alert('Please fill some fields (the top 3 ones)');
            if (image && banner || image && video || banner && video) return alert('Please fill only one media field');
            navigator.clipboard.writeText(url.href);
            alert('Copied to clipboard');
        }
    </script>

</html>
`;

    const html = `
    <html>

    <head>

        <meta http-equiv="refresh" content="0; url=${_url ? _url : " https://chino.is-a.dev/embed"}" />
        ${site ? `<meta property="og:site_name" content="${site}" />` : ""}
        ${title ? `<meta property="og:title" content="${title}" />` : ""}
        ${description ? `<meta property="og:description" content="${description}" />` : ""}
        ${image && !banner && !video ? `<meta property="og:image" content="${image}" />` : ""}
        ${banner && !image && !video ? `<meta property="og:image" content="${banner}" />
        <meta name="twitter:card" content="summary_large_image" />` : ""}
        ${video && !image && !banner ? `<meta property="og:video" content="${video}" />` : ""}
        ${color ? `<meta name="theme-color" content="${color}" />` : ""}
        <meta property="og:url" content="${_url}" />

    </head>

    </html>`;

    if (!site && !title && !description) {
        return new Response(embed, {
            headers: {
                "content-type": "text/html"
            }
        });
    }
    return new Response(html, {
        headers: {
            "content-type": "text/html"
        }
    });
}
