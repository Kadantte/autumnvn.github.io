export async function onRequest(context) {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id') || '393694671383166998';
    const size = url.searchParams.get('size') || 24;
    const response = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
    const json = await response.json();
    if (!json.success) return new Response(json.error.message, { status: 404 });
    let color;
    switch (json.data.discord_status) {
        case 'online':
            color = '#43b581';
            break;
        case 'idle':
            color = '#faa61a';
            break;
        case 'dnd':
            color = '#f04747';
            break;
        default:
            color = '#747f8d';
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${color}"/></svg>`;
    return new Response(svg, {
        headers: {
            'content-type': 'image/svg+xml',
            'cache-control': 'public, max-age=0'
        }
    });
}