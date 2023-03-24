export async function onRequest(context) {
    const url = new URL(context.request.url);
    const site = url.searchParams.get("site") || url.searchParams.get("s");
    const title = url.searchParams.get("title") || url.searchParams.get("t");
    const description = url.searchParams.get("description") || url.searchParams.get("desc") || url.searchParams.get("d");
    const image = url.searchParams.get("image") || url.searchParams.get("img") || url.searchParams.get("i");
    const _url = url.searchParams.get("url") || url.searchParams.get("link") || url.searchParams.get("u") || url.searchParams.get("l");
    const color = url.searchParams.get("color") || url.searchParams.get("c");

    const embed = `
    <html>

    <head>
        <title>Discord Embed</title>
        <style>
            body {
                background-color: #1e1e1e;
                color: #fff;
                font-family: sans-serif;
            }
    
            table {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            input {
                width: 100%;
                padding: 5px;
                border: 1px solid #fff;
                border-radius: 5px;
                background-color: #fff;
                color: #000;
            }
    
            button {
                padding: 5px;
                border: 1px solid #fff;
                border-radius: 5px;
                background-color: #fff;
                color: #000;
            }
        </style>
    </head>
    
    <body>
        <table>
            <tr>
                <td>Site Name</td>
                <td><input type="text" name="site" id="site" /></td>
            </tr>
            <tr>
                <td>Title</td>
                <td><input type="text" name="title" id="title" /></td>
            </tr>
            <tr>
                <td>Description</td>
                <td><input type="text" name="description" id="description" /></td>
            </tr>
            <tr>
                <td>Image</td>
                <td><input type="text" name="image" id="image" /></td>
            </tr>
            <tr>
                <td>URL</td>
                <td><input type="text" name="_url" id="_url" /></td>
            </tr>
            <tr>
                <td>Color</td>
                <td><input type="text" name="color" id="color" /></td>
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
                const _url = document.getElementById('_url').value;
                const color = document.getElementById('color').value;
                if (site) url.searchParams.set('s', site);
                if (title) url.searchParams.set('t', title);
                if (description) url.searchParams.set('d', description);
                if (image) url.searchParams.set('i', image);
                if (_url) url.searchParams.set('u', _url);
                if (color) url.searchParams.set('c', color);
                if (!site && !title && !description && !image && !_url && !color) return alert('Please fill in at least one field');
                navigator.clipboard.writeText(url.href);
                alert('Copied to clipboard');
            }
        </script>
    
    </html>`;

    const html = `
    <html>

    <head>
        <meta http-equiv="refresh" content="0; url=${_url ? _url : " https://chino.is-a.dev/embed"}" />
        ${site ? `<meta property="og:site_name" content="${site}" />` : ""}
        ${title ? `<meta property="og:title" content="${title}" />` : ""}
        ${description ? `<meta property="og:description" content="${description}" />` : ""}
        <meta property="og:image" content="${image}" />
        <meta property="og:url" content="${_url}" />
        <meta property="og:type" content="website" />
        ${title ? `<meta name="title" content="${title}" />` : ""}
        ${description ? `<meta name="description" content="${description}" />` : ""}
        <meta name="theme-color" content="#${color}" />
        <meta name="twitter:card" content="summary_large_image" />
        ${title ? `<meta property="twitter:title" content="${title}" />` : ""}
        ${description ? `<meta property="twitter:description" content="${description}" />` : ""}
        <meta property="twitter:url" content="${_url}" />
        <meta property="twitter:image" content="${image}" />
    </head>
    
    </html>`;

    if (!site && !title && !description && !image && !_url && !color) {
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